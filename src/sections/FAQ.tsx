import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { EASE_OUT_EXPO, staggerContainer } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';

const faqs = [
  { question: 'How quickly can I get started?', answer: 'Most clients are live within a day. Sign up, get API keys and a sandbox, send a test batch, and we handle setup and delivery verification before production.' },
  { question: 'What are the delivery rates?', answer: 'We maintain 99.9% delivery across Safaricom, Airtel, and Telkom. Real-time reports show exactly who received each message and who did not.' },
  { question: 'Is there a minimum commitment?', answer: 'No long contracts. Pay for what you use. Starter plans are pay-as-you-go, with volume discounts as you scale.' },
  { question: 'How does M-Pesa integration work?', answer: 'STK Push from your platform, customers confirm on their phone. We support C2B, B2C, and B2B with automatic reconciliation built in.' },
  { question: 'Can I schedule messages?', answer: 'Yes. Schedule SMS, email, and WhatsApp for future delivery, including recurring campaigns and triggers from the dashboard.' },
  { question: 'What support do I get?', answer: 'A real WhatsApp support line and phone number. If something looks off, we call you before you notice.' },
];

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="overflow-hidden bg-[#f4f7fb] py-20 lg:py-28" aria-labelledby="faq-heading">
      <div className="container-custom">
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer} className="grid items-start gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <MotionItem className="lg:sticky lg:top-32">
            <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0084ff]">
              <span className="h-px w-8 bg-[#0084ff]" />
              FAQ
            </div>
            <h2 id="faq-heading" className="max-w-md text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0a1a25] sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Straight answers before you start.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-[#5b6b78]">
              The practical questions Kenyan organisations ask before they switch providers.
            </p>
            <a href="#contact" className="mt-8 inline-flex text-sm font-bold text-[#0084ff] hover:text-[#0068d6]">Still have a question? Talk to us <span className="ml-2">&rarr;</span></a>
          </MotionItem>

          <MotionItem>
            <div className="border-t border-[#0a1a25]/15">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={faq.question} className="border-b border-[#0a1a25]/15">
                    <button onClick={() => setOpenIndex(isOpen ? -1 : index)} className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7" aria-expanded={isOpen}>
                      <span className="text-lg font-bold text-[#0a1a25] transition-colors group-hover:text-[#0084ff] sm:text-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>{faq.question}</span>
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#0a1a25]/15 transition-all ${isOpen ? 'rotate-180 border-[#0084ff] bg-[#0084ff] text-white' : 'text-[#5b6b78]'}`}><ChevronDown className="h-4 w-4" /></span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}>
                          <p className="max-w-2xl pb-7 pr-12 text-sm leading-7 text-[#5b6b78] sm:text-base">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </MotionItem>
        </motion.div>
      </div>
    </section>
  );
}
