import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { Contact } from '@/sections/Contact';

export function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="contact" className="overflow-hidden bg-[#f1efff] py-16 lg:py-24" aria-labelledby="cta-heading">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-[28px] border border-[#172333]/10 bg-white shadow-[0_20px_60px_rgba(45,49,84,0.1)]"
        >
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative p-7 sm:p-10 lg:p-14">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#b8c9e8]/40 blur-3xl" aria-hidden />
              <div className="relative z-10">
                <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6255b7]">
                  <span className="h-px w-8 bg-[#7566cf]" />
                  Let&apos;s talk
                </div>
                <h2 id="cta-heading" className="max-w-md text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#172333] sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Make every message count.
                </h2>
                <p className="mt-6 max-w-md text-base leading-7 text-[#586273]">
                  Tell us what you are trying to reach, collect, or build. We will help you find the simplest way to make it work.
                </p>
                <div className="mt-10 space-y-4 border-t border-[#172333]/10 pt-6">
                  <a href="tel:+254736427842" className="flex items-center gap-3 text-sm font-semibold text-[#172333] transition-colors hover:text-[#176fe8]"><Phone className="h-4 w-4 text-[#176fe8]" />+254 736 427 842</a>
                  <a href="mailto:info@mobiwave.co.ke" className="flex items-center gap-3 text-sm font-semibold text-[#172333] transition-colors hover:text-[#176fe8]"><Mail className="h-4 w-4 text-[#6255b7]" />info@mobiwave.co.ke</a>
                </div>
              </div>
            </div>
            <div className="border-t border-[#172333]/10 bg-[#f7f7fc] p-2 lg:border-l lg:border-t-0 sm:p-5">
              <div className="rounded-[22px] border border-[#172333]/10 bg-white p-4 sm:p-6">
                <Contact embedded />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
