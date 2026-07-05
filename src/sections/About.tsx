import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, EASE_OUT_EXPO } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';

const stats = [
  { value: 500, suffix: '+', label: 'Years of', sublabel: 'Experience', context: 'across Kenya since 2019' },
  { value: 99.9, suffix: '%', label: 'Our best', sublabel: 'total services', context: 'on Safaricom, Airtel & Telkom' },
  { value: 10, suffix: 'M+', label: 'Award', sublabel: 'Winning', context: 'for Kenyan organisations' },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = Date.now();
    const isDecimal = value % 1 !== 0;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(isDecimal ? current.toFixed(1) : Math.round(current).toString());
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span className="text-4xl sm:text-5xl font-extrabold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
      {display}<span className="text-2xl font-bold text-white/80">{suffix}</span>
    </span>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)' }}>
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Staggered Circular Images */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="relative"
          >
            <div className="relative w-full max-w-lg mx-auto lg:mx-0">
              {/* Top row: two circles */}
              <div className="flex gap-5 mb-5">
                <MotionItem>
                  <div className="w-40 h-52 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #0084ff 0%, #6c5ce7 100%)' }}>
                  </div>
                </MotionItem>
                <MotionItem>
                  <div className="w-44 h-56 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0 mt-6"
                    style={{ background: 'linear-gradient(135deg, #1d8c89 0%, #00b894 100%)' }}>
                  </div>
                </MotionItem>
              </div>
              {/* Bottom circle — offset right */}
              <MotionItem>
                <div className="absolute -bottom-8 left-12 w-52 h-64 rounded-full overflow-hidden border-4 border-white shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #6c5ce7 0%, #fd79a8 100%)' }}
                ></div>
              </MotionItem>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <MotionItem>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #1d8c89, #0084ff)' }} />
                <span className="text-xs font-semibold text-[#0084ff] uppercase tracking-[0.2em]">
                  About Our Company
                </span>
              </div>
            </MotionItem>
            <MotionItem>
              <h2
                className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.15] mb-5"
                style={{ fontFamily: 'Outfit, sans-serif', color: '#0a1a25' }}
              >
                Built in Nairobi. Used Across East Africa.
              </h2>
            </MotionItem>
            <MotionItem>
              <p className="text-base text-gray-500 leading-relaxed mb-8">
                MobiWave started because bulk SMS in Kenya had too many middlemen,
                unreliable delivery, and no transparency. We route messages smartly
                across all three Kenyan networks, reconcile M-Pesa payments properly,
                and answer the phone when something breaks. Our clients are SACCOs,
                hospitals, logistics firms, government agencies, churches, and schools.
              </p>
            </MotionItem>

            {/* Stats Bar */}
            <div ref={statsRef}>
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                className="flex flex-wrap rounded-xl overflow-hidden mb-8"
                style={{ background: 'linear-gradient(135deg, #0084ff, #6c5ce7)' }}
              >
                {stats.map((s, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-3 px-6 py-5 ${
                      i < stats.length - 1 ? 'border-r border-white/20' : ''
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <AnimatedCounter value={s.value} suffix={s.suffix} inView={statsInView} />
                    </div>
                    <div>
                      <p className="text-sm text-white/90 leading-tight font-medium">
                        {s.label}<br />{s.sublabel}
                      </p>
                    </div>
                  </li>
                ))}
              </motion.ul>
            </div>

            <MotionItem>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#1d8c89]/25 hover:-translate-y-0.5"
                style={{ background: '#1d8c89', color: '#fff' }}
              >
                Discover More
              </a>
            </MotionItem>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
