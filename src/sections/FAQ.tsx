import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { staggerContainer, EASE_OUT_EXPO } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';

const faqs = [
  {
    question: 'How quickly can I get started?',
    answer:
      'You can sign up and start sending messages in under 5 minutes. Our quick-start guides and API documentation make integration seamless. For M-Pesa integration, you\'ll need a valid shortcode from Safaricom, which we can help you obtain.',
  },
  {
    question: 'What are the delivery rates?',
    answer:
      'We maintain a 99.9% delivery rate across all major Kenyan networks (Safaricom, Airtel, Telkom). Real-time delivery reports keep you informed of every message status, and our direct carrier connections ensure the fastest delivery times.',
  },
  {
    question: 'Is there a minimum commitment?',
    answer:
      'No minimum contracts or commitments. Pay for what you use, scale up or down anytime. Starter plans work on a pay-as-you-go basis, while Pro and Enterprise plans offer volume discounts for larger messaging needs.',
  },
  {
    question: 'How does M-Pesa integration work?',
    answer:
      'Our STK Push API allows you to initiate payments directly from your platform. Customers receive a popup on their phone to enter their M-Pesa PIN. We support C2B, B2C, and B2B transactions.',
  },
  {
    question: 'Can I schedule messages?',
    answer:
      'Yes, schedule SMS, email, and WhatsApp messages for future delivery. Set up recurring campaigns and automated triggers based on user actions. Our campaign scheduler lets you plan weeks or months in advance.',
  },
  {
    question: 'What support options are available?',
    answer:
      'Starter plans get email support with 24-hour response time. Pro plans include priority chat support with 4-hour response. Enterprise customers receive 24/7 phone support and a dedicated account manager.',
  },
];

function FAQItem({ faq, index, isOpen, onToggle }: { faq: typeof faqs[0]; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE_OUT_EXPO }}
      className={`rounded-lg border transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'border-[#1d8c89] shadow-md'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      style={{ background: isOpen ? '#1d8c89' : '#fff' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span
          className="text-sm font-semibold pr-4 transition-colors duration-300"
          style={{
            fontFamily: 'Outfit, sans-serif',
            color: isOpen ? '#0a1a25' : '#0a1a25',
          }}
        >
          {faq.question}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300"
          style={{
            background: isOpen ? 'rgba(255,255,255,0.25)' : '#f0f0f0',
            color: isOpen ? '#0a1a25' : '#666',
          }}
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
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          >
            <div className="px-5 pb-5 flex gap-4 items-start">
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(10,26,37,0.7)' }}>
                {faq.answer}
              </p>
              <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0 hidden sm:block">
                <img
                  src="https://bracketweb.com/zeinet-html/main-html/assets/images/resources/faq-2-2.jpg"
                  alt="FAQ illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState(1);

  return (
    <section id="faq" className="relative py-24 overflow-hidden bg-white">
      {/* Left decorative purple stripe */}
      <div
        className="absolute top-0 left-0 w-16 sm:w-20 h-full z-0"
        style={{ background: 'linear-gradient(180deg, #6c5ce7, #a855f7)' }}
      />
      <div
        className="absolute bottom-0 left-16 sm:left-20 w-40 sm:w-56 h-14 z-0"
        style={{ background: 'linear-gradient(90deg, #a855f7, transparent)' }}
      />
      <div
        className="absolute bottom-14 left-56 sm:left-72 w-24 sm:w-32 h-10 z-0"
        style={{ background: 'linear-gradient(90deg, #d4b8ff, transparent)' }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl relative">
              <img
                src="https://bracketweb.com/zeinet-html/main-html/assets/images/resources/faq-2-1.jpg"
                alt="FAQ support"
                className="w-full h-[420px] object-cover"
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>

          {/* Right — Accordion */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <MotionItem>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #1d8c89, #0084ff)' }} />
                <span className="text-xs font-semibold text-[#0084ff] uppercase tracking-[0.2em]">
                  Ask Questions
                </span>
              </div>
            </MotionItem>
            <MotionItem>
              <h2
                className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold leading-[1.15] mb-8"
                style={{ fontFamily: 'Outfit, sans-serif', color: '#0a1a25' }}
              >
                Have To Know Question<br />Open For People?
              </h2>
            </MotionItem>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
