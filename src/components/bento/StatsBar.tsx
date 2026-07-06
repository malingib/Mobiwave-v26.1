import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/lib/motion';

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value).toString());
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span className="text-3xl sm:text-4xl font-extrabold text-white whitespace-nowrap" style={{ fontFamily: 'Outfit, sans-serif' }}>
      {display}{suffix}
    </span>
  );
}

export function StatsBar({ stats, className = '' }: { stats: StatItem[]; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.ul
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      className={`grid grid-cols-1 sm:grid-cols-3 rounded-2xl overflow-hidden bg-[#7c3aed] shadow-[0_12px_40px_rgba(124,58,237,0.25)] ${className}`}
    >
      {stats.map((s, i) => (
        <li
          key={s.label}
          className={`flex items-center gap-3 px-5 py-5 sm:py-6 ${
            i > 0 ? 'sm:border-l border-white/25 border-t sm:border-t-0' : ''
          }`}
        >
          <Counter value={s.value} suffix={s.suffix} inView={inView} />
          <p className="text-sm text-white/95 leading-snug font-medium">{s.label}</p>
        </li>
      ))}
    </motion.ul>
  );
}
