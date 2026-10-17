import type { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
  className?: string;
}

export function Marquee({ children, reverse = false, speed = 40, className = '' }: MarqueeProps) {
  const animationName = reverse ? 'mw-marquee-reverse' : 'mw-marquee';

  return (
    <div className={`relative overflow-hidden mw-marquee-fade ${className}`}>
      <div
        className="flex w-max"
        style={{ animation: `${animationName} ${speed}s linear infinite` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
