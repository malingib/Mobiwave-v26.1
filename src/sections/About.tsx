import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BarChart3, Network, ShieldCheck } from 'lucide-react';
import { staggerContainer } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';

const features = [
  {
    icon: Network,
    title: 'Reach every network',
    text: 'Smart routing across Safaricom, Airtel, and Telkom keeps your messages moving.',
    tone: 'bg-[#e8e4ff] text-[#6255b7]',
  },
  {
    icon: ShieldCheck,
    title: 'Built for Kenya',
    text: 'Tools shaped around the way local organisations collect, communicate, and grow.',
    tone: 'bg-[#e1f1ff] text-[#176fe8]',
  },
  {
    icon: BarChart3,
    title: 'See what is working',
    text: 'Delivery reports and practical support give your team confidence after launch.',
    tone: 'bg-[#e5f7f2] text-[#168a75]',
  },
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
    <section className="relative overflow-hidden bg-white py-20 lg:py-28" aria-labelledby="about-heading">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mx-auto max-w-6xl"
        >
          <MotionItem className="text-center">
            <div className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6255b7]">
              <span className="h-px w-8 bg-[#7566cf]" />
              Why MobiWave
              <span className="h-px w-8 bg-[#7566cf]" />
            </div>
            <h2 id="about-heading" className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#172333] sm:text-5xl lg:text-6xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Communication infrastructure that fits the way you work.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#586273] sm:text-lg">
              MobiWave combines local context, reliable delivery, and clear reporting so organisations can reach people and move money with confidence.
            </p>
          </MotionItem>

          <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-7">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <MotionItem key={feature.title} className="group rounded-[24px] bg-[#f7f7fc] p-3 text-center transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex h-40 items-center justify-center rounded-[18px] bg-[#f0efff]">
                    <span className={`flex h-20 w-20 items-center justify-center rounded-full ${feature.tone}`}>
                      <Icon className="h-9 w-9" strokeWidth={1.7} />
                    </span>
                  </div>
                  <div className="px-5 pb-6 pt-7">
                    <h3 className="text-xl font-bold text-[#172333]" style={{ fontFamily: 'Outfit, sans-serif' }}>{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#586273]">{feature.text}</p>
                  </div>
                </MotionItem>
              );
            })}
          </div>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-6xl border-y border-[#172333]/10 sm:mt-20 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`px-1 py-5 text-center sm:px-7 sm:py-7 ${index > 0 ? 'border-t border-[#172333]/10 sm:border-l sm:border-t-0' : ''}`}>
              <strong className="block text-3xl font-extrabold text-[#172333] sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.value}</strong>
              <span className="mt-1 block text-sm text-[#586273]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
