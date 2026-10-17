import { ArrowUpRight, Bot, FileCheck2, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuredInnovations = [
  {
    name: 'MobiWave CNC',
    label: 'Business operations',
    description: 'Expense accountability, allocations and eTIMS receipt evidence for distributed teams.',
    href: 'https://mobiwavecnc.vercel.app',
    action: 'Open platform',
    icon: FileCheck2,
    external: true,
  },
  {
    name: 'MobiWave AI',
    label: 'AI customer experience',
    description: 'AI-enabled customer engagement experiences for modern business support.',
    href: 'https://mobiwaveai.co.ke',
    action: 'Explore platform',
    icon: Bot,
    external: true,
  },
  {
    name: 'Invest Kilifi',
    label: 'Investment portal',
    description: 'A digital gateway to Kilifi County investment opportunities, sectors and investor information.',
    href: 'https://kic.mobiwave.co.ke',
    action: 'Explore portal',
    icon: Landmark,
    external: true,
  },
];

export function Innovations() {
  return (
    <section id="innovations" className="border-y border-[#e5eaf1] bg-[#f7f9fc] py-14 sm:py-16 lg:py-20" aria-labelledby="home-innovations-heading">
      <div className="container-custom">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#176fe8]">MobiWave Innovations</p>
            <h2 id="home-innovations-heading" className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[#172333] sm:text-4xl lg:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Digital solutions designed for real-world work.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#586273]">
              Explore selected MobiWave platforms for business operations, customer engagement and investment information.
            </p>
          </div>
          <Link to="/innovations" className="inline-flex w-fit shrink-0 items-center gap-2 border-b border-[#172333]/25 pb-2 text-sm font-bold text-[#172333] transition-colors hover:border-[#176fe8] hover:text-[#176fe8]">
            Explore all innovations <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-x-8 gap-y-5 md:grid-cols-3">
          {featuredInnovations.map(({ name, label, description, href, action, icon: Icon, external }) => (
            <article key={name} className="flex h-full flex-col border-t border-[#dce4ee] py-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#176fe8] shadow-sm">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.1em] text-[#6b7585]">{label}</p>
              <h3 className="mt-2 text-xl font-bold text-[#172333]" style={{ fontFamily: 'Outfit, sans-serif' }}>{name}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#586273]">{description}</p>
              <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#176fe8] hover:text-[#105ac0]">
                {action} <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
