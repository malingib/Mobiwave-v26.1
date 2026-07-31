import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { staggerContainer } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';

const steps = [
  {
    num: '01',
    title: 'Tell us what needs to move',
    text: 'We ask about your volumes, networks, integration points, and the outcome you need.',
  },
  {
    num: '02',
    title: 'We make it work',
    text: 'APIs, documentation, sandbox access, and testing are handled with your team from day one.',
  },
  {
    num: '03',
    title: 'You go live with backup',
    text: 'Monitor delivery in real time, then reach a real support person when something needs attention.',
  },
];

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="relative overflow-hidden bg-[#0a1a25] py-20 text-white lg:py-28" aria-labelledby="how-it-works-heading">
      <div className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-[#0084ff]/10 blur-3xl" aria-hidden />
      <div className="container-custom relative z-10">
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}>
          <MotionItem className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div>
              <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#36b8ff]">
                <span className="h-px w-8 bg-[#1d8c89]" />
                How it works
              </div>
              <h2 id="how-it-works-heading" className="max-w-md text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Simple to start. Solid when it matters.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-white/55 sm:text-lg">
                You should not need a sales deck to get a communication service working. We keep the path from conversation to launch short.
              </p>
              <div className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-white/80">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1d8c89]"><Check className="h-4 w-4" /></span>
                Human support included
              </div>
            </div>

            <div className="border-t border-white/15">
              {steps.map((step) => (
                <MotionItem key={step.num}>
                  <div className="group grid gap-4 border-b border-white/15 py-7 sm:grid-cols-[64px_1fr_24px] sm:items-start sm:gap-6 sm:py-8">
                    <span className="font-mono text-sm text-[#36b8ff]">{step.num}</span>
                    <div>
                      <h3 className="text-xl font-bold sm:text-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>{step.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-white/50 sm:text-base">{step.text}</p>
                    </div>
                    <ArrowRight className="mt-1 hidden h-5 w-5 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-[#36b8ff] sm:block" />
                  </div>
                </MotionItem>
              ))}
            </div>
          </MotionItem>
        </motion.div>
      </div>
    </section>
  );
}
