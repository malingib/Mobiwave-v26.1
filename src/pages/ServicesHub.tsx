import { Link } from 'react-router-dom';
import {
  ArrowRight, MessageSquare, Mail, MessageCircle, Smartphone, Hash,
  CreditCard, ClipboardList, Gift, Headset, ReceiptText, Code2,
} from 'lucide-react';

const services = [
  { title: 'Bulk SMS', description: 'Send customer alerts, OTPs, reminders and campaigns across Kenyan mobile networks, with delivery reports and API access.', href: '/services/bulk-sms', icon: MessageSquare },
  { title: 'Bulk Email', description: 'Deliver newsletters, announcements and transactional emails with campaign tools and integration options.', href: '/services/bulk-email', icon: Mail },
  { title: 'Bulk WhatsApp', description: 'Use the official WhatsApp Business platform for customer updates, campaigns and two-way support conversations.', href: '/services/bulk-whatsapp', icon: MessageCircle },
  { title: 'USSD Services', description: 'Build interactive, internet-free menus for registrations, account services, surveys and customer self-service.', href: '/services/ussd-codes', icon: Smartphone },
  { title: 'Shortcodes & Sender IDs', description: 'Give your communications a recognizable identity and support two-way messaging, responses and customer engagement.', href: '/services/shortcodes', icon: Hash },
  { title: 'M-Pesa Integration', description: 'Connect payment collection and STK Push flows to your website, app or business system, with callback support.', href: '/services/mpesa-integration', icon: CreditCard },
  { title: 'SMS Surveys', description: 'Collect customer feedback, run polls and capture responses through SMS-based surveys and reporting.', href: '/services/sms-surveys', icon: ClipboardList },
  { title: 'Airtime & Rewards', description: 'Support customer loyalty, promotions and approved incentive programmes with airtime rewards.', href: '/services/airtime-rewards', icon: Gift },
  { title: 'Service Desk', description: 'Organise service requests and customer support workflows so teams can track issues and follow through.', href: '/services/service-desk', icon: Headset },
  { title: 'MobiWave CNC', description: 'Manage business expenses, allocations and eTIMS receipt evidence with accountable workflows for distributed teams.', href: '/innovations', icon: ReceiptText },
  { title: 'APIs & Integrations', description: 'Connect messaging and payment services to your existing software using developer documentation and supported APIs.', href: '/developers/docs', icon: Code2 },
];

export function ServicesHub() {
  return (
    <div className="bg-white pt-28 sm:pt-32">
      <section className="border-b border-[#e7ebf0] bg-[#f7f9fc]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#176fe8]">MobiWave services</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight tracking-[-0.04em] text-[#172333] sm:text-5xl lg:text-6xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            The services your business needs to connect, transact and grow.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#586273] sm:text-lg">
            Explore MobiWave’s communication, payments and business workflow services in one place. Choose a service to see how it works, available options and next steps.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-[#176fe8] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#105ac0]">Talk to our team <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/developers/docs" className="inline-flex items-center gap-2 rounded-md border border-[#d4dce7] bg-white px-5 py-3 text-sm font-bold text-[#172333] transition-colors hover:border-[#176fe8] hover:text-[#176fe8]">Developer documentation</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20" aria-labelledby="all-services-heading">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#176fe8]">Explore our services</p>
          <h2 id="all-services-heading" className="mt-3 text-3xl font-extrabold tracking-[-0.035em] text-[#172333] sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>One place to find the right solution.</h2>
          <p className="mt-4 text-base leading-7 text-[#586273]">From reaching customers to collecting payments and managing operations, start with the service that fits your needs.</p>
        </div>
        <div className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, description, href, icon: Icon }) => (
            <article key={title} className="flex h-full flex-col border-t border-[#dfe5ed] py-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#edf4ff] text-[#176fe8]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#172333]" style={{ fontFamily: 'Outfit, sans-serif' }}>{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#586273]">{description}</p>
              <Link to={href} className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#176fe8] hover:text-[#105ac0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176fe8]">
                Explore service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="border-t border-[#e7ebf0] bg-[#f7f9fc]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#172333]" style={{ fontFamily: 'Outfit, sans-serif' }}>Not sure which service is right for you?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#586273]">Tell us what you’re trying to achieve and our team can help you choose a practical starting point.</p>
          </div>
          <Link to="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#176fe8] px-5 py-3 text-sm font-bold text-white hover:bg-[#105ac0]">Contact MobiWave <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </div>
  );
}
