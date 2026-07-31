import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { staggerContainer } from '@/lib/motion';
import { MotionItem } from '@/components/MotionSection';

const projects = [
  { name: 'Tewaw', href: 'https://tewaw.mobiwave.co.ke', desc: 'Trading platform', tag: 'Fintech' },
  { name: 'Malanga Welfare', href: 'https://malangawelfare.org', desc: 'SACCO management', tag: 'SACCO' },
  { name: 'RewardHub', href: 'https://mobiwavesrs.co.ke', desc: 'Loyalty programme', tag: 'Rewards' },
  { name: 'MobiPoll', href: 'https://mobipoll.co.ke', desc: 'Voting system', tag: 'Civic' },
  { name: 'JuaAfya', href: 'https://juaafya.co.ke', desc: 'Health platform', tag: 'Health' },
  { name: 'Kilifi County', href: 'https://kilifi.go.ke', desc: 'County government portal', tag: 'Government' },
];

const capabilities = ['Web and mobile applications', 'API and payment integrations', 'System optimisation and support'];

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section className="relative overflow-hidden bg-[#f4f7fb] py-20 lg:py-28" aria-labelledby="projects-heading">
      <div className="container-custom">
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}>
          <MotionItem className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-24">
            <div>
              <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0084ff]">
                <span className="h-px w-8 bg-[#0084ff]" />
                Beyond messaging
              </div>
              <h2 id="projects-heading" className="max-w-lg text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0a1a25] sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                We build the systems behind the work.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#5b6b78] sm:text-lg">
              When the right solution does not exist yet, our team builds it. These are some of the platforms and systems we have helped bring into the world.
            </p>
          </MotionItem>

          <div className="mt-14 grid gap-x-12 border-y border-[#0a1a25]/10 lg:grid-cols-2">
            {projects.map((project, index) => (
              <MotionItem key={project.name}>
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 border-b border-[#0a1a25]/10 py-6">
                  <span className="w-7 font-mono text-xs text-[#5b6b78]/60">{String(index + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-3">
                      <span className="text-lg font-bold text-[#0a1a25] transition-colors group-hover:text-[#0084ff]" style={{ fontFamily: 'Outfit, sans-serif' }}>{project.name}</span>
                      <span className="rounded-full bg-[#0084ff]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0084ff]">{project.tag}</span>
                    </span>
                    <span className="mt-1 block text-sm text-[#5b6b78]">{project.desc}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-[#5b6b78]/40 transition-colors group-hover:text-[#0084ff]" />
                </a>
              </MotionItem>
            ))}
          </div>

          <MotionItem className="mt-12 rounded-[26px] bg-[#0a1a25] p-7 text-white sm:p-9">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#36b8ff]">What we can build</p>
                <p className="max-w-xl text-xl font-bold leading-8" style={{ fontFamily: 'Outfit, sans-serif' }}>From the first technical conversation to the system your team relies on every day.</p>
              </div>
              <div className="flex flex-col gap-3 text-sm text-white/65 sm:min-w-[280px]">
                {capabilities.map((capability) => <span key={capability} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-[#1d8c89]" />{capability}</span>)}
              </div>
              <a href="#contact" className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-white transition-colors hover:text-[#36b8ff]">Talk to our team <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
            </div>
          </MotionItem>
        </motion.div>
      </div>
    </section>
  );
}
