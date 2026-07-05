import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  MessageSquare,
  Smartphone,
  CreditCard,
  MessageCircle,
  Mail,
  Gift,
} from 'lucide-react';
import { staggerContainer } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';

const services = [
  {
    id: 'bulk-sms',
    title: 'Bulk SMS',
    description: 'Send to any Kenyan network — Safaricom, Airtel, Telkom. Real-time delivery reports, smart routing, no middlemen.',
    href: '/services/bulk-sms',
    icon: MessageSquare,
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'ussd',
    title: 'USSD Services',
    description: 'Interactive menus that work without internet. Used by SACCOs, hospitals, and government agencies across Kenya.',
    href: '/services/ussd-codes',
    icon: Smartphone,
    gradient: 'from-orange-500 to-amber-400',
  },
  {
    id: 'mpesa',
    title: 'M-Pesa Integration',
    description: 'Accept payments, disburse funds, reconcile automatically. Built for Kenyan businesses by people who know the API.',
    href: '/services/mpesa-integration',
    icon: CreditCard,
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    id: 'whatsapp',
    title: 'Bulk WhatsApp',
    description: 'Rich media, delivery receipts, template messaging for customer support and broadcast.',
    href: '/services/bulk-whatsapp',
    icon: MessageCircle,
    gradient: 'from-green-500 to-emerald-400',
  },
  {
    id: 'email',
    title: 'Bulk Email',
    description: 'Campaigns, receipts, and notifications. High deliverability, detailed analytics.',
    href: '/services/bulk-email',
    icon: Mail,
    gradient: 'from-violet-500 to-purple-400',
  },
  {
    id: 'airtime',
    title: 'Airtime & Rewards',
    description: 'Incentivise customers with instant airtime and data. For promotions, referrals, and loyalty programmes.',
    href: '/services/airtime-rewards',
    icon: Gift,
    gradient: 'from-pink-500 to-rose-400',
  },
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="services" className="relative py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          className="max-w-2xl mb-14"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <MotionItem>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">What we do</span>
          </MotionItem>
          <MotionItem>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a1a25] mt-2 mb-3"
              style={{ fontFamily: 'Outfit, sans-serif' }}>
              Communication tools for Kenyan organisations
            </h2>
          </MotionItem>
          <MotionItem>
            <p className="text-sm text-gray-500 leading-relaxed">
              SMS, USSD, M-Pesa, WhatsApp, and email — all on one platform.
              Built in Nairobi, used across East Africa.
            </p>
          </MotionItem>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {services.map((svc) => (
            <MotionItem key={svc.id}>
              <motion.a
                href={svc.href}
                className="group block p-5 rounded-xl border border-gray-200 bg-white hover:border-blue-200 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${svc.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <svc.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-[#0a1a25] text-sm mb-2 group-hover:text-blue-600 transition-colors">{svc.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{svc.description}</p>
              </motion.a>
            </MotionItem>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
