import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface WaveDividerProps {
  flip?: boolean;
  fromColor?: string;
  toColor?: string;
  className?: string;
}

export function WaveDivider({
  flip = false,
  fromColor = '#00b4d81f',
  toColor = '#00b4d81f',
  className = '',
}: WaveDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const wavePaths = [
    'M0,64 C180,120 360,0 540,60 C720,120 900,10 1080,60 C1260,110 1350,30 1440,60 V100 H0 Z',
    'M0,70 C200,110 400,20 600,65 C800,110 1000,15 1200,65 C1320,95 1380,40 1440,65 V100 H0 Z',
    'M0,75 C220,100 440,30 660,70 C880,110 1100,25 1320,70 C1380,80 1410,50 1440,70 V100 H0 Z',
  ];

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden leading-none pointer-events-none ${className}`}
      style={{ marginTop: flip ? 0 : '-1px', marginBottom: flip ? '-1px' : 0, transform: flip ? 'rotate(180deg)' : undefined }}
    >
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block w-full h-[40px] sm:h-[60px] md:h-[80px]">
        {/* Base fill */}
        <rect width="1440" height="100" fill={fromColor} />

        {/* Animated wave layers */}
        {wavePaths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill={toColor}
            opacity={0.3 + i * 0.25}
            initial={{ opacity: 0, y: 10 }}
            animate={
              isInView
                ? { opacity: 0.3 + i * 0.25, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        {/* Thin animated accent wave */}
        <motion.path
          d="M0,55 C240,95 480,15 720,55 C960,95 1200,20 1440,55"
          fill="none"
          stroke="rgba(0,132,255,0.12)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}
