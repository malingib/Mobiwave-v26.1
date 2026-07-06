import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, EASE_OUT_EXPO } from '@/lib/motion';
import { SectionHeader } from '@/components/SectionHeader';
import { FloatingCircle, FloatingPlus } from '@/components/Decorations';

const steps = [
  {
    num: '01',
    title: 'Tell us what you need',
    text: 'A two-minute conversation is enough. We\'ll ask about volumes, networks, integration points, and budget.',
  },
  {
    num: '02',
    title: 'We set it up',
    text: 'Most clients are live within a day. APIs, docs, sandbox environment — we handle the setup and test everything first.',
  },
  {
    num: '03',
    title: 'You send. We monitor.',
    text: 'Real-time dashboard, delivery reports, and a support WhatsApp line. If something looks off, we call you before you notice.',
  },
];

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 0.8', 'end 0.4'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="mw-section-dark py-20 lg:py-28 overflow-hidden" aria-labelledby="how-it-works-heading">
      <div className="absolute top-0 right-0 w-[min(500px,80vw)] h-[min(500px,80vw)] mw-glow-blue rounded-full pointer-events-none glow-pulse" />
      <div className="absolute bottom-0 left-0 w-[min(400px,70vw)] h-[min(400px,70vw)] mw-glow-teal rounded-full pointer-events-none" />
      <FloatingPlus className="w-5 h-5 top-20 left-[10%] !text-white/10" />
      <FloatingCircle className="border border-white/10 top-[30%] right-[12%]" size={80} />

      <div className="container-custom relative z-10">
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}>
          <SectionHeader
            label="How it works"
            title="Three steps to go live"
            description="No onboarding calls. No sales deck. Just a working platform."
            variant="dark"
          />

          <div ref={timelineRef} className="relative">
            <div className="hidden lg:block absolute top-14 left-[16.66%] right-[16.66%] h-px bg-white/10 overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-[#0084ff] to-[#1d8c89] origin-left" style={{ scaleX: lineScale }} />
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
              {steps.map((step, i) => (
                <motion.article
                  key={step.num}
                  initial={{ opacity: 0, y: 48 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: i * 0.12, ease: EASE_OUT_EXPO }}
                  className="mw-card-glass p-7 sm:p-8 relative"
                >
                  <div
                    className="text-5xl sm:text-6xl font-extrabold mb-5 leading-none"
                    style={{ fontFamily: 'Outfit, sans-serif', color: 'transparent', WebkitTextStroke: '1.5px rgba(0, 132, 255, 0.4)' }}
                    aria-hidden
                  >
                    {step.num}
                  </div>
                  <h3 id={i === 0 ? 'how-it-works-heading' : undefined} className="text-lg sm:text-xl font-bold text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/55 leading-relaxed">{step.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
