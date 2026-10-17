import {
  ArrowUpRight, Bot, CreditCard, FileCheck2, Landmark, Network, RadioTower, ShieldCheck,
  Workflow, Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const platforms = [
  {
    name: 'MobiWave CNC',
    category: 'Business operations',
    description: 'Expense accountability and eTIMS evidence workflows for teams working across branches, regions and field locations.',
    features: ['Expense allocations', 'Receipt and eTIMS evidence', 'Team accountability'],
    href: 'https://mobiwavecnc.vercel.app',
    action: 'Open platform',
    icon: FileCheck2,
    status: 'Platform',
  },
  {
    name: 'MobiWave AI',
    category: 'AI & customer experience',
    description: 'AI-powered customer engagement experiences designed to help businesses respond faster and serve customers across digital channels.',
    features: ['AI-assisted support', 'Customer conversations', 'Business integrations'],
    href: 'https://mobiwaveai.co.ke',
    action: 'Explore platform',
    icon: Bot,
    status: 'Platform',
  },
  {
    name: 'Invest Kilifi',
    category: 'Investment & economic development',
    description: 'A digital gateway for exploring Kilifi County’s investment opportunities, sectors and investor journey.',
    features: ['Investment opportunities', 'Sector information', 'Investor journey'],
    href: 'https://kic.mobiwave.co.ke',
    action: 'Explore portal',
    icon: Landmark,
    status: 'Portal',
  },
  {
    name: 'MobiWave Messaging',
    category: 'Telecom & communications',
    description: 'Communication services that help organisations reach customers through SMS, email, WhatsApp and USSD.',
    features: ['Bulk messaging', 'USSD and shortcodes', 'APIs and delivery reports'],
    href: '/services',
    action: 'Explore services',
    icon: RadioTower,
    status: 'Services',
  },
  {
    name: 'MobiPay',
    category: 'Payments & integrations',
    description: 'Payment experiences built around business collection workflows, M-Pesa integrations and reconciliation needs.',
    features: ['Payment collection flows', 'STK Push integrations', 'Payment operations'],
    href: '/services/mpesa-integration',
    action: 'Explore integrations',
    icon: CreditCard,
    status: 'Solutions',
  },
  {
    name: 'Digital platforms for organisations',
    category: 'Custom platforms',
    description: 'Purpose-built digital systems for organisations that need their workflows, access and reporting to match how they operate.',
    features: ['Role-based workflows', 'Operational dashboards', 'Custom integrations'],
    href: '/contact',
    action: 'Discuss a project',
    icon: Workflow,
    status: 'Custom',
  },
];

const capabilities = [
  { icon: Network, title: 'Connected systems', description: 'Bring communications, payments and operational workflows together through practical integrations.' },
  { icon: ShieldCheck, title: 'Designed around your operations', description: 'Build around real roles, permissions and processes rather than forcing teams into a generic workflow.' },
  { icon: Users, title: 'Built with your team', description: 'Start with the problem, define a useful first release, and improve it with feedback from actual users.' },
];

export function Products() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white pt-28 sm:pt-32">
      <section className="border-b border-[#e3e9f1] bg-[#f6f8fb]">
        <div className="container-custom py-16 sm:py-20 lg:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#176fe8]">MobiWave Innovations</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight tracking-[-0.045em] text-[#172333] sm:text-5xl lg:text-6xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Digital products built around real work.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#586273] sm:text-lg">
            Explore MobiWave platforms, industry solutions and custom digital systems that help organisations communicate, manage operations and connect services.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-[#176fe8] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#105ac0]">
              Discuss your project <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 rounded-md border border-[#d2dbe7] bg-white px-5 py-3 text-sm font-bold text-[#172333] transition-colors hover:border-[#176fe8] hover:text-[#176fe8]">
              Explore all services
            </Link>
          </div>
        </div>
      </section>

      <section className="container-custom py-14 sm:py-18 lg:py-20" aria-labelledby="innovation-platforms-heading">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#176fe8]">Platforms & solutions</p>
          <h2 id="innovation-platforms-heading" className="mt-3 text-3xl font-extrabold tracking-[-0.035em] text-[#172333] sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Find the right starting point.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#586273]">
            From existing platforms to tailored software, each solution is focused on a clear operational need.
          </p>
        </div>
        <div className="mt-9 grid gap-x-8 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          {platforms.map((item) => {
            const Icon = item.icon;
            const external = item.href.startsWith('http');
            return (
              <article key={item.name} className="flex h-full flex-col border-t border-[#dfe5ed] py-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#edf4ff] text-[#176fe8]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="rounded-full bg-[#f1f4f8] px-3 py-1 text-xs font-semibold text-[#586273]">{item.status}</span>
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.1em] text-[#6b7585]">{item.category}</p>
                <h3 className="mt-2 text-xl font-bold text-[#172333]" style={{ fontFamily: 'Outfit, sans-serif' }}>{item.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#586273]">{item.description}</p>
                <ul className="mt-4 space-y-2">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[#455163]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#176fe8]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {external ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#176fe8] hover:text-[#105ac0]">
                    {item.action} <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Link to={item.href} className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#176fe8] hover:text-[#105ac0]">
                    {item.action} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[#e3e9f1] bg-[#f6f8fb]">
        <div className="container-custom py-14 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#176fe8]">How we build</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] text-[#172333] sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Useful technology, without unnecessary complexity.
            </h2>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <div key={title} className="border-t border-[#d7e0eb] pt-5">
                <Icon className="h-6 w-6 text-[#176fe8]" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-[#172333]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#586273]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-custom py-14 sm:py-18 lg:py-20">
        <div className="flex flex-col gap-6 rounded-xl bg-[#102337] px-6 py-9 sm:px-10 sm:py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Have a challenge worth solving?</h2>
            <p className="mt-3 text-sm leading-6 text-white/75 sm:text-base">Tell us about your organisation, users and workflow. We’ll help identify a practical solution and next step.</p>
          </div>
          <Link to="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-[#102337] transition-colors hover:bg-[#eaf1f8]">
            Start a conversation <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
