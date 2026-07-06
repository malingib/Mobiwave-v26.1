import { Hero } from '@/sections/Hero';
import { Clients } from '@/sections/Clients';
import { About } from '@/sections/About';
import { Services } from '@/sections/Services';
import { Pricing } from '@/sections/Pricing';
import { WhyChooseUs } from '@/sections/WhyChooseUs';
import { Testimonials } from '@/sections/Testimonials';
import { FAQ } from '@/sections/FAQ';
import { CTABanner } from '@/sections/CTABanner';

export function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <About />
      <Services />
      <Pricing />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
