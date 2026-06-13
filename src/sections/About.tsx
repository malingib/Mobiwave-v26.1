import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Clock, Shield, TrendingUp } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: '+', label: 'Projects Delivered', desc: 'Proven track record across diverse industries and business sizes' },
  { value: 99, suffix: '.9%', label: 'Delivery Rate', desc: 'Industry-leading reliability ensuring your messages always arrive' },
  { value: 10, suffix: 'M+', label: 'Messages Sent', desc: 'Trusted volume that demonstrates our platform\'s scale and capability' },
];

const pillars = [
  { icon: CheckCircle, label: 'Licensed Provider', sub: 'Fully compliant with Kenyan regulations' },
  { icon: Clock, label: '24/7 Support', sub: 'Round-the-clock expert assistance' },
  { icon: Shield, label: 'Secure Platform', sub: 'Enterprise-grade encryption & security' },
  { icon: TrendingUp, label: 'Scalable APIs', sub: 'Grows with your business needs' },
];

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const pillarsRef = useRef<HTMLDivElement | null>(null);
  const [inViewRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 80%' } }
      );

      // Animated counters
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll('.stat-number');
        gsap.fromTo(
          counters,
          { textContent: 0, opacity: 0, y: 30 },
          {
            textContent(i: number) {
              return stats[i].value;
            },
            opacity: 1,
            y: 0,
            duration: 1.8,
            stagger: 0.15,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
          }
        );
      }

      // Pillars
      if (pillarsRef.current) {
        const cards = pillarsRef.current.querySelectorAll('.pillar-card');
        gsap.fromTo(cards,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: pillarsRef.current, start: 'top 80%' } }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (inViewRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      id="about"
      className="section-padding overflow-hidden"
      style={{ background: '#f4f7fb' }}
    >
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <span className="section-label">About MobiWave</span>
          <h2 className="section-heading">
            Expertise, Integrity, and{' '}
            <span className="gradient-text">Transformable Solutions</span>
          </h2>
          <p className="section-subtext max-w-2xl">
            MobiWave Innovations is Kenya's premier telecommunications company providing
            next-generation communication tools to businesses of all sizes. Our mission
            is to bridge communication gaps using innovative, accessible solutions.
          </p>
          <a href="/about" className="read-more-link mt-6 inline-flex">
            Learn More About Us
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>

        {/* Animated Stats */}
        <div ref={statsRef} className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-baseline gap-0.5 mb-3">
                <span
                  className="stat-number text-5xl lg:text-6xl font-extrabold"
                  style={{ fontFamily: 'Outfit, sans-serif', color: '#0084ff' }}
                >
                  {stat.value}
                </span>
                <span className="text-3xl font-extrabold" style={{ color: '#0084ff', fontFamily: 'Outfit, sans-serif' }}>
                  {stat.suffix}
                </span>
              </div>
              <div className="font-semibold text-gray-900 text-lg mb-1">{stat.label}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Pillars Grid */}
        <div ref={pillarsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p, i) => (
            <div key={i} className="pillar-card flex items-start gap-4 p-6 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0,132,255,0.08)' }}>
                <p.icon className="w-5 h-5" style={{ color: '#0084ff' }} />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm mb-0.5">{p.label}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
