import type { ReactNode } from 'react';

type BentoVariant = 'light' | 'surface' | 'dark';

const variantClass: Record<BentoVariant, string> = {
  light: 'mw-section-light mw-mesh-light',
  surface: 'mw-section-surface',
  dark: 'mw-section-dark',
};

interface BentoShellProps {
  id?: string;
  variant?: BentoVariant;
  stripe?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabelledBy?: string;
}

export function BentoShell({
  id,
  variant = 'light',
  stripe = false,
  className = '',
  children,
  ariaLabelledBy,
}: BentoShellProps) {
  return (
    <section
      id={id}
      className={`relative py-20 lg:py-28 overflow-hidden ${variantClass[variant]} ${className}`}
      aria-labelledby={ariaLabelledBy}
    >
      {stripe && (
        <div
          className="absolute top-0 left-0 w-10 sm:w-14 h-full pointer-events-none opacity-80"
          style={{ background: 'linear-gradient(180deg, rgba(124,58,237,0.35), rgba(29,140,137,0.2))' }}
          aria-hidden
        />
      )}
      {variant === 'dark' && (
        <>
          <div className="absolute top-0 right-0 w-[min(500px,80vw)] h-[min(500px,80vw)] mw-glow-blue rounded-full pointer-events-none glow-pulse" />
          <div className="absolute bottom-0 left-0 w-[min(400px,70vw)] h-[min(400px,70vw)] mw-glow-teal rounded-full pointer-events-none" />
        </>
      )}
      <div className="container-custom relative z-10">{children}</div>
    </section>
  );
}
