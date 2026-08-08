import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { staggerContainer } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';

const facts = [
  'Smart routing across Safaricom, Airtel, and Telkom',
  'A real support team when something needs attention',
  'Tools made for Kenyan organisations, not adapted later',
];

const stats = [
  { value: '6+', label: 'years building locally' },
  { value: '500+', label: 'organisations reached' },
  { value: '12+', label: 'services under one roof' },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="relative overflow-hidden bg-[#f6f4ff] py-14 lg:py-24" aria-labelledby="about-heading">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
        >
          <MotionItem className="relative">
            <div className="relative overflow-hidden rounded-[28px] bg-[#0a1a25]">
              <img
                src="/about/about-3.jpg"
                alt="Professional working with connected technology"
                className="h-[340px] w-full object-cover opacity-85 grayscale-[15%] sm:h-[460px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a25]/85 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                <p className="max-w-xs text-lg font-semibold leading-7 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Technology should remove friction, not add another layer of it.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-4 hidden rounded-2xl bg-[#176fe8] px-5 py-4 text-white shadow-xl sm:block">
              <strong className="block text-2xl font-extrabold" style={{ fontFamily: 'Outfit, sans-serif' }}>6+</strong>
              <span className="text-xs text-white/75">years in the field</span>
            </div>
          </MotionItem>

          <MotionItem>
            <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0084ff]">
              <span className="h-px w-8 bg-[#0084ff]" />
              About MobiWave
            </div>
            <h2 id="about-heading" className="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0a1a25] sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Local context. Serious infrastructure.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#5b6b78] sm:text-lg">
              MobiWave started because communication in Kenya had too many middlemen, unreliable delivery, and not enough transparency. We build the tools that let organisations reach people and move money with confidence.
            </p>
            <ul className="mt-8 space-y-4">
              {facts.map((fact) => (
                <li key={fact} className="flex items-start gap-3 text-sm font-medium leading-6 text-[#0a1a25]">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0084ff]/10 text-[#0084ff]"><Check className="h-3 w-3" /></span>
                  {fact}
                </li>
              ))}
            </ul>
            <Link to="/about" className="group mt-9 inline-flex items-center gap-2 border-b border-[#0a1a25]/25 pb-2 text-sm font-bold text-[#0a1a25] transition-colors hover:border-[#0084ff] hover:text-[#0084ff]">
              More about our approach
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </MotionItem>
        </motion.div>

        <div className="mt-10 grid border-y border-[#0a1a25]/10 sm:mt-14 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`px-1 py-5 sm:px-7 sm:py-7 ${index > 0 ? 'border-t border-[#0a1a25]/10 sm:border-l sm:border-t-0' : ''}`}>
              <strong className="block text-3xl font-extrabold text-[#0a1a25] sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.value}</strong>
              <span className="mt-1 block text-sm text-[#5b6b78]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
