/** @jsxImportSource react */
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue, HTMLMotionProps } from 'motion/react';

// interface AnimatedToolsProps {
//   children: ReactNode;
//   className?: string;
//   // Represents the horizontal distance the element will travel during the animation.
//   // A positive value will move it from left to right (e.g., starting off-screen to the left).
//   // A negative value would move it from right to left.
//   xDistance?: number; // e.g., -300 for starting 300px to the left
//   // Controls the speed of the animation. A higher value means the element moves faster relative to scroll progress.
//   speed?: number; // e.g., 1 for normal speed, 2 for double speed
// }

// Custom hook to map scroll progress to an x-transform value
function useHorizontalScroll(value: MotionValue<number>, distance: number, speed: number): MotionValue<number> {
  // When scrollYProgress is 0 (element entering), x should be 'distance * speed'.
  // When scrollYProgress is 1 (element fully visible/centered), x should be 0.
  return useTransform(value, [0, 1], [distance * speed, 0]);
}

const AnimatedToolsComponent: React.FC<any> = ({
  children,
  className = '',
  xDistance = -300, // Default: starts 300px to the left and slides in
  speed = 1, // Default speed is 1
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end center'], // Adjust as needed: 0 when bottom of element hits top of viewport, 1 when top of element hits bottom of viewport
  });

  const x = useHorizontalScroll(scrollYProgress , xDistance, speed);

  // It's good practice to type motion components for better DX and type safety
  const MotionDiv = motion.div as React.FunctionComponent<HTMLMotionProps<'div'>>; // Corrected type assertion

  return (
    <div ref={ref} className={`${className}`}> {/* Parent with overflow-hidden to clip */}
      <MotionDiv
        style={{ x }} // Apply the calculated x-transform
        className="w-full overflow-hidden" // Ensure it takes full width if needed
      >
        {children}
      </MotionDiv>
    </div>
  );
};

export default AnimatedToolsComponent;