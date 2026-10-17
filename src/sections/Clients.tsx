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
    <div className="flex w-44 shrink-0 flex-col items-center justify-center px-4 py-3 sm:w-48 sm:px-5">
      <div className="flex h-14 w-full items-center justify-center">
        {imageFailed ? (
          <span
            aria-hidden="true"
            className="flex h-10 min-w-10 items-center justify-center rounded-md border border-[#176fe8]/20 bg-white px-2 text-xs font-extrabold tracking-wide text-[#176fe8]"
          >
            {initials}
          </span>
        ) : (
          <img
            src={logo}
            alt=""
            className="block max-h-11 w-auto max-w-[144px] object-contain"
            loading="lazy"
            decoding="async"
            width={144}
            height={44}
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <span className="mt-2 text-center text-xs font-medium leading-5 text-[#526171] sm:text-sm">
        {name}
      </span>
    </div>
  );
}

export function Clients() {
  return (
    <section className="bg-white py-8 sm:py-10" aria-labelledby="client-logos-heading">
      <div className="container-custom mb-5 text-center sm:mb-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#176fe8]">
          Our network
        </p>
        <h2 id="client-logos-heading" className="text-xl font-semibold tracking-tight text-[#0a1a25] sm:text-2xl">
          Organisations we work with
        </h2>
      </div>
      <div className="border-y border-[#e8edf2] bg-white">
        <Marquee speed={48} className="py-1">
          {partners.map((partner) => <Partner key={partner.name} {...partner} />)}
        </Marquee>
      </div>
    </section>
  );
}
