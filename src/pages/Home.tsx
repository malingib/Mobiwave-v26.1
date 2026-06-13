import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '@/sections/Hero';
import { Clients } from '@/sections/Clients';
import { About } from '@/sections/About';
import { Services } from '@/sections/Services';
import { WhyChooseUs } from '@/sections/WhyChooseUs';
import { Testimonials } from '@/sections/Testimonials';
import { Pricing } from '@/sections/Pricing';
import { CTABanner } from '@/sections/CTABanner';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      {/* 1. Dark navy hero */}
      <Hero />
      {/* 2. White – partner logo cloud */}
      <Clients />
      {/* 3. Light gray – about / animated stats */}
      <About />
      {/* 4. White – services grid (image cards) */}
      <Services />
      {/* 5. White – innovations hub */}
      <Pricing />
      {/* 6. Light gray – how it works (numbered steps) */}
      <WhyChooseUs />
      {/* 7. Dark navy – testimonials */}
      <Testimonials />
      {/* 8. White – CTA banner with stats */}
      <CTABanner />
    </>
  );
}
