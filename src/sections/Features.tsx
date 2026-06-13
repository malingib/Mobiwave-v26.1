import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MessageSquare,
  MessageCircle,
  Smartphone,
  CreditCard,
  Phone,
  BarChart3,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: MessageSquare,
    title: 'Bulk SMS Messaging',
    description:
      'Send personalized SMS to millions with 99.9% delivery rates. Schedule campaigns, track delivery, and analyze engagement.',
    color: 'from-brand-green to-emerald-600',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Business API',
    description:
      'Connect with customers on their favorite app. Rich media support, quick replies, and automated workflows.',
    color: 'from-brand-blue to-blue-600',
  },
  {
    icon: Smartphone,
    title: 'USSD Solutions',
    description:
      'Create interactive *384# services for surveys, voting, and menu-driven interactions without internet.',
    color: 'from-brand-orange to-orange-600',
  },
  {
    icon: CreditCard,
    title: 'M-Pesa Integration',
    description:
      'Seamless STK push payments, transaction notifications, and automated reconciliation.',
    color: 'from-brand-green to-teal-600',
  },
  {
    icon: Phone,
    title: 'Voice & IVR',
    description:
      'Automated calls, interactive voice responses, and call center integrations.',
    color: 'from-brand-purple to-purple-600',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'Real-time insights into delivery rates, engagement metrics, and campaign performance.',
    color: 'from-brand-blue to-indigo-600',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        '.features-label',
        { width: 0 },
        {
          width: 'auto',
          duration: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.features-title span',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.features-subtitle',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Feature cards animation
      gsap.fromTo(
        '.feature-card',
        { rotateY: -90, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-24 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block overflow-hidden mb-4">
            <span className="features-label inline-block px-4 py-1.5 bg-brand-green/10 text-brand-green text-sm font-medium rounded-full whitespace-nowrap overflow-hidden">
              POWERFUL FEATURES
            </span>
          </div>
          <h2 className="features-title text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {'Everything You Need to Communicate at Scale'.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-2">{word}</span>
            ))}
          </h2>
          <p className="features-subtitle text-lg text-muted-foreground">
            From bulk messaging to M-Pesa integrations, our platform provides all the tools 
            you need to reach and engage your audience.
          </p>
        </div>

        {/* Features Grid */}
        <div
          className="features-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: '1000px' }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative bg-card rounded-2xl p-8 border border-border hover:border-brand-green/30 transition-all duration-300 hover:shadow-card-hover"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
              }}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-brand-green transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
