import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, EASE_OUT_EXPO } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';
import { FloatingPlus } from '@/components/Decorations';

const steps = [
  {
    num: '01',
    title: 'Tell us what you need',
    paragraphs: [
      'A two-minute conversation is enough. We\'ll ask about volumes, networks, integration points, and budget.',
    ],
  },
  {
    num: '02',
    title: 'We set it up',
    paragraphs: [
      'Most clients are live within a day. APIs, docs, sandbox environment — we handle the setup and test everything first.',
    ],
  },
  {
    num: '03',
    title: 'You send. We monitor.',
    paragraphs: [
      'Real-time dashboard, delivery reports, and a support WhatsApp line. If something looks off, we call you before you notice.',
    ],
  },
];

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      <FloatingPlus className="w-5 h-5 top-20 left-[10%] !text-gray-300" />

      <div className="container-custom">
        <motion.div
          className="max-w-2xl mb-14"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <MotionItem>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">How it works</span>
          </MotionItem>
          <MotionItem>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a1a25] mt-2 mb-3"
              style={{ fontFamily: 'Outfit, sans-serif' }}>
              Three steps to go live
            </h2>
          </MotionItem>
          <MotionItem>
            <p className="text-sm text-gray-500 leading-relaxed">
              No onboarding calls. No sales deck. Just a working platform.
            </p>
          </MotionItem>
        </motion.div>

        <div ref={ref}>
          <div className="grid lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: EASE_OUT_EXPO }}
                className="relative p-6 rounded-xl bg-white border border-gray-200 hover:border-blue-200 transition-colors group"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px bg-gray-300" />
                )}
                <div className="text-5xl font-bold text-gray-100 mb-4 group-hover:text-blue-100 transition-colors"
                  style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-[#0a1a25] mb-2">{step.title}</h3>
                {step.paragraphs.map((p, pi) => (
                  <p key={pi} className="text-sm text-gray-500 leading-relaxed">{p}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
