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
          className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"
        >
          <MotionItem className="lg:sticky lg:top-32 lg:self-start">
            <div className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0084ff]">
              <span className="h-px w-8 bg-[#0084ff]" />
              What we do
            </div>
            <h2
              id="services-heading"
              className="max-w-xl text-4xl font-extrabold leading-[1.04] tracking-[-0.04em] text-[#0a1a25] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              The channels that keep business moving.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#5b6b78] sm:text-lg">
              One dependable platform for the moments that matter: a payment made, a customer reached, a message delivered.
            </p>
            <Link
              to="/innovations"
              className="group mt-9 inline-flex items-center gap-2 border-b border-[#0a1a25]/25 pb-2 text-sm font-bold text-[#0a1a25] transition-colors hover:border-[#0084ff] hover:text-[#0084ff]"
            >
              See the full platform
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </MotionItem>

          <MotionItem>
            <div className="border-y border-[#0a1a25]/10">
              <div>
                {services.map((service, index) => {
                  const Icon = service.icon;

                  return (
                    <Link
                      key={service.title}
                      to={service.href}
                      className="group relative flex items-center gap-4 border-b border-[#0a1a25]/10 py-5 last:border-b-0 sm:gap-6 sm:py-6"
                    >
                      <span className="w-6 shrink-0 font-mono text-xs text-[#5b6b78]/60">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${service.accent}14`, color: service.accent }}
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-base font-bold capitalize text-[#0a1a25] transition-colors group-hover:text-[#0084ff] sm:text-lg">
                          {service.title}
                        </span>
                        <span className="mt-1 block max-w-lg text-sm leading-6 text-[#5b6b78]">
                          {service.description}
                        </span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-[#5b6b78]/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#0084ff]" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </MotionItem>
        </motion.div>
      </div>
    </section>
  );
}
