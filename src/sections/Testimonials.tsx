import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { staggerContainer, EASE_OUT_EXPO } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';
import { SectionHeader } from '@/components/SectionHeader';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  { name: 'Pheddis Mbodze', role: 'Team Lead, TUAN', content: 'The SMS platform helped us reach over 100,000 customers. Delivery rate was 99% — we could see exactly who received and who didn\'t.', rating: 5 },
  { name: 'Herbert Kahindi', role: 'Administrator, Malanga Welfare', content: 'M-Pesa integration took two days to set up. Payment reconciliation used to take a full day — now it\'s automatic.', rating: 5 },
  { name: 'Ibrahim Shehi', role: 'Operations Director, BID Logistics', content: 'We switched from another provider. Better delivery rates, lower costs, and the USSD service works for our rural customers who don\'t have smartphones.', rating: 5 },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const next = useCallback(() => setIdx((i) => (i + 1) % testimonials.length), []);
  const prev = useCallback(() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[idx];

  return (
    <section id="testimonials" className="relative py-20 lg:py-28 bg-white overflow-hidden mw-mesh-light" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <SectionHeader
            label="Clients"
            title="What clients say"
            description="Real feedback from SACCOs, logistics firms, and community organisations using MobiWave every day."
          />

          <MotionItem>
            <div className="relative mw-gradient-border rounded-[28px] p-8 md:p-10 bg-white shadow-[0_16px_50px_rgba(4,16,28,0.08)]">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-[#0084ff]/8" aria-hidden />
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                >
                  <div className="flex gap-1 mb-5" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                  <blockquote className="text-base sm:text-lg text-[#0a1a25]/80 leading-relaxed mb-7">
                    &ldquo;{t.content}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-md"
                      style={{ background: 'linear-gradient(135deg, #0084ff, #1d8c89)' }}
                      aria-hidden
                    >
                      {t.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div id="testimonials-heading" className="text-base font-bold text-[#0a1a25]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {t.name}
                      </div>
                      <div className="text-sm text-[#5b6b78]">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(10,26,37,0.06)]">
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === idx ? 'w-8 bg-[#0084ff]' : 'w-2 bg-[#0a1a25]/12 hover:bg-[#0a1a25]/25'
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                      aria-current={i === idx ? 'true' : undefined}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={prev} className="w-10 h-10 rounded-xl border border-[rgba(10,26,37,0.08)] flex items-center justify-center text-[#5b6b78] hover:text-[#0084ff] hover:border-[#0084ff]/25 transition-all" aria-label="Previous testimonial">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={next} className="w-10 h-10 rounded-xl border border-[rgba(10,26,37,0.08)] flex items-center justify-center text-[#5b6b78] hover:text-[#0084ff] hover:border-[#0084ff]/25 transition-all" aria-label="Next testimonial">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </MotionItem>
        </motion.div>
      </div>
    </section>
  );
}
