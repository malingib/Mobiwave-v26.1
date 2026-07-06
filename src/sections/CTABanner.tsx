import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { fadeUp } from '@/lib/motion';
import { Contact } from '@/sections/Contact';
import { PremiumReveal } from '@/components/PremiumReveal';

export function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="contact" className="relative py-20 lg:py-28 mw-section-surface overflow-hidden" aria-labelledby="cta-heading">
      <div className="container-custom">
        <motion.div
          ref={ref}
          className="relative rounded-[28px] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0a1a25 0%, #0d2137 45%, #0a1a25 100%)',
            boxShadow: '0 24px 60px rgba(4,16,28,0.22), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[min(400px,70vw)] h-[min(400px,70vw)] mw-glow-blue rounded-full" />
            <div className="absolute bottom-0 left-0 w-[min(320px,60vw)] h-[min(320px,60vw)] mw-glow-teal rounded-full" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 lg:p-14">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              <PremiumReveal direction="left">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
                  <span className="text-xs font-bold text-[#36b8ff] uppercase tracking-[0.18em]">Get in touch</span>
                </div>
                <h2
                  id="cta-heading"
                  className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-white mb-5 leading-[1.15]"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Need a communication platform that works in Kenya?
                </h2>
                <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-8 max-w-md">
                  Send us a message or call directly. We respond within an hour during business hours — Mon–Fri, 9am–5pm EAT.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:+254736427842" className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-[#1d8c89]" />
                    +254 736 427 842
                  </a>
                  <a href="mailto:info@mobiwave.co.ke" className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white transition-colors">
                    info@mobiwave.co.ke
                    <ArrowRight className="w-4 h-4 text-[#0084ff]" />
                  </a>
                </div>
              </PremiumReveal>

              <PremiumReveal direction="right" delay={0.1}>
                <div className="rounded-[22px] border border-white/10 bg-[rgba(9,27,39,0.55)] backdrop-blur-xl p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
                  <Contact embedded />
                </div>
              </PremiumReveal>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
