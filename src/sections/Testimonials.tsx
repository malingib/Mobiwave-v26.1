import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { staggerContainer, EASE_OUT_EXPO } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Pheddis Mbodze', role: 'Team Lead, TUAN', content: 'The SMS platform helped us reach over 100,000 customers. Delivery rate was 99% — we could see exactly who received and who didn\'t.' },
  { name: 'Herbert Kahindi', role: 'Administrator, Malanga Welfare', content: 'M-Pesa integration took two days to set up. Payment reconciliation used to take a full day — now it\'s automatic.' },
  { name: 'Ibrahim Shehi', role: 'Operations Director, BID Logistics', content: 'We switched from another provider. Better delivery rates, lower costs, and the USSD service works for our rural customers who don\'t have smartphones.' },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const next = useCallback(() => setIdx((i) => (i + 1) % testimonials.length), []);
  const prev = useCallback(() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[idx];

  return (
    <section className="py-24 bg-[#0a1a25]">
      <div className="container-custom">
        <motion.div
          className="max-w-2xl mb-10"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <MotionItem>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Clients</span>
          </MotionItem>
          <MotionItem>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2 mb-3"
              style={{ fontFamily: 'Outfit, sans-serif' }}>
              What clients say
            </h2>
          </MotionItem>
        </motion.div>

        <div ref={ref} className="max-w-2xl">
          <div className="relative">
            <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-500/20" />
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="pl-6"
              >
                <blockquote className="text-base text-white/60 leading-relaxed mb-5 italic">
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-8">
            <button onClick={prev} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-6 bg-blue-500' : 'w-1.5 bg-white/20 hover:bg-white/40'}`} />
              ))}
            </div>
            <button onClick={next} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
