/** @jsxImportSource react */ // Add this pragma at the top

import React, { type ElementType } from 'react'; // Use 'type ElementType'
import { motion } from "motion/react";
import { qwikify$ } from '@builder.io/qwik-react';

interface ReactAnimatedTextProps {
  text: string;
  textClassName?: string;
  containerClassName?: string;
  tag?: keyof JSX.IntrinsicElements;
}

const ReactAnimatedTextComponent: React.FC<ReactAnimatedTextProps> = ({
  text,
  textClassName,
  containerClassName,
  tag = 'div',
}): JSX.Element => {
  const TextElement = tag as ElementType;

  const variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  // Using motion.div directly should be fine with the pragma.
  // If issues persist, the explicit cast can be re-added, but the pragma is usually key.
  // Removed the commented line: const MotionDiv = motion.div as React.FunctionComponent<HTMLMotionProps<'div'>>;

  return (
    <motion.div // Using motion.div directly
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      className={containerClassName}
    >
      <TextElement className={textClassName}>{text}</TextElement>
    </motion.div>
  );
};

export const AnimatedText = qwikify$<ReactAnimatedTextProps>(
  ReactAnimatedTextComponent,
  {
    // `eagerness: 'visible'` ensures the React component hydrates when it becomes visible,
    // which is suitable for `whileInView` animations.
    eagerness: 'visible', // Corrected option
  }
);