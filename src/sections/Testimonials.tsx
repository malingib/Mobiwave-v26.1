import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Quote } from 'lucide-react';
import { staggerContainer } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';

const stories = [
  {
    name: 'Pheddis Mbodze',
    role: 'Team Lead, TUAN',
    quote: 'The SMS platform helped us reach over 100,000 customers. We could see exactly who received the message and who did not.',
    result: '100,000+',
    resultLabel: 'customers reached',
  },
  {
    name: 'Herbert Kahindi',
    role: 'Administrator, Malanga Welfare',
    quote: 'Payment reconciliation used to take a full day. Now it is automatic.',
    result: '2 days',
    resultLabel: 'to launch the integration',
  },
  {
    name: 'Ibrahim Shehi',
    role: 'Operations Director, BID Logistics',
    quote: 'Better delivery rates, lower costs, and USSD that works for our rural customers.',
    result: '3 networks',
    resultLabel: 'covered by one service',
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="testimonials" className="overflow-hidden bg-white py-20 lg:py-28" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}>
          <MotionItem className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6255b7]">
              <span className="h-px w-8 bg-[#7566cf]" />
              Customer stories
              <span className="h-px w-8 bg-[#7566cf]" />
            </div>
            <h2 id="testimonials-heading" className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#172333] sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Trusted when the message matters.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#586273] sm:text-lg">Real feedback from organisations using MobiWave every day.</p>
          </MotionItem>

          <div className="grid gap-5 lg:grid-cols-3 lg:gap-7">
            {stories.map((story) => (
              <MotionItem key={story.name}>
                <article className="flex h-full flex-col rounded-[22px] border border-[#172333]/10 bg-[#f7f7fc] p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8">
                  <Quote className="h-8 w-8 text-[#7566cf]" aria-hidden />
                  <blockquote className="mt-6 flex-1 text-lg font-semibold leading-8 text-[#172333]" style={{ fontFamily: 'Outfit, sans-serif' }}>&ldquo;{story.quote}&rdquo;</blockquote>
                  <div className="mt-8 flex items-end justify-between gap-4 border-t border-[#172333]/10 pt-5">
                    <div><p className="text-sm font-bold text-[#172333]">{story.name}</p><p className="mt-1 text-xs text-[#586273]">{story.role}</p></div>
                    <div className="text-right"><p className="text-lg font-extrabold text-[#176fe8]" style={{ fontFamily: 'Outfit, sans-serif' }}>{story.result}</p><p className="text-[10px] text-[#586273]">{story.resultLabel}</p></div>
                  </div>
                </article>
              </MotionItem>
            ))}
          </div>

          <MotionItem className="mt-10 text-center">
            <a href="#contact" className="group inline-flex items-center gap-2 border-b border-[#172333]/25 pb-2 text-sm font-bold text-[#172333] transition-colors hover:border-[#176fe8] hover:text-[#176fe8]">Start a conversation <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
          </MotionItem>
        </motion.div>
      </div>
    </section>
  );
}
