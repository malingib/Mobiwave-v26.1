import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, MessageSquare, CreditCard, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '500+', label: 'Businesses' },
  { value: '1B+', label: 'Messages Sent' },
  { value: 'KES 0.25', label: 'Per SMS' },
];

const floatingCards = [
  { icon: MessageSquare, text: 'SMS Delivered', subtext: '2 mins ago', color: 'bg-brand-green' },
  { icon: CreditCard, text: 'M-Pesa Payment', subtext: 'KES 5,000 received', color: 'bg-brand-blue' },
  { icon: Smartphone, text: 'USSD Session', subtext: '*384# active', color: 'bg-brand-orange' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(
        '.hero-title-line',
        { y: 60, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8, stagger: 0.15 }
      )
        .fromTo(
          '.hero-subtitle',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          '.hero-cta',
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
          '-=0.3'
        )
        .fromTo(
          '.hero-image',
          { rotateY: -30, rotateX: 10, z: -200, opacity: 0 },
          { rotateY: -5, rotateX: 0, z: 0, opacity: 1, duration: 1.2 },
          '-=0.8'
        )
        .fromTo(
          '.floating-card',
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'elastic.out(1, 0.5)' },
          '-=0.6'
        )
        .fromTo(
          '.hero-stat',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          '-=0.4'
        );

      // Scroll-triggered parallax
      gsap.to('.hero-image', {
        rotateY: -15,
        scale: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      gsap.to('.floating-card', {
        y: -50,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-dark"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 via-brand-dark/30 to-brand-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <div ref={contentRef} className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
              <span className="text-sm text-white/80">Now with WhatsApp Business API</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              <span className="hero-title-line block">Cloud Communication</span>
              <span className="hero-title-line block text-gradient">Built for Africa</span>
            </h1>

            <p className="hero-subtitle text-lg sm:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 mb-8">
              Enterprise-grade SMS, WhatsApp, USSD, and M-Pesa integrations. 
              Reach millions across Kenya with 99.9% uptime.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button
                size="lg"
                className="hero-cta bg-brand-green hover:bg-brand-green/90 text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 group"
                onClick={() => scrollToSection('#pricing')}
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hero-cta border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                onClick={() => scrollToSection('#cta')}
              >
                <Play className="mr-2 w-5 h-5" />
                Talk to Sales
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="hero-stat text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image & Floating Cards */}
          <div ref={imageRef} className="relative hidden lg:block" style={{ perspective: '1200px' }}>
            <div
              className="hero-image relative"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateY(-5deg) rotateX(2deg)',
              }}
            >
              <img
                src="/hero-dashboard.jpg"
                alt="Mawingu Connect Dashboard"
                className="w-full rounded-2xl shadow-2xl"
              />

              {/* Floating Cards */}
              <div ref={cardsRef} className="absolute inset-0 pointer-events-none">
                {floatingCards.map((card, index) => (
                  <div
                    key={index}
                    className={`floating-card absolute flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-xl ${
                      index === 0
                        ? '-top-4 -right-4'
                        : index === 1
                        ? 'top-1/3 -left-8'
                        : 'bottom-12 -right-8'
                    }`}
                    style={{
                      transform: `translateZ(${50 + index * 25}px)`,
                      animation: `float ${5 + index}s ease-in-out infinite`,
                      animationDelay: `${index * 0.5}s`,
                    }}
                  >
                    <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}>
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{card.text}</div>
                      <div className="text-xs text-muted-foreground">{card.subtext}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-center text-white/50 text-sm mb-6">
            Trusted by leading African businesses
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {['Safaricom', 'KCB Bank', 'Twiga Foods', 'Sendy', 'Lori Systems'].map((company) => (
              <span key={company} className="text-white font-semibold text-lg">
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
