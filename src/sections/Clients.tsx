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
    <div className="flex shrink-0 items-center gap-3 border-r border-[#0a1a25]/10 pr-8 mr-8">
      <img
        src={logo}
        alt={`${name} logo`}
        className="h-8 w-8 rounded-lg object-contain grayscale opacity-60"
        loading="lazy"
        width={32}
        height={32}
      />
      <span className="whitespace-nowrap text-sm font-semibold text-[#0a1a25]/55">{name}</span>
    </div>
  );
}

export function Clients() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="overflow-hidden border-y border-[#0a1a25]/10 bg-[#f4f7fb] py-10 lg:py-12" aria-label="MobiWave clients">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0084ff]">Trusted in Kenya</p>
            <p className="max-w-lg text-sm leading-6 text-[#5b6b78] sm:text-base">
              Supporting SACCOs, schools, county governments, and community organisations where reliability matters.
            </p>
          </div>
          <div className="flex gap-6 sm:gap-8">
            <div>
              <strong className="block text-xl font-extrabold text-[#0a1a25]" style={{ fontFamily: 'Outfit, sans-serif' }}>99.9%</strong>
              <span className="text-xs text-[#5b6b78]">delivery target</span>
            </div>
            <div>
              <strong className="block text-xl font-extrabold text-[#0a1a25]" style={{ fontFamily: 'Outfit, sans-serif' }}>3</strong>
              <span className="text-xs text-[#5b6b78]">local networks</span>
            </div>
          </div>
        </motion.div>
      </div>
      <Marquee speed={42} className="-mx-4 sm:mx-0">
        {partners.map((partner) => <Partner key={partner.name} {...partner} />)}
      </Marquee>
    </section>
  );
}
