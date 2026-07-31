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
  const featured = stories[0];

  return (
    <section id="testimonials" className="overflow-hidden bg-white py-20 lg:py-28" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}>
          <MotionItem className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0084ff]">
                <span className="h-px w-8 bg-[#0084ff]" />
                Customer stories
              </div>
              <h2 id="testimonials-heading" className="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0a1a25] sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                The difference is visible in the work.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#5b6b78] sm:text-base">Real feedback from organisations using MobiWave every day.</p>
          </MotionItem>

          <MotionItem>
            <article className="grid overflow-hidden rounded-[28px] bg-[#0a1a25] lg:grid-cols-[1.35fr_0.65fr]">
              <div className="relative p-7 sm:p-10 lg:p-14">
                <Quote className="absolute right-8 top-8 h-14 w-14 text-[#36b8ff]/20" aria-hidden />
                <blockquote className="relative max-w-2xl text-2xl font-semibold leading-9 text-white sm:text-3xl sm:leading-[1.3]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
                <div className="mt-10 flex items-center justify-between gap-6 border-t border-white/15 pt-6">
                  <div>
                    <p className="text-sm font-bold text-white">{featured.name}</p>
                    <p className="mt-1 text-sm text-white/50">{featured.role}</p>
                  </div>
                  <a href="#contact" className="group inline-flex items-center gap-2 text-sm font-bold text-[#36b8ff]">Start a conversation <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
                </div>
              </div>
              <div className="flex flex-col justify-end bg-[#1d8c89] p-7 sm:p-10">
                <p className="text-5xl font-extrabold text-white sm:text-6xl" style={{ fontFamily: 'Outfit, sans-serif' }}>{featured.result}</p>
                <p className="mt-2 max-w-[180px] text-sm leading-6 text-white/75">{featured.resultLabel}</p>
              </div>
            </article>
          </MotionItem>

          <div className="mt-8 grid border-y border-[#0a1a25]/10 sm:grid-cols-2 lg:grid-cols-3">
            {stories.slice(1).map((story, index) => (
              <MotionItem key={story.name}>
                <article className={`py-6 sm:px-7 sm:py-8 ${index > 0 ? 'border-t border-[#0a1a25]/10 sm:border-l sm:border-t-0' : ''}`}>
                  <p className="text-sm leading-6 text-[#0a1a25]/75">&ldquo;{story.quote}&rdquo;</p>
                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div><p className="text-sm font-bold text-[#0a1a25]">{story.name}</p><p className="mt-1 text-xs text-[#5b6b78]">{story.role}</p></div>
                    <div className="text-right"><p className="text-lg font-extrabold text-[#0084ff]" style={{ fontFamily: 'Outfit, sans-serif' }}>{story.result}</p><p className="text-[10px] text-[#5b6b78]">{story.resultLabel}</p></div>
                  </div>
                </article>
              </MotionItem>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
