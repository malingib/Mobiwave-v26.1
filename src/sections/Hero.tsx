import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { heroButton, heroLine, staggerContainer } from '@/lib/motion';
import { HeroWaves } from '@/components/Decorations';

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-[#f7f5ff] text-[#172333]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(202,190,244,0.42),transparent_30%),radial-gradient(circle_at_92%_8%,rgba(124,193,245,0.18),transparent_26%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-32 left-0 h-40 w-40 opacity-25 [background-image:radial-gradient(#8c7ed1_1.2px,transparent_1.2px)] [background-size:15px_15px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-36 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pb-40 lg:pt-36">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-12"
        >
          <div className="max-w-xl">

            <motion.h1 variants={heroLine} className="mt-7 max-w-[13ch] text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-[#172333] sm:text-6xl lg:text-[clamp(3.6rem,4.6vw,5rem)]">
              Reach every customer with MobiWave.
            </motion.h1>

            <motion.p variants={heroLine} className="mt-7 max-w-xl text-base leading-7 text-[#586273] sm:text-lg sm:leading-8">
              SMS, M-Pesa, USSD and WhatsApp in one calm console, built for Kenyan teams that need every message and every shilling accounted for.
            </motion.p>

            <motion.div variants={heroButton} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#5955d1] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(89,85,209,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4a46c4]">
                Get started <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/services/bulk-sms" className="inline-flex items-center justify-center gap-2 rounded-md border border-[#5955d1]/20 bg-white/60 px-7 py-3.5 text-sm font-semibold text-[#4b4e64] transition-all duration-300 hover:border-[#5955d1]/40 hover:bg-white hover:text-[#3e347f]">
                Explore bulk SMS
              </a>
            </motion.div>

            <motion.div variants={heroLine} className="mt-11 grid max-w-md grid-cols-2 gap-6 border-t border-[#172333]/10 pt-7 sm:gap-10">
              <div>
                <span className="block text-3xl font-bold tracking-[-0.045em] text-[#172333] sm:text-4xl">99.9%</span>
                <span className="mt-1 block max-w-[10rem] text-xs leading-5 text-[#586273]">reliable delivery across Kenyan networks</span>
              </div>
              <div>
                <span className="block text-3xl font-bold tracking-[-0.045em] text-[#172333] sm:text-4xl">10M+</span>
                <span className="mt-1 block max-w-[10rem] text-xs leading-5 text-[#586273]">messages sent through MobiWave</span>
              </div>
            </motion.div>
          </div>

          <motion.div variants={heroButton} className="relative flex items-center justify-center lg:justify-end">
            <div aria-hidden="true" className="absolute -inset-6 rounded-[34px] bg-[radial-gradient(circle_at_60%_40%,rgba(89,85,209,0.16),transparent_65%)] blur-2xl" />
            <img
              src="/martex-hero-nobg.webp"
              alt="MobiWave customer engagement illustration"
              className="relative z-10 w-full max-w-[560px] drop-shadow-[0_28px_50px_rgba(27,36,52,0.1)]"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* The MobiWave wave transition is intentionally retained as the only incumbent hero element. */}
      <HeroWaves />
    </section>
  );
}
