import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plug } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const innerOrbit = [
  { name: 'Shopify', color: '#96BF48' },
  { name: 'WooCommerce', color: '#96588A' },
  { name: 'Salesforce', color: '#00A1E0' },
  { name: 'HubSpot', color: '#FF7A59' },
];

const outerOrbit = [
  { name: 'Slack', color: '#4A154B' },
  { name: 'Zapier', color: '#FF4A00' },
  { name: 'Google Sheets', color: '#0F9D58' },
  { name: 'Microsoft Teams', color: '#6264A7' },
  { name: 'Zendesk', color: '#03363D' },
  { name: 'Freshdesk', color: '#23C1C1' },
];

export default function Integrations() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.integrations-title',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.orbit-hub',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.orbit-logo',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="integrations"
      className="py-24 bg-brand-dark relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark to-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="integrations-title text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-1.5 bg-brand-green/20 text-brand-green text-sm font-medium rounded-full mb-4">
            INTEGRATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Seamless Integrations
          </h2>
          <p className="text-lg text-white/60">
            Connect with your favorite tools and platforms. Our API works with everything.
          </p>
        </div>

        {/* Orbital System */}
        <div className="relative h-[500px] flex items-center justify-center">
          {/* Connection Lines SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#04A777" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#04A777" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner Orbit */}
          <div
            className="absolute w-64 h-64 rounded-full border border-white/10"
            style={{
              animation: 'orbit 20s linear infinite',
            }}
          >
            {innerOrbit.map((item, index) => {
              const angle = (index / innerOrbit.length) * 360;
              const radius = 128;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <div
                  key={item.name}
                  className="orbit-logo absolute w-14 h-14 -ml-7 -mt-7 bg-white rounded-xl shadow-lg flex items-center justify-center cursor-pointer hover:scale-125 transition-transform duration-300"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    animation: 'counter-orbit 20s linear infinite',
                  }}
                  title={item.name}
                >
                  <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              );
            })}
          </div>

          {/* Outer Orbit */}
          <div
            className="absolute w-[450px] h-[450px] rounded-full border border-white/5"
            style={{
              animation: 'orbit 35s linear infinite reverse',
            }}
          >
            {outerOrbit.map((item, index) => {
              const angle = (index / outerOrbit.length) * 360;
              const radius = 225;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <div
                  key={item.name}
                  className="orbit-logo absolute w-12 h-12 -ml-6 -mt-6 bg-white/90 rounded-lg shadow-lg flex items-center justify-center cursor-pointer hover:scale-125 transition-transform duration-300"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    animation: 'counter-orbit 35s linear infinite reverse',
                  }}
                  title={item.name}
                >
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              );
            })}
          </div>

          {/* Center Hub */}
          <div
            className="orbit-hub relative w-32 h-32 bg-gradient-brand rounded-full flex items-center justify-center shadow-glow-lg"
            style={{ zIndex: 10 }}
          >
            <div className="text-center">
              <Plug className="w-8 h-8 text-white mx-auto mb-1" />
              <span className="text-white text-xs font-bold">200+</span>
              <span className="text-white/80 text-[10px] block">Integrations</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-brand-green hover:bg-brand-green/90 text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 group"
          >
            View All Integrations
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counter-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
}
