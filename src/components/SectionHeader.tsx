import { motion } from 'framer-motion';
import { MotionItem } from '@/components/MotionSection';
import { staggerContainer } from '@/lib/motion';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  variant?: 'light' | 'dark';
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  variant = 'light',
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const isDark = variant === 'dark';
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const dashClass = align === 'center' ? 'mx-auto' : '';

  return (
    <motion.div
      className={`max-w-2xl mb-14 ${alignClass} ${className}`}
      variants={staggerContainer}
    >
      <MotionItem>
        <div className={`flex items-center gap-2.5 mb-5 ${align === 'center' ? 'justify-center' : ''}`}>
          <div className={`w-7 h-0.5 rounded-full bg-[#1d8c89] ${dashClass}`} />
          <span
            className={`text-xs font-bold uppercase tracking-[0.18em] ${
              isDark ? 'text-[#36b8ff]' : 'text-[#7c3aed]'
            }`}
          >
            {label}
          </span>
          {align === 'center' && <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />}
        </div>
      </MotionItem>
      <MotionItem>
        <h2
          className={`text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold leading-[1.15] mb-4 ${
            isDark ? 'text-white' : 'text-[#0a1a25]'
          }`}
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          {title}
        </h2>
      </MotionItem>
      {description && (
        <MotionItem>
          <p className={`text-base leading-relaxed ${isDark ? 'text-white/55' : 'text-[#5b6b78]'}`}>
            {description}
          </p>
        </MotionItem>
      )}
    </motion.div>
  );
}
