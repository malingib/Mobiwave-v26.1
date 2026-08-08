import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  CreditCard,
  Gift,
  Mail,
  MessageCircle,
  MessageSquare,
  Smartphone,
} from 'lucide-react';
import { staggerContainer } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';

const services = [
  {
    title: 'Bulk SMS',
    description: 'Reach customers at scale with smart routing and live delivery reports.',
    href: '/services/bulk-sms',
    icon: MessageSquare,
    accent: '#0084ff',
  },
  {
    title: 'USSD services',
    description: 'Build useful, internet-free experiences for every kind of phone.',
    href: '/services/ussd-codes',
    icon: Smartphone,
    accent: '#f59e0b',
  },
  {
    title: 'M-Pesa integration',
    description: 'Collect, send and reconcile payments without the manual work.',
    href: '/services/mpesa-integration',
    icon: CreditCard,
    accent: '#1d8c89',
  },
  {
    title: 'WhatsApp',
    description: 'Turn conversations into a richer channel for support and sales.',
    href: '/services/bulk-whatsapp',
    icon: MessageCircle,
    accent: '#22c55e',
  },
  {
    title: 'Bulk email',
    description: 'Send campaigns that are easy to measure and built to deliver.',
    href: '/services/bulk-email',
    icon: Mail,
    accent: '#7c3aed',
  },
  {
    title: 'Airtime & rewards',
    description: 'Make loyalty and incentive programmes instant and effortless.',
    href: '/services/airtime-rewards',
    icon: Gift,
    accent: '#ec4899',
  },
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-20 lg:py-28"
      aria-labelledby="services-heading"
    >
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mx-auto max-w-6xl"
        >
          <MotionItem className="text-center">
            <div className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#176fe8]">
              <span className="h-px w-8 bg-[#176fe8]" />
              What we do
              <span className="h-px w-8 bg-[#176fe8]" />
            </div>
            <h2 id="services-heading" className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.04] tracking-[-0.04em] text-[#172333] sm:text-5xl lg:text-6xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              The channels that keep business moving.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#586273] sm:text-lg">
              One dependable platform for the moments that matter: a payment made, a customer reached, a message delivered.
            </p>
          </MotionItem>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-7">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <MotionItem key={service.title}>
                  <Link to={service.href} className="group block h-full rounded-[22px] border border-[#172333]/8 bg-white p-7 text-left shadow-[0_12px_30px_rgba(45,49,84,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#176fe8]/25 hover:shadow-[0_18px_36px_rgba(45,49,84,0.1)]">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${service.accent}14`, color: service.accent }}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs text-[#586273]/55">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="mt-7 text-xl font-bold text-[#172333] transition-colors group-hover:text-[#176fe8]" style={{ fontFamily: 'Outfit, sans-serif' }}>{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#586273]">{service.description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#176fe8]">Explore service <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                  </Link>
                </MotionItem>
              );
            })}
          </div>

          <MotionItem className="mt-10 text-center">
            <Link to="/innovations" className="group inline-flex items-center gap-2 border-b border-[#172333]/25 pb-2 text-sm font-bold text-[#172333] transition-colors hover:border-[#176fe8] hover:text-[#176fe8]">
              See the full platform <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </MotionItem>
        </motion.div>
      </div>
    </section>
  );
}
