import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MessageSquare,
  MessageCircle,
  Smartphone,
  CreditCard,
  Phone,
  BarChart3,
} from 'lucide-react';
import { staggerContainer } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';
import { FloatingPlus, FloatingCircle } from '@/components/Decorations';

const features = [
  {
    icon: MessageSquare,
    title: 'Bulk SMS Messaging',
    description:
      'Send personalized SMS to millions with 99.9% delivery rates. Schedule campaigns, track delivery, and analyze engagement.',
    gradient: 'from-blue-500 to-cyan-400',
    shadow: 'shadow-blue-500/20',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Business API',
    description:
      'Connect with customers on their favorite app. Rich media support, quick replies, and automated workflows.',
    gradient: 'from-emerald-500 to-teal-400',
    shadow: 'shadow-emerald-500/20',
  },
  {
    icon: Smartphone,
    title: 'USSD Solutions',
    description:
      'Create interactive *384# services for surveys, voting, and menu-driven interactions without internet.',
    gradient: 'from-orange-500 to-amber-400',
    shadow: 'shadow-orange-500/20',
  },
  {
    icon: CreditCard,
    title: 'M-Pesa Integration',
    description:
      'Seamless STK push payments, transaction notifications, and automated reconciliation.',
    gradient: 'from-teal-500 to-green-400',
    shadow: 'shadow-teal-500/20',
  },
  {
    icon: Phone,
    title: 'Voice & IVR',
    description:
      'Automated calls, interactive voice responses, and call center integrations.',
    gradient: 'from-violet-500 to-purple-400',
    shadow: 'shadow-violet-500/20',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'Real-time insights into delivery rates, engagement metrics, and campaign performance.',
    gradient: 'from-sky-500 to-indigo-400',
    shadow: 'shadow-sky-500/20',
  },
];

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="features" className="relative py-24 bg-[#0a1a25] overflow-hidden">
      <FloatingPlus className="w-6 h-6 top-20 left-[15%]" />
      <FloatingPlus className="w-4 h-4 top-40 right-[20%]" />
      <FloatingCircle className="top-32 right-[10%]" size={120} />
      <FloatingCircle className="bottom-20 left-[8%]" size={80} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <MotionItem>
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-full mb-4 border border-blue-500/20">
              POWERFUL FEATURES
            </span>
          </MotionItem>
          <MotionItem>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: 'Outfit, sans-serif' }}>
              Everything You Need to Communicate at Scale
            </h2>
          </MotionItem>
          <MotionItem>
            <p className="text-lg text-white/50">
              From bulk messaging to M-Pesa integrations, our platform provides all the tools
              you need to reach and engage your audience.
            </p>
          </MotionItem>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <MotionItem key={index}>
              <motion.div
                className="group relative rounded-2xl p-7 border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
                whileHover={{ y: -6, borderColor: 'rgba(0,132,255,0.3)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg ${feature.shadow}`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors"
                  style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {feature.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </MotionItem>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
