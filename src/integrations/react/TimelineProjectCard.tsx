/** @jsxImportSource react */
import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export interface TimelineProjectCardProps {
  alignment: 'left' | 'right';
  children: React.ReactNode;
  classes?: string;
}

export const TimelineProjectCard: React.FC<any> = ({ alignment, children, classes = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: alignment === 'left' ? -100 : 100,
      }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={classes}
    >
      {children}
    </motion.div>
  );
};