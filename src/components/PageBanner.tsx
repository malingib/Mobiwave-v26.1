import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { GravityParticles } from '@/components/GravityParticles';

interface PageBannerProps {
  title: string;
  subtitle?: string;
}

export function PageBanner({ title, subtitle }: PageBannerProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.4 }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-[#0a1a25] pt-36 pb-28 overflow-hidden">
      <GravityParticles />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 mw-glow-blue rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 mw-glow-teal rounded-full pointer-events-none" />

      <div className="container-custom relative z-10 text-center">
        <div className="flex items-center justify-center gap-2.5 mb-5">
          <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
          <span className="text-xs font-bold text-[#36b8ff] uppercase tracking-[0.18em]">
            MobiWave
          </span>
          <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
        </div>
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4"
          style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p ref={subtitleRef} className="text-base md:text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="absolute -bottom-px left-0 right-0 leading-none pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" className="block w-full h-auto" preserveAspectRatio="none">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
