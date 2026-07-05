import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { staggerContainer, heroLine, heroButton } from '@/lib/motion';
import { GlobeBackground } from '@/components/GlobeBackground';
import { GravityParticles } from '@/components/GravityParticles';
import { HeroWaves, ParallaxDecoration, FloatingPlus, FloatingCircle } from '@/components/Decorations';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1a25]">
      <GravityParticles />
      <GlobeBackground />

      {/* Parallax floating decorations — Luxas-style */}
      <ParallaxDecoration speed={0.4} className="top-[15%] left-[8%] text-blue-500/15">
        <FloatingPlus className="w-16 h-16" />
      </ParallaxDecoration>
      <ParallaxDecoration speed={-0.3} className="top-[25%] right-[12%]">
        <FloatingCircle className="border-2 border-cyan-400/15" size={100} />
      </ParallaxDecoration>
      <ParallaxDecoration speed={0.2} className="bottom-[30%] left-[15%]">
        <FloatingCircle className="border-2 border-blue-400/10" size={60} />
      </ParallaxDecoration>
      <ParallaxDecoration speed={-0.25} className="top-[40%] right-[5%] text-blue-500/10">
        <FloatingPlus className="w-10 h-10" />
      </ParallaxDecoration>

      <div className="relative z-10 container-custom text-center px-4 pt-32 pb-40">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>
            <motion.span variants={heroLine} className="block">Bulk SMS that</motion.span>
            <motion.span variants={heroLine} className="block" style={{ color: '#0084ff' }}>actually delivers.</motion.span>
          </h1>

          {/* Sub */}
          <motion.p variants={heroLine} className="text-base sm:text-lg text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
            MobiWave is a Nairobi-based communication platform built for Kenyan organisations.
            Bulk SMS, M-Pesa integration, USSD menus — all routed smartly across Safaricom, Airtel, and Telkom.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={heroButton} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <a href="#contact" className="mw-btn mw-btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all">
              Talk to us <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#services" className="mw-btn mw-btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white/80 transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
              What we do
            </a>
          </motion.div>

          {/* Stats */}
          <div className="flex justify-center gap-10 sm:gap-16">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">99.9%</div>
              <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Delivery rate</div>
              <div className="text-[10px] text-white/30 mt-0.5">across Kenyan networks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">10M+</div>
              <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Messages sent</div>
              <div className="text-[10px] text-white/30 mt-0.5">since 2019</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">500+</div>
              <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Projects</div>
              <div className="text-[10px] text-white/30 mt-0.5">across East Africa</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated wave dividers — Luxas-style */}
      <HeroWaves />
    </section>
  );
}
