import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { Contact } from '@/sections/Contact';

export function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          className="relative p-8 md:p-12 rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0a1a25 0%, #0d2137 50%, #0a1a25 100%)' }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          {/* Glow effects */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,132,255,0.15) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(29,140,137,0.1) 0%, transparent 70%)' }} />

          <div className="relative z-10 max-w-xl mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3"
              style={{ fontFamily: 'Outfit, sans-serif' }}>
              Need a communication platform that works in Kenya?
            </h2>
            <p className="text-sm text-white/50 leading-relaxed">
              Send us a message or call +254 736 427 842. We&apos;ll get back to you within an hour during business hours.
            </p>
          </div>
          <div className="relative z-10">
            <Contact embedded />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
