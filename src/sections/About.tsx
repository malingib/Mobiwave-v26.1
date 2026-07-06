import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, EASE_OUT_EXPO } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';
import { SectionHeader } from '@/components/SectionHeader';
import { PremiumReveal } from '@/components/PremiumReveal';

const stats = [
  { value: 6, suffix: '+', label: 'Years of Experience' },
  { value: 12, suffix: '+', label: 'Our best total services' },
  { value: 500, suffix: '+', label: 'Trusted Clients' },
];

const aboutImages = [
  { src: '/about/about-1.jpg', alt: 'Team member using mobile technology' },
  { src: '/about/about-2.jpg', alt: 'Family enjoying connected services' },
  { src: '/about/about-3.jpg', alt: 'Professional working on laptop' },
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
    <span className="text-3xl sm:text-4xl font-extrabold text-white whitespace-nowrap" style={{ fontFamily: 'Outfit, sans-serif' }}>
      {display}{suffix}
    </span>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <section className="relative py-20 lg:py-28 bg-white overflow-hidden mw-mesh-light" aria-labelledby="about-heading">
      {/* Faint background watermark */}
      <img
        src="/about/about-2.jpg"
        alt=""
        aria-hidden
        className="absolute bottom-0 right-0 w-[min(420px,45vw)] h-auto object-cover opacity-[0.07] pointer-events-none select-none"
      />
      <div
        className="absolute -bottom-16 -right-10 w-[520px] h-[220px] opacity-[0.08] blur-[0.5px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 30% 40%, rgba(124,58,237,1) 0%, transparent 55%)' }}
        aria-hidden
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left — Oval image collage */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="relative"
          >
            <div className="flex items-center gap-3 sm:gap-4 max-w-[400px] mx-auto lg:mx-0">
              <div className="flex flex-col gap-3 sm:gap-4 pt-6 sm:pt-10">
                <MotionItem>
                  <div className="w-[132px] sm:w-[158px] h-[188px] sm:h-[228px] rounded-[100px] overflow-hidden shadow-md">
                    <img
                      src={aboutImages[0].src}
                      alt={aboutImages[0].alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </MotionItem>
                <MotionItem>
                  <div className="w-[132px] sm:w-[158px] h-[188px] sm:h-[228px] rounded-[100px] overflow-hidden shadow-md">
                    <img
                      src={aboutImages[1].src}
                      alt={aboutImages[1].alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </MotionItem>
              </div>

              <MotionItem>
                <div className="w-[148px] sm:w-[178px] h-[268px] sm:h-[328px] rounded-[100px] overflow-hidden shadow-lg flex-shrink-0">
                  <img
                    src={aboutImages[2].src}
                    alt={aboutImages[2].alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </MotionItem>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="relative"
          >
            <PremiumReveal direction="right">
              <SectionHeader
                label="About Our Company"
                title="Built in Nairobi. Used Across East Africa."
                description="MobiWave started because bulk SMS in Kenya had too many middlemen, unreliable delivery, and no transparency. We route messages smartly across all three Kenyan networks, reconcile M-Pesa payments properly, and answer the phone when something breaks."
              />
            </PremiumReveal>

            <MotionItem>
              <p className="text-base text-[#5b6b78] leading-relaxed mb-8 max-w-xl -mt-6">
                Our clients are SACCOs, hospitals, logistics firms, government agencies, churches, and schools.
              </p>
            </MotionItem>

            {/* Purple stats bar */}
            <div ref={statsRef} className="mb-8">
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                className="grid grid-cols-1 sm:grid-cols-3 rounded-2xl overflow-hidden bg-[#7c3aed]"
              >
                {stats.map((s, i) => (
                  <li
                    key={s.label}
                    className={`flex items-center gap-3 px-5 py-5 sm:py-6 ${
                      i > 0 ? 'sm:border-l border-white/25' : ''
                    } ${i > 0 ? 'border-t sm:border-t-0 border-white/25' : ''}`}
                  >
                    <AnimatedCounter value={s.value} suffix={s.suffix} inView={statsInView} />
                    <p className="text-sm text-white/95 leading-snug font-medium">{s.label}</p>
                  </li>
                ))}
              </motion.ul>
            </div>

            <MotionItem>
              <Link to="/about" className="mw-btn-teal" id="about-heading">
                Discover More
              </Link>
            </MotionItem>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
