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
    <div className="relative bg-gradient-to-br from-[#0084ff] to-[#031522] pt-32 pb-24 overflow-hidden">
      {/* Wave Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="absolute bottom-0 left-0 block w-full h-auto" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="rgba(255,255,255,0.1)" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>
      
      <div className="container-custom relative z-10 text-center">
        <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p ref={subtitleRef} className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom Wave */}
      <div className="absolute -bottom-px left-0 right-0 leading-none">
        <svg viewBox="0 0 1440 120" fill="none" className="block w-full h-auto" preserveAspectRatio="none">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
        </svg>
      </div>
      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-white" aria-hidden />
    </div>
  );
}
