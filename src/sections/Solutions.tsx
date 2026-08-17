import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Landmark, Heart, GraduationCap, Truck, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: ShoppingCart,
    title: 'Boost Sales with Targeted Messaging',
    description:
      'Send order confirmations, delivery updates, and personalized promotions. Recover abandoned carts with automated SMS reminders.',
    features: [
      'Abandoned cart recovery',
      'Order tracking notifications',
      'Flash sale alerts',
      'Customer review requests',
    ],
    color: 'brand-orange',
  },
  {
    id: 'finance',
    name: 'Financial Services',
    icon: Landmark,
    title: 'Secure Banking Communications',
    description:
      'Deliver OTPs, transaction alerts, and account updates with bank-grade security and 99.9% reliability.',
    features: [
      'Two-factor authentication',
      'Real-time transaction alerts',
      'Fraud detection notifications',
      'Account balance updates',
    ],
    color: 'brand-green',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Heart,
    title: 'Patient Engagement Made Easy',
    description:
      'Send appointment reminders, lab results, and health tips. Improve patient outcomes with timely communication.',
    features: [
      'Appointment reminders',
      'Lab result notifications',
      'Medication adherence alerts',
      'Telemedicine scheduling',
    ],
    color: 'brand-blue',
  },
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    title: 'Connect with Students & Parents',
    description:
      'Share exam results, fee reminders, and important announcements. Keep your school community informed.',
    features: [
      'Exam result distribution',
      'Fee payment reminders',
      'Emergency notifications',
      'Parent-teacher updates',
    ],
    color: 'brand-purple',
  },
  {
    id: 'logistics',
    name: 'Logistics',
    icon: Truck,
    title: 'Real-Time Delivery Updates',
    description:
      'Keep customers informed at every step. From dispatch to delivery, provide complete visibility.',
    features: [
      'Delivery notifications',
      'Driver tracking updates',
      'Proof of delivery alerts',
      'Customer feedback collection',
    ],
    color: 'brand-orange',
  },
];

export default function Solutions() {
  const [activeTab, setActiveTab] = useState('ecommerce');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeIndustry = industries.find((i) => i.id === activeTab) || industries[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.solutions-header',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.phone-frame',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.phone-mockups',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animate content change
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'expo.out' }
      );
    }
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="py-24 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="solutions-header text-center max-w-3xl mx-auto mb-16">
          <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">
            <span className="h-px w-8 bg-brand-blue" />
            TAILORED SOLUTIONS
            <span className="h-px w-8 bg-brand-blue" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Built for Every Industry
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're a startup or enterprise, our platform scales to meet your communication needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Phone Mockups */}
          <div className="phone-mockups relative hidden lg:block h-[500px]">
            <div
              className="phone-frame absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64"
              style={{ zIndex: 3 }}
            >
              <img
                src="/phone-mockup.webp"
                alt="Phone Interface"
                width={832}
                height={1248}
                loading="lazy"
                decoding="async"
                className="w-full rounded-3xl shadow-2xl animate-float"
              />
            </div>
            <div
              className="phone-frame absolute top-1/4 left-1/4 w-48 opacity-60"
              style={{ zIndex: 2, transform: 'translateZ(-30px)' }}
            >
              <div className="bg-card rounded-3xl shadow-xl p-4 animate-float-slow">
                <div className="space-y-3">
                  <div className="h-3 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-20 bg-brand-green/10 rounded-lg" />
                </div>
              </div>
            </div>
            <div
              className="phone-frame absolute bottom-1/4 right-1/4 w-48 opacity-40"
              style={{ zIndex: 1, transform: 'translateZ(-60px)' }}
            >
              <div className="bg-card rounded-3xl shadow-xl p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="space-y-3">
                  <div className="h-3 bg-muted rounded w-2/3" />
                  <div className="h-3 bg-muted rounded w-1/3" />
                  <div className="h-16 bg-brand-blue/10 rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => setActiveTab(industry.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === industry.id
                      ? `bg-${industry.color} text-white shadow-lg`
                      : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <industry.icon className="w-4 h-4" />
                  {industry.name}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div ref={contentRef} className="bg-card rounded-2xl p-8 border border-border">
              <div
                className={`w-12 h-12 rounded-xl bg-${activeIndustry.color} flex items-center justify-center mb-6`}
              >
                <activeIndustry.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-4">
                {activeIndustry.title}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {activeIndustry.description}
              </p>

              <ul className="space-y-3">
                {activeIndustry.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className={`w-5 h-5 text-${activeIndustry.color} flex-shrink-0`} />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
