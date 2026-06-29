import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** 'up' is the default subtle entrance; 'fade' for elements that shouldn't shift position. */
  variant?: 'up' | 'fade';
  as?: 'div' | 'li';
}

/**
 * Wraps children in a single, restrained entrance animation triggered once
 * when scrolled into view. Respects prefers-reduced-motion by disabling
 * movement entirely (fades only, near-instant) rather than just speeding it up.
 */
export function Reveal({ children, className, delay = 0, variant = 'up', as = 'div' }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: variant === 'up' ? 18 : 0 },
        visible: { opacity: 1, y: 0 },
      };

  const MotionTag = as === 'li' ? motion.li : motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
      transition={{ duration: shouldReduceMotion ? 0.15 : 0.55, delay: shouldReduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
