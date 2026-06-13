import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from '@/hooks/useInView';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    paragraphs: [
      'We begin with a deep-dive consultation to understand your business goals, target audience, and communication challenges.',
      'Our experts craft a tailored strategy that maps the optimal mix of channels — SMS, WhatsApp, USSD, or email — to your specific needs.',
    ],
    visual: {
      emoji: '🔍',
      label: 'Consultation',
      detail: 'Understanding your goals & audience',
    },
  },
  {
    num: '02',
    title: 'Seamless Integration',
    paragraphs: [
      'Our developer-friendly APIs make integration with your existing systems fast and straightforward — most teams go live within days.',
      'We provide comprehensive documentation, sandbox environments, and dedicated technical support throughout the process.',
    ],
    visual: {
      emoji: '⚡',
      label: 'Integration',
      detail: 'Connect in days, not weeks',
    },
  },
  {
    num: '03',
    title: 'Launch & Optimize',
    paragraphs: [
      'Once live, our real-time analytics dashboard gives you full visibility into delivery rates, engagement, and campaign performance.',
      'Your dedicated account manager continuously monitors results and recommends optimizations to maximize ROI.',
    ],
    visual: {
      emoji: '🚀',
      label: 'Growth',
      detail: 'Real-time analytics & optimization',
    },
  },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const [inViewRef, isInView] = useInView<HTMLElement>({ threshold: 0.05 });

  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 80%' } }
      );

      if (stepsRef.current) {
        const stepItems = stepsRef.current.querySelectorAll('.step-item');
        gsap.fromTo(stepItems,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.18, ease: 'power3.out', scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' } }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (inViewRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="section-padding overflow-hidden"
      style={{ background: '#f4f7fb' }}
    >
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="section-label">How It Works</span>
          <h2 className="section-heading">
            Unlocking Growth with Our{' '}
            <span className="gradient-text">Data-Driven Approach</span>
          </h2>
          <p className="section-subtext max-w-2xl mx-auto">
            A proven three-step process that gets your messaging campaigns up and running
            fast — with measurable results from day one.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="grid lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="step-item bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Visual */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl opacity-10"
                    style={{
                      background: 'radial-gradient(circle at 30% 50%, rgba(0,132,255,0.4) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(29,140,137,0.3) 0%, transparent 50%)',
                    }}
                  />
                  <div className="relative flex flex-col items-center justify-center w-full max-w-[240px] h-44 rounded-2xl border border-blue-100"
                    style={{ background: 'linear-gradient(135deg, #f0f5ff 0%, #ffffff 100%)' }}>
                    <span className="text-5xl mb-3">{step.visual.emoji}</span>
                    <div className="font-bold text-gray-900 text-lg mb-1">{step.visual.label}</div>
                    <div className="text-gray-500 text-sm text-center px-4">{step.visual.detail}</div>
                    <div
                      className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                      style={{ background: '#0084ff' }}
                    >
                      {step.num}
                    </div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div>
                <div className="step-number mb-2">{step.num}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {step.title}
                </h3>
                {step.paragraphs.map((p, pi) => (
                  <p key={pi} className="text-gray-500 text-base leading-relaxed mb-3 last:mb-0">{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
