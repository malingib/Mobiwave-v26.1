import type { ReactNode } from 'react';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale';

interface PremiumRevealProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  amount?: number;
  once?: boolean;
}

export function PremiumReveal({ children, className = '' }: PremiumRevealProps) {
  // Keep reveal content in the normal document flow so it is visible immediately.
  return <div className={className}>{children}</div>;
}
