import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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
    <div className="relative overflow-hidden bg-[#f6f4ff] pb-20 pt-32 lg:pb-24 lg:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(184,201,232,0.46),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(209,198,242,0.5),transparent_28%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-white/55 blur-3xl" />

      <div className="container-custom relative z-10 text-center">
        <h1
          ref={titleRef}
          className="mb-4 text-4xl font-extrabold text-[#172333] md:text-5xl lg:text-6xl"
          style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p ref={subtitleRef} className="mx-auto max-w-2xl text-base leading-relaxed text-[#586273] md:text-lg">
            {subtitle}
          </p>
        )}
      </div>

      <div className="absolute -bottom-px left-0 right-0 leading-none pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" className="block w-full h-auto" preserveAspectRatio="none">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </div>
  );
}
