import { useRef, type ReactNode } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  containerVariants?: Variants;
  id?: string;
  once?: boolean;
  amount?: number;
  style?: React.CSSProperties;
}

export function MotionSection({
  children,
  className = '',
  containerVariants = staggerContainer,
  id,
  once = true,
  amount = 0.15,
  style,
}: MotionSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

interface MotionItemProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  style?: React.CSSProperties;
}

export function MotionItem({ children, className = '', variants = fadeUp, style }: MotionItemProps) {
  return (
    <motion.div className={className} variants={variants} style={style}>
      {children}
    </motion.div>
  );
}
