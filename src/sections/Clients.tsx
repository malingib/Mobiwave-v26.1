import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from '@/hooks/useInView';

gsap.registerPlugin(ScrollTrigger);

// Client names mirrored from mobiwave.co.ke "Join Many Happy Clients" section
const partners = [
  { name: 'Jawabu Nexus LTD', logo: 'https://mobiwave.co.ke/images/clients/JNL.png' },
  { name: 'The United Adzukulu Network', logo: 'https://mobiwave.co.ke/images/clients/TUAN.jpeg' },
  { name: 'Shamba Project Kilifi', logo: 'https://mobiwave.co.ke/images/clients/SPK.jpeg' },
  { name: 'T4T Kilifi', logo: 'https://t4tkilifi.org/uploads/school_content/logo/1718949765-13899807756675178573a51!logo.jpg' },
  { name: 'Malanga Welfare', logo: 'https://malangawelfare.org/malanga-logo.png' },
  { name: 'Jazafit Gyms', logo: 'https://ui-avatars.com/api/?name=Jazafit+Gyms&background=0f172a&color=ffffff&bold=true' },
  { name: 'Comfort Circle', logo: 'https://comfortcircle.co.ke/assets/images/logo.jpg' },
];

export function Clients() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const [inViewRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: labelRef.current, start: 'top 85%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  const doubled = [...partners, ...partners];

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (inViewRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="py-16 bg-white overflow-hidden"
    >
      <div className="container-custom mb-10">
        <div ref={labelRef} className="text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">
            Trusted By
          </p>
          <p className="text-gray-500 text-base">
            We are honoured to work alongside these distinguished partners.
          </p>
        </div>
      </div>

      {/* Single scrolling row */}
      <div className="relative">
        <div className="flex gap-6 animate-scroll-left" style={{ width: 'max-content' }}>
          {doubled.map((partner, i) => (
            <div
              key={`p-${i}`}
              className="flex-shrink-0 flex items-center gap-3 px-2 py-1 transition-all duration-300 group"
              style={{ minWidth: 180 }}
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="w-9 h-9 rounded-lg object-contain bg-white border border-gray-100 p-1 flex-shrink-0"
                loading="lazy"
              />
              <span className="font-semibold text-gray-600 text-sm whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left 32s linear infinite;
        }
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
