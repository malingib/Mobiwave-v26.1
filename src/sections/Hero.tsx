import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ParticleBackground } from '@/components/ParticleBackground';
import { ArrowRight, ChevronRight, MessageSquare } from 'lucide-react';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.2);

      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.hl');
        tl.fromTo(lines, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.12 }, 0.4);
      }

      tl.fromTo(subRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.85);

      if (ctaRef.current) {
        const btns = ctaRef.current.querySelectorAll('a');
        tl.fromTo(btns, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)' }, 1.05);
      }

      if (statsRef.current) {
        const stats = statsRef.current.querySelectorAll('.stat-item');
        tl.fromTo(stats, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 1.25);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineLines = ['Empowering', 'Communications,', 'One Wave at a Time'];

  const stats = [
    { value: '99.9%', label: 'Delivery Rate' },
    { value: '10M+', label: 'Messages Sent' },
    { value: '50+', label: 'Projects' },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a1a25 0%, #002a5e 50%, #0a1a25 100%)' }}
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0084ff 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4 pt-32 pb-20">
        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8"
          style={{ background: 'rgba(0,132,255,0.15)', border: '1px solid rgba(0,132,255,0.35)' }}>
          <MessageSquare className="w-4 h-4 text-blue-400" />
          <span className="text-blue-300 text-sm font-semibold tracking-widest uppercase">
            100% Secure SMS Platform
          </span>
        </div>

        {/* Headline */}
        <h1 ref={headlineRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-none"
          style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>
          {headlineLines.map((line, i) => (
            <span key={i} className="hl block">
              {line === 'Communications,' ? (
                <span style={{ color: '#0084ff' }}>{line}</span>
              ) : line === 'One Wave at a Time' ? (
                <span className="text-white/80">{line}</span>
              ) : line}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p ref={subRef} className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
          MobiWave Innovations is Kenya's premier telecommunications solutions provider.
          From bulk SMS to M-Pesa integrations — reach your customers reliably and fast.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a href="#contact" className="btn-primary text-base">
            Get Started Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#services" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-300"
            style={{ border: '2px solid rgba(255,255,255,0.25)' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
          >
            Our Services
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Stats Row */}
        <div ref={statsRef} className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {stats.map((s, i) => (
            <div key={i} className="stat-item text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1"
                style={{ fontFamily: 'Outfit, sans-serif' }}>
                {s.value}
              </div>
              <div className="text-xs sm:text-sm text-white/40 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave transition to white */}
      <div className="absolute -bottom-px left-0 right-0 leading-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full h-auto" preserveAspectRatio="none">
          <path d="M0 80L60 72C120 64 240 48 360 44C480 40 600 48 720 52C840 56 960 56 1080 52C1200 48 1320 40 1380 36L1440 32V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white" />
        </svg>
      </div>
      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-white" aria-hidden />
    </section>
  );
}
