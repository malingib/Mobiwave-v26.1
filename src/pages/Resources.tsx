import { Link } from 'react-router-dom';
import { ArrowRight, FileText, CreditCard, MessageSquare, Smartphone, Mail, BarChart3 } from 'lucide-react';
import { PageBanner } from '@/components/PageBanner';
import { Breadcrumbs } from '@/components/Breadcrumbs';

type GuideEntry = {
  icon: typeof FileText;
  title: string;
  description: string;
  href: string;
};

const guides: GuideEntry[] = [
  {
    icon: FileText,
    title: 'Sender ID Registration in Kenya',
    description: 'How to register an SMS sender ID under the CAK framework — documents, approval time, cost, and MobiWave’s free registration across all three networks.',
    href: '/guides/sender-id-registration-kenya'
  },
  {
    icon: CreditCard,
    title: 'M-Pesa STK Push API in Kenya',
    description: 'How Lipa Na M-Pesa Online works: the Daraja flow, what you need to integrate, callbacks, costs, and bundling with SMS, USSD and WhatsApp.',
    href: '/guides/mpesa-stk-push-api-kenya'
  },
  {
    icon: MessageSquare,
    title: 'Best Bulk SMS Provider in Kenya',
    description: 'A buyer’s guide to choosing a bulk SMS provider — direct interconnects, KES pricing, sender ID registration, delivery reporting and local support.',
    href: '/guides/best-bulk-sms-kenya'
  },
  {
    icon: Smartphone,
    title: 'USSD Code Cost in Kenya',
    description: 'Shared vs dedicated USSD pricing, CAK allocation, end-user per-session charges, and triggering M-Pesa from a menu.',
    href: '/guides/ussd-code-cost-kenya'
  },
  {
    icon: Mail,
    title: 'Bulk Email Marketing in Kenya',
    description: 'How to send email that lands in the inbox: SPF/DKIM/DMARC, segmentation, automation, and bundling with SMS and WhatsApp.',
    href: '/guides/bulk-email-kenya'
  },
  {
    icon: BarChart3,
    title: 'SMS Surveys in Kenya',
    description: 'Run two-way SMS feedback: branching questions, response rates, real-time analytics and CAK/ODPC compliance.',
    href: '/guides/sms-survey-kenya'
  }
];

const popularServices = [
  { label: 'Bulk SMS', href: '/services/bulk-sms' },
  { label: 'M-Pesa Integration', href: '/services/mpesa-integration' },
  { label: 'USSD Codes', href: '/services/ussd-codes' },
  { label: 'Bulk WhatsApp', href: '/services/bulk-whatsapp' }
];

export function Resources() {
  return (
    <div className="min-h-screen bg-white">
      <PageBanner
        title="Resources & Guides"
        subtitle="Practical how-to guides for Kenyan business communication"
      />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources' }]} />

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mb-12 animate-section animate-item">
            <div className="flex items-center justify-center gap-2.5 mb-5 lg:justify-start">
              <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
              <span className="text-xs font-bold text-[#7c3aed] uppercase tracking-[0.18em]">Guides</span>
              <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1a25] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Step-by-step guides
            </h2>
            <p className="text-[#5b6b78] text-lg leading-relaxed">
              Plain-language walkthroughs for the questions Kenyan teams ask most — registration, integration and choosing a provider.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-section">
            {guides.map((g) => (
              <Link
                key={g.href}
                to={g.href}
                className="animate-item mw-card flex flex-col gap-4 p-2 pb-6 hover:border-[#0084ff]/40 transition-colors group"
              >
                <h3 className="text-lg font-bold text-[#0a1a25]" style={{ fontFamily: 'Outfit, sans-serif' }}>{g.title}</h3>
                <p className="text-sm text-[#5b6b78] leading-relaxed flex-1">{g.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0084ff] group-hover:gap-3 transition-all">
                  Read guide <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding mw-section-surface">
        <div className="container-custom">
          <div className="text-center mb-10 animate-section animate-item">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1a25] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Popular services
            </h2>
            <p className="text-[#5b6b78] max-w-2xl mx-auto">
              Explore the communication services these guides build on.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto animate-section">
            {popularServices.map((s) => (
              <Link
                key={s.href}
                to={s.href}
                className="animate-item mw-card p-5 flex items-center justify-between gap-3 hover:border-[#0084ff]/40 transition-colors"
              >
                <span className="font-bold text-[#0a1a25]">{s.label}</span>
                <ArrowRight className="w-4 h-4 text-[#0084ff]" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
