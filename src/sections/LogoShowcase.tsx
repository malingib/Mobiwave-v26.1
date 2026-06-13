import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const logos = [
  'Safaricom', 'Airtel', 'Telkom', 'KCB', 'Equity Bank',
  'Co-op Bank', 'Absa', 'Stanbic', 'Twiga Foods', 'Sendy',
  'Lori Systems', 'Wasoko', 'Copia', 'M-Kopa', 'Paystack',
];

export default function LogoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.logo-title',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
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
      className="py-20 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <p className="logo-title text-center text-muted-foreground text-sm uppercase tracking-wider">
          Trusted by Industry Leaders Across Africa
        </p>
      </div>

      {/* Logo Rows */}
      <div className="space-y-8">
        {/* Row 1 - Left to Right */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex animate-scroll-left">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 px-8 py-4 mx-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors duration-300 group"
              >
                <span className="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex animate-scroll-right">
            {[...logos.reverse(), ...logos].map((logo, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 px-8 py-4 mx-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors duration-300 group"
              >
                <span className="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
