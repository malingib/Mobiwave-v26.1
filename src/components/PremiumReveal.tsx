import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/lib/motion';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale';

const offsets: Record<RevealDirection, { x?: number; y?: number; scale?: number }> = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: -48 },
  right: { x: 48 },
  scale: { scale: 0.92 },
};

interface PremiumRevealProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  amount?: number;
  once?: boolean;
}

export function PremiumReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  amount = 0.15,
  once = true,
}: PremiumRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const offset = offsets[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: offset.x ?? 0,
        y: offset.y ?? 0,
        scale: offset.scale ?? 1,
        filter: 'blur(6px)',
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }
          : undefined
      }
      transition={{ duration: 0.75, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
