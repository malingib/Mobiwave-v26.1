import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { staggerContainer, EASE_OUT_EXPO } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';
import { SectionHeader } from '@/components/SectionHeader';
import { PremiumReveal } from '@/components/PremiumReveal';

const faqs = [
  {
    question: 'How quickly can I get started?',
    answer:
      'Most clients are live within a day. Sign up, get API keys and a sandbox, send a test batch — we handle setup and verify delivery before you go production.',
  },
  {
    question: 'What are the delivery rates?',
    answer:
      'We maintain 99.9% delivery across Safaricom, Airtel, and Telkom. Real-time reports show exactly who received each message and who didn\'t.',
  },
  {
    question: 'Is there a minimum commitment?',
    answer:
      'No long contracts. Pay for what you use. Starter plans are pay-as-you-go; volume discounts apply as you scale.',
  },
  {
    question: 'How does M-Pesa integration work?',
    answer:
      'STK Push from your platform, customers confirm on their phone. We support C2B, B2C, and B2B with automatic reconciliation built in.',
  },
  {
    question: 'Can I schedule messages?',
    answer:
      'Yes — schedule SMS, email, and WhatsApp for future delivery. Set recurring campaigns and triggers from the dashboard.',
  },
  {
    question: 'What support do I get?',
    answer:
      'A real WhatsApp support line and phone number. If something looks off, we call you before you notice. No ticket black holes.',
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: (typeof faqs)[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
      isOpen ? 'border-[#0084ff]/30 shadow-[0_8px_30px_rgba(0,132,255,0.08)] bg-white' : 'border-[rgba(10,26,37,0.08)] bg-white/80 hover:border-[rgba(0,132,255,0.15)]'
    }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-bold text-[#0a1a25] pr-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-lg font-bold transition-all duration-300 ${
            isOpen ? 'bg-[#0084ff] text-white' : 'bg-[#f4f7fb] text-[#5b6b78]'
          }`}
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          >
            <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-[#5b6b78] leading-relaxed border-t border-[rgba(10,26,37,0.05)] pt-4">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-20 lg:py-28 mw-section-surface overflow-hidden" aria-labelledby="faq-heading">
      {/* Zeinet-inspired left accent stripe (subtle) */}
      <div
        className="absolute top-0 left-0 w-10 sm:w-14 h-full opacity-70 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(124,58,237,0.35), rgba(29,140,137,0.22))' }}
        aria-hidden
      />
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <PremiumReveal direction="left">
            <SectionHeader
              label="FAQ"
              title="Straight answers, no sales deck"
              description="The questions Kenyan organisations actually ask before they switch providers."
            />
            <div className="mt-8 rounded-[26px] overflow-hidden shadow-[0_16px_50px_rgba(4,16,28,0.1)] border border-[rgba(10,26,37,0.06)]">
              <img
                src="/about/about-3.jpg"
                alt="MobiWave support team helping a client"
                className="w-full h-[280px] sm:h-[360px] object-cover"
                loading="lazy"
              />
            </div>
          </PremiumReveal>

          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="space-y-3"
          >
            <h2 id="faq-heading" className="sr-only">Frequently asked questions</h2>
            {faqs.map((faq, index) => (
              <MotionItem key={faq.question}>
                <FAQItem
                  faq={faq}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
              </MotionItem>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
