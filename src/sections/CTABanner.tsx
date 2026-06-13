import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Contact } from '@/sections/Contact';

gsap.registerPlugin(ScrollTrigger);

export function CTABanner() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [inViewElementRef, isInView] = useInView<HTMLElement>({ threshold: 0.15 });

  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: contentRef.current, start: 'top 85%' } }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        inViewElementRef.current = el;
      }}
      className="py-20 bg-white"
    >
      <div className="container-custom">
        <Card
          ref={contentRef}
          className="relative overflow-hidden rounded-3xl border-0 p-0 gap-0"
          style={{ background: '#0a1a25' }}
        >
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #0084ff, transparent)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #0055ae, transparent)', transform: 'translate(-30%, 30%)' }} />

          <CardHeader className="relative z-10 p-10 md:p-12 pb-6 md:pb-8">
            {/* Top content */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-4">
              <div className="max-w-xl">
                <Badge variant="outline" className="section-label-white mb-4 border-white/20 text-white/90">
                  Ready to Transform?
                </Badge>
                <CardTitle className="section-heading-white mb-4">
                  Ready to Transform Your{' '}
                  <span style={{ color: '#0084ff' }}>Business Communication?</span>
                </CardTitle>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-500 text-base">
                  <a href="#contact">
                    Get Started Free
                    <ArrowRight data-icon="inline-end" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                  <a href="tel:+254736427842">Call Us Now</a>
                </Button>
              </div>
            </div>
          </CardHeader>
          <div className="relative z-10 bg-[#0a1a25]">
            <Contact embedded />
          </div>
        </Card>
      </div>
    </section>
  );
}
