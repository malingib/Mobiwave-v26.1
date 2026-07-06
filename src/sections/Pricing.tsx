import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { staggerContainer } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';
import { SectionHeader } from '@/components/SectionHeader';
import { PremiumReveal } from '@/components/PremiumReveal';

const projects = [
  { name: 'Tewaw', href: 'https://tewaw.mobiwave.co.ke', desc: 'Trading platform', tag: 'Fintech' },
  { name: 'Malanga Welfare', href: 'https://malangawelfare.org', desc: 'SACCO management', tag: 'SACCO' },
  { name: 'RewardHub', href: 'https://mobiwavesrs.co.ke', desc: 'Loyalty programme', tag: 'Rewards' },
  { name: 'MobiPoll', href: 'https://mobipoll.co.ke', desc: 'Voting system', tag: 'Civic' },
  { name: 'JuaAfya', href: 'https://juaafya.co.ke', desc: 'Health platform', tag: 'Health' },
  { name: 'Kilifi County', href: 'https://kilifi.go.ke', desc: 'County government portal', tag: 'Government' },
  { name: 'MobiWaveAI', href: 'https://mobiwaveai.co.ke', desc: 'AI customer support', tag: 'AI' },
];

const tracks = [
  { title: 'Build', items: ['Web apps', 'Mobile apps', 'API integration'] },
  { title: 'Improve', items: ['System optimisation', 'Modernisation', 'Performance tuning'] },
  { title: 'Assure', items: ['Security audits', 'Technical advisory', 'Architecture review'] },
];

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section className="relative py-20 lg:py-28 mw-section-surface overflow-hidden" aria-labelledby="projects-heading">
      <div className="container-custom">
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}>
          <SectionHeader
            label="Projects"
            title="Real projects, real clients"
            description="Beyond messaging, we build and maintain platforms for Kenyan organisations."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {projects.map((p, i) => (
              <MotionItem key={p.name}>
                <PremiumReveal delay={i * 0.05}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mw-gradient-border flex flex-col h-full p-5 sm:p-6 rounded-[22px] bg-white hover:shadow-[0_16px_40px_rgba(0,132,255,0.1)] transition-all duration-400"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0084ff]/10 text-[#0084ff]">
                        {p.tag}
                      </span>
                      <ExternalLink className="w-4 h-4 text-[#5b6b78]/25 group-hover:text-[#0084ff] transition-colors" />
                    </div>
                    <div id={i === 0 ? 'projects-heading' : undefined} className="text-base font-extrabold text-[#0a1a25] mb-1 group-hover:text-[#0084ff] transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {p.name}
                    </div>
                    <p className="text-sm text-[#5b6b78]">{p.desc}</p>
                  </a>
                </PremiumReveal>
              </MotionItem>
            ))}
          </div>

          <PremiumReveal>
            <div className="mw-card-glass rounded-[28px] p-8 md:p-10 lg:p-12 border border-[rgba(10,26,37,0.06)] bg-[#0a1a25]">
              <div className="flex items-center gap-2.5 mb-8">
                <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
                <span className="text-xs font-bold text-[#36b8ff] uppercase tracking-[0.18em]">Also building</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-8 mb-8">
                {tracks.map((t) => (
                  <div key={t.title}>
                    <h4 className="text-sm font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>{t.title}</h4>
                    <ul className="space-y-2.5">
                      {t.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-white/55">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1d8c89] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <a href="#contact" className="mw-btn-teal inline-flex">
                Need something built? Talk to our team <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </PremiumReveal>
        </motion.div>
      </div>
    </section>
  );
}
