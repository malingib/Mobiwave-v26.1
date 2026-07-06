import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Smartphone,
  CreditCard,
  MessageCircle,
  Mail,
  Gift,
  ArrowUpRight,
} from 'lucide-react';
import { staggerContainer } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';
import { SectionHeader } from '@/components/SectionHeader';
import { TiltCard } from '@/components/TiltCard';
import { FloatingPlus, ParallaxDecoration } from '@/components/Decorations';
import { PremiumReveal } from '@/components/PremiumReveal';

const services = [
  {
    id: 'bulk-sms',
    title: 'Bulk SMS',
    description: 'Safaricom, Airtel, Telkom — smart routing, real-time delivery reports, no middlemen.',
    href: '/services/bulk-sms',
    icon: MessageSquare,
    accent: '#0084ff',
    featured: true,
    span: 'lg:col-span-6 lg:row-span-2',
  },
  {
    id: 'ussd',
    title: 'USSD Services',
    description: 'Interactive menus without internet. SACCOs, hospitals, government.',
    href: '/services/ussd-codes',
    icon: Smartphone,
    accent: '#f59e0b',
    span: 'lg:col-span-3',
  },
  {
    id: 'mpesa',
    title: 'M-Pesa Integration',
    description: 'Payments, disbursements, auto-reconciliation.',
    href: '/services/mpesa-integration',
    icon: CreditCard,
    accent: '#1d8c89',
    span: 'lg:col-span-3',
  },
  {
    id: 'whatsapp',
    title: 'Bulk WhatsApp',
    description: 'Rich media, templates, delivery receipts.',
    href: '/services/bulk-whatsapp',
    icon: MessageCircle,
    accent: '#22c55e',
    span: 'lg:col-span-4',
  },
  {
    id: 'email',
    title: 'Bulk Email',
    description: 'Campaigns with high deliverability and analytics.',
    href: '/services/bulk-email',
    icon: Mail,
    accent: '#7c3aed',
    span: 'lg:col-span-4',
  },
  {
    id: 'airtime',
    title: 'Airtime & Rewards',
    description: 'Instant airtime and data for loyalty programmes.',
    href: '/services/airtime-rewards',
    icon: Gift,
    accent: '#ec4899',
    span: 'lg:col-span-4',
  },
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section id="services" className="relative py-20 lg:py-28 bg-white overflow-hidden" aria-labelledby="services-heading">
      <ParallaxDecoration speed={0.25} className="top-[12%] right-[6%]">
        <FloatingPlus className="w-12 h-12 !text-[#0084ff]/10" />
      </ParallaxDecoration>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <SectionHeader
              label="What we do"
              title="Communication tools for Kenyan organisations"
              description="SMS, USSD, M-Pesa, WhatsApp, and email — all on one platform. Built in Nairobi, used across East Africa."
            />
            <PremiumReveal direction="right" delay={0.05}>
              <Link
                to="/innovations"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0a1a25] bg-[#f4f7fb] border border-[rgba(10,26,37,0.08)] rounded-full px-5 py-3 hover:border-[#0084ff]/25 hover:text-[#0084ff] transition-colors w-fit"
                aria-label="View all services and innovations"
              >
                View all
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </PremiumReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 auto-rows-fr">
            {services.map((svc) => (
              <MotionItem key={svc.id} className={svc.span}>
                <TiltCard maxTilt={6} scale={1.01} className="h-full">
                  <Link
                    to={svc.href}
                    className={`group mw-gradient-border flex flex-col h-full min-h-[180px] p-6 sm:p-7 rounded-[22px] bg-white shadow-[0_8px_30px_rgba(4,16,28,0.05)] hover:shadow-[0_20px_50px_rgba(0,132,255,0.12)] transition-shadow duration-500 ${
                      svc.featured ? 'lg:min-h-[360px] lg:justify-between' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                        style={{ background: `${svc.accent}14`, border: `1px solid ${svc.accent}22` }}
                      >
                        <svc.icon className="w-5 h-5" style={{ color: svc.accent }} />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#5b6b78]/30 group-hover:text-[#0084ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                    <div>
                      <h3
                        id={svc.featured ? 'services-heading' : undefined}
                        className={`font-extrabold text-[#0a1a25] mb-2 group-hover:text-[#0084ff] transition-colors ${
                          svc.featured ? 'text-xl sm:text-2xl' : 'text-base'
                        }`}
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        {svc.title}
                      </h3>
                      <p className={`text-[#5b6b78] leading-relaxed ${svc.featured ? 'text-sm sm:text-base' : 'text-sm'}`}>
                        {svc.description}
                      </p>
                    </div>
                    {svc.featured && (
                      <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0084ff]">
                        Explore service <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </Link>
                </TiltCard>
              </MotionItem>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
