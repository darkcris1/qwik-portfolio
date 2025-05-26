/** @jsxImportSource react */
import React, { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, MotionValue, HTMLMotionProps } from 'motion/react';
import { qwikify$ } from '@builder.io/qwik-react';

// Simplified Project interface for the React component.
// In a larger app, you might import this from a shared types file.
interface ProjectData {
  id: string;
  title: string;
  mainImage: string;
  // Add other project properties if needed by this component directly
}

interface ParallaxProjectProps {
  project: ProjectData; // Data for the project, especially for the background image
  children: ReactNode; // The content to be parallaxed (e.g., title, description)
  distance?: number;    // How much the content should move (px)
  className?: string;   // Optional additional classes for the main article
}

// Custom hook to map scroll progress to a y-transform value
function useParallax(value: MotionValue<number>, distance: number): MotionValue<number> {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const ParallaxProjectSectionComponent: React.FC<ParallaxProjectProps> = ({
  project,
  children,
  distance = 100, // Default parallax distance
  className = '',
}) => {
  const ref = useRef<HTMLElement>(null); // Ref for the main <article> element

  // Track scroll progress of the <article> element
  // offset: ["start end", "end start"] means progress is 0 when article top hits viewport bottom,
  // and 1 when article bottom hits viewport top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Apply parallax transformation to the y-axis
  const y = useParallax(scrollYProgress, distance);

  const MotionDiv = motion.div as React.FunctionComponent<HTMLMotionProps<'div'>>;

  return (
    <article
      ref={ref}
      className={`min-h-screen relative flex flex-col justify-around items-center p-4 sm:p-8 text-white ${className}`}
      style={{
        backgroundImage: `url(${project.mainImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed', // Keeps background fixed for base parallax
      }}
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      
      {/* This div will move with the parallax effect */}
      <MotionDiv
        className="relative z-10 w-full flex flex-col justify-around items-center" // Adjust styling as needed
        style={{ y }} // Apply the calculated y-transform
      >
        {children}
      </MotionDiv>
    </article>
  );
};

// Qwikify the React component
export const ParallaxProjectSection = qwikify$<ParallaxProjectProps>(
  ParallaxProjectSectionComponent,
  {
    eagerness: 'visible', // Hydrate when the component becomes visible
  }
);