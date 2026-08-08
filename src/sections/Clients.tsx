import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp } from '@/lib/motion';
import { Marquee } from '@/components/Marquee';

const partners = [
  { name: 'Jawabu Nexus LTD', logo: 'https://mobiwave.co.ke/images/clients/JNL.png' },
  { name: 'The United Adzukulu Network', logo: 'https://mobiwave.co.ke/images/clients/TUAN.jpeg' },
  { name: 'Shamba Project Kilifi', logo: 'https://mobiwave.co.ke/images/clients/SPK.jpeg' },
  { name: 'T4T Kilifi', logo: 'https://t4tkilifi.org/uploads/school_content/logo/1718949765-13899807756675178573a51!logo.jpg' },
  { name: 'Malanga Welfare', logo: 'https://malangawelfare.org/malanga-logo.png' },
  { name: 'Jazafit Gyms', logo: 'https://ui-avatars.com/api/?name=Jazafit+Gyms&background=0f172a&color=ffffff&bold=true' },
  { name: 'Comfort Circle', logo: 'https://comfortcircle.co.ke/assets/images/logo.jpg' },
];

function Partner({ name, logo }: (typeof partners)[number]) {
  return (
    <div className="flex shrink-0 items-center gap-3 px-5 sm:px-8">
      <img
        src={logo}
        alt={`${name} logo`}
        className="h-9 w-9 rounded-lg object-contain grayscale opacity-45 transition-opacity duration-300"
        loading="lazy"
        width={32}
        height={32}
      />
      <span className="whitespace-nowrap text-sm font-semibold text-[#172333]/45">{name}</span>
    </div>
  );
}

export function Clients() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fbfaff] to-white pb-6 pt-6 lg:pb-8 lg:pt-8" aria-label="MobiWave clients">
      <div className="container-custom text-center">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="mx-auto mb-5 max-w-2xl"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6651c9]">Trusted by organisations across Kenya</p>
        </motion.div>
      </div>
      <div className="bg-white/20 py-3">
        <Marquee speed={42} className="-mx-4 sm:mx-0">
        {partners.map((partner) => <Partner key={partner.name} {...partner} />)}
        </Marquee>
      </div>
    </section>
  );
}
