import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

/* ── Parallax wrapper ── */
interface ParallaxDecorationProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxDecoration({ children, speed = 0.3, className = '' }: ParallaxDecorationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <div ref={ref} className={`absolute pointer-events-none ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

/* ── Hero wave dividers — dark hero easing into a white next section ── */
export function HeroWaves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-[5]">
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {/* Back: hero navy mass, slightly translucent so the morph does not end in a hard slab */}
          <linearGradient id="wgA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1a25" stopOpacity="0.94" />
            <stop offset="100%" stopColor="#12374d" stopOpacity="0.8" />
          </linearGradient>

          {/* Mid: brand bridge, but it thins out near the white section */}
          <linearGradient id="wgB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f3147" stopOpacity="0.92" />
            <stop offset="42%" stopColor="#1d5f85" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#86bddb" stopOpacity="0.34" />
          </linearGradient>

          {/* Front: pale blue into white so the lower section arrives cleanly */}
          <linearGradient id="wgC" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8abfd8" stopOpacity="0.22" />
            <stop offset="30%" stopColor="#bfdbe9" stopOpacity="0.52" />
            <stop offset="68%" stopColor="#e7f0f5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-white/0 via-white/35 to-white" />

      {/* Back — slowest, deep undulation */}
      <div className="hero-wave hero-wave-3">
        <svg viewBox="0 0 2880 400" className="w-[200%] h-auto" preserveAspectRatio="none">
          <path
            d="M0,300 C480,200 960,370 1440,300 C1920,200 2400,370 2880,300 L2880,400 L0,400 Z"
            fill="url(#wgA)"
          />
        </svg>
      </div>

      {/* Mid — medium speed, brand colour bridge */}
      <div className="hero-wave hero-wave-2">
        <svg viewBox="0 0 2880 340" className="w-[200%] h-auto" preserveAspectRatio="none">
          <path
            d="M0,290 C360,180 720,335 1080,290 C1440,180 1800,335 2160,290 C2520,180 2700,290 2880,290 L2880,340 L0,340 Z"
            fill="url(#wgB)"
          />
        </svg>
      </div>

      {/* Front — fastest, final fade to pure white */}
      <div className="hero-wave hero-wave-1">
        <svg viewBox="0 0 2880 310" className="w-[200%] h-auto" preserveAspectRatio="none">
          <path
            d="M0,250 C480,178 960,275 1440,250 C1920,178 2400,275 2880,250 L2880,310 L0,310 Z"
            fill="url(#wgC)"
          />
        </svg>
      </div>
    </div>
  );
}

/* ── Wave section divider (between sections) ── */
export function WaveDivider({ flip = false, color = '#ffffff7c' }: { flip?: boolean; color?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}>
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <path
          d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

/* ── Floating plus (Luxas-style) ── */
export function FloatingPlus({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 94 94" fill="currentColor" className={`absolute pointer-events-none ${className}`}>
      <polygon points="36.88,45 0,45 0,36.88 36.88,36.88 36.88,0 57.59,0 57.59,36.88 94,36.88 94,57.59 57.59,57.59 57.59,94 36.88,94 36.88,57.59 0,57.59 0,45" />
    </svg>
  );
}

/* ── Floating circle (Luxas-style) ── */
export function FloatingCircle({ className = '', size = 117 }: { className?: string; size?: number }) {
  return (
    <div
      className={`absolute pointer-events-none rounded-full ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/* ── Grid pattern overlay ── */
export function GridPattern({ className = '', opacity = 0.03 }: { className?: string; opacity?: number }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        opacity,
      }}
    />
  );
}

/* ── Dot pattern overlay ── */
export function DotPattern({ className = '', opacity = 0.15 }: { className?: string; opacity?: number }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity,
      }}
    />
  );
}
