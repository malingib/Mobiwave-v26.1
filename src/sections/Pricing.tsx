import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';

const projects = [
  { name: 'Tewaw', href: 'https://tewaw.mobiwave.co.ke', desc: 'Trading platform' },
  { name: 'Malanga Welfare', href: 'https://malangawelfare.org', desc: 'SACCO management' },
  { name: 'RewardHub', href: 'https://mobiwavesrs.co.ke', desc: 'Loyalty programme' },
  { name: 'MobiPoll', href: 'https://mobipoll.co.ke', desc: 'Voting system' },
  { name: 'JuaAfya', href: 'https://juaafya.co.ke', desc: 'Health platform' },
  { name: 'Kilifi County', href: 'https://kilifi.go.ke', desc: 'County government portal' },
  { name: 'MobiWaveAI', href: 'https://mobiwaveai.co.ke', desc: 'AI customer support' },
];

const tracks = [
  { title: 'Build', items: ['Web apps', 'Mobile apps', 'API integration'] },
  { title: 'Improve', items: ['System optimisation', 'Modernisation', 'Performance tuning'] },
  { title: 'Assure', items: ['Security audits', 'Technical advisory', 'Architecture review'] },
];

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <motion.div
          className="max-w-2xl mb-14"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <MotionItem>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">Projects</span>
          </MotionItem>
          <MotionItem>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0a1a25] mt-2 mb-3"
              style={{ fontFamily: 'Outfit, sans-serif' }}>
              Real projects, real clients
            </h2>
          </MotionItem>
          <MotionItem>
            <p className="text-sm text-gray-500 leading-relaxed">
              Beyond messaging, we build and maintain platforms for Kenyan organisations.
            </p>
          </MotionItem>
        </motion.div>

        <div ref={ref}>
          {/* Project list — simple links, no cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-14">
            {projects.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-200 transition-colors group">
                <div>
                  <div className="text-sm font-semibold text-[#0a1a25]">{p.name}</div>
                  <div className="text-xs text-gray-400">{p.desc}</div>
                </div>
                <span className="text-gray-300 group-hover:text-blue-500 transition-colors text-sm">→</span>
              </a>
            ))}
          </div>

          {/* Services section — flat, no card backgrounds */}
          <div className="border-t border-gray-200 pt-10">
            <h3 className="text-sm font-semibold text-[#0a1a25] mb-6">Also building</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {tracks.map((t) => (
                <div key={t.title}>
                  <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">{t.title}</h4>
                  <ul className="space-y-1.5">
                    {t.items.map((item) => (
                      <li key={item} className="text-sm text-gray-500">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <a href="#contact" className="inline-flex items-center gap-1.5 mt-8 text-sm font-semibold text-blue-600 hover:underline">
              Need something built? Talk to our team →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
