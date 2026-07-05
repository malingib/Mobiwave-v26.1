import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeDown } from '@/lib/motion';

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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const doubled = [...partners, ...partners];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom mb-8">
        <motion.p
          ref={ref}
          className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeDown}
        >
          Used by forward-thinking organisations
        </motion.p>
      </div>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-10 animate-scroll-left" style={{ width: 'max-content' }}>
          {doubled.map((partner, i) => (
            <motion.div
              key={`p-${i}`}
              className="flex-shrink-0 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ minWidth: 180 }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={partner.logo} alt={partner.name} className="w-8 h-8 rounded object-contain bg-white border border-gray-100 p-0.5 flex-shrink-0" loading="lazy" />
              <span className="text-sm text-gray-500 whitespace-nowrap">{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left { animation: scroll-left 40s linear infinite; }
        .animate-scroll-left:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
}
