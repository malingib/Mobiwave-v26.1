import { useState } from 'react';
import { Marquee } from '@/components/Marquee';

const partners = [
  { name: 'Jawabu Nexus LTD', logo: '/images/clients/JNL.png' },
  { name: 'The United Adzukulu Network', logo: '/images/clients/TUAN.jpeg' },
  { name: 'Shamba Project Kilifi', logo: '/images/clients/SPK.jpeg' },
  { name: 'T4T Kilifi', logo: '/images/clients/t4t.png' },
  { name: 'Malanga Welfare', logo: '/images/clients/malanga.png' },
  { name: 'Jazafit Gyms', logo: '/images/clients/jazafit.png' },
  { name: 'Comfort Circle', logo: '/images/clients/comfortcircle.jpg' },
  { name: 'Lake Oil', logo: '/images/clients/lake-oil.svg' },
  { name: 'VycePay', logo: '/images/clients/vycepay.svg' },
];

function Partner({ name, logo }: (typeof partners)[number]) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = name.split(/\s+/).map((part) => part[0]).join('').slice(0, 3).toUpperCase();

  return (
    <div className="flex min-h-14 shrink-0 items-center gap-3 px-5 sm:px-8">
      {imageFailed ? (
        <span
          aria-label={`${name} logo unavailable; showing text mark`}
          className="flex h-10 min-w-10 items-center justify-center rounded-md border border-[#176fe8]/20 bg-white px-2 text-xs font-extrabold tracking-wide text-[#176fe8]"
        >
          {initials}
        </span>
      ) : (
        <img
          src={logo}
          alt={`${name} logo`}
          className="block h-10 w-auto max-w-[132px] object-contain"
          loading="eager"
          decoding="async"
          width={132}
          height={44}
          onError={() => setImageFailed(true)}
        />
      )}
      <span className="whitespace-nowrap text-sm font-semibold text-[#172333]">{name}</span>
    </div>
  );
}

export function Clients() {
  return (
    <section className="relative overflow-hidden bg-white pb-6 pt-6 lg:pb-8 lg:pt-8" aria-label="MobiWave clients">
      <div className="container-custom text-center">
        <div className="mx-auto mb-5 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#6651c9]">Trusted by organisations across Kenya</p>
        </div>
      </div>
      <div className="bg-white py-3">
        <Marquee speed={42} className="-mx-4 sm:mx-0">
          {partners.map((partner) => <Partner key={partner.name} {...partner} />)}
        </Marquee>
      </div>
    </section>
  );
}
