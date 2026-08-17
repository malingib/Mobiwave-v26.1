import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { heroButton, heroLine, staggerContainer } from '@/lib/motion';
import { HeroWaves } from '@/components/Decorations';

export function Hero() {
  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden bg-[#f6f4ff] text-[#172333]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_44%,rgba(202,190,244,0.38),transparent_28%),radial-gradient(circle_at_88%_22%,rgba(124,193,245,0.16),transparent_25%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-28 left-0 h-40 w-40 opacity-30 [background-image:radial-gradient(#8c7ed1_1.2px,transparent_1.2px)] [background-size:15px_15px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-40 pt-16 sm:px-8 sm:pt-16 lg:px-10 lg:pb-44 lg:pt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-12"
        >
          <motion.div variants={heroButton} className="relative flex min-h-[31rem] items-center justify-center sm:min-h-[38rem] lg:min-h-[43rem]">
            <img
              src="/martex-hero.png"
              alt="MobiWave communication campaign illustration"
              width={615}
              height={715}
              fetchPriority="high"
              className="relative z-10 h-auto w-full max-w-[33rem] object-contain drop-shadow-[0_24px_30px_rgba(94,77,148,0.08)]"
              loading="eager"
              decoding="async"
            />
          </motion.div>

          <div className="max-w-xl lg:pl-2">
            <motion.h1 variants={heroLine} className="max-w-[10ch] text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-[#172333] sm:text-6xl lg:text-[clamp(4rem,5.15vw,5.5rem)]">
              Reach every customer with MobiWave.
            </motion.h1>

            <motion.p variants={heroLine} className="mt-7 max-w-xl text-base leading-7 text-[#586273] sm:text-lg sm:leading-8">
              Build stronger conversations with reliable SMS, M-Pesa, USSD, and WhatsApp tools made for Kenyan organisations.
            </motion.p>

            <motion.div variants={heroButton} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#contact" className="mw-btn-primary-solid inline-flex items-center justify-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5">
                Get started <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-md border border-[#7a70a8]/25 bg-white/50 px-7 py-3.5 text-sm font-semibold text-[#4b4e64] transition-all duration-300 hover:border-[#6651c9]/40 hover:bg-white hover:text-[#3e347f]">
                See how it works
              </a>
            </motion.div>

            <motion.div variants={heroLine} className="mt-12 grid max-w-md grid-cols-2 gap-6 sm:gap-10">
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
        </motion.div>
      </div>

      {/* The MobiWave wave transition is intentionally retained as the only incumbent hero element. */}
      <HeroWaves />
    </section>
  );
}
