import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeDown } from '@/lib/motion';
import { Marquee } from '@/components/Marquee';
import { BentoShell } from '@/components/bento/BentoShell';

const partners = [
  { name: 'Jawabu Nexus LTD', logo: 'https://mobiwave.co.ke/images/clients/JNL.png' },
  { name: 'The United Adzukulu Network', logo: 'https://mobiwave.co.ke/images/clients/TUAN.jpeg' },
  { name: 'Shamba Project Kilifi', logo: 'https://mobiwave.co.ke/images/clients/SPK.jpeg' },
  { name: 'T4T Kilifi', logo: 'https://t4tkilifi.org/uploads/school_content/logo/1718949765-13899807756675178573a51!logo.jpg' },
  { name: 'Malanga Welfare', logo: 'https://malangawelfare.org/malanga-logo.png' },
  { name: 'Jazafit Gyms', logo: 'https://ui-avatars.com/api/?name=Jazafit+Gyms&background=0f172a&color=ffffff&bold=true' },
  { name: 'Comfort Circle', logo: 'https://comfortcircle.co.ke/assets/images/logo.jpg' },
];

function PartnerPill({ name, logo }: { name: string; logo: string }) {
  return (
    <div
      className="flex-shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-[20px] mw-gradient-border bg-white shadow-[0_4px_24px_rgba(4,16,28,0.05)] hover:shadow-[0_12px_40px_rgba(0,132,255,0.1)] transition-all duration-500"
      style={{ minWidth: 230 }}
    >
      <img src={logo} alt={`${name} logo`} className="w-10 h-10 rounded-xl object-contain bg-[#f4f7fb] border border-[rgba(10,26,37,0.06)] p-0.5" loading="lazy" width={40} height={40} />
      <span className="text-sm font-semibold text-[#0a1a25]/75 whitespace-nowrap">{name}</span>
    </div>
  );
}

export function Clients() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const pills = partners.map((p) => <PartnerPill key={p.name} {...p} />);

  return (
    <BentoShell variant="surface" className="py-14 lg:py-16 border-y border-[rgba(10,26,37,0.05)]">
      <motion.div
        ref={ref}
        className="flex flex-col items-center text-center mb-10"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeDown}
      >
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
          <span className="text-xs font-bold text-[#7c3aed] uppercase tracking-[0.18em]">Trusted by</span>
          <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
        </div>
        <p className="text-sm sm:text-base text-[#5b6b78] font-medium max-w-md">
          SACCOs, schools, county governments, and community organisations across Kenya
        </p>
      </motion.div>
      <div className="space-y-4 -mx-4 sm:mx-0">
        <Marquee speed={48}>{pills}</Marquee>
        <Marquee reverse speed={52}>{pills}</Marquee>
      </div>
    </BentoShell>
  );
}
