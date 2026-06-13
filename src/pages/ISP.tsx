import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Satellite, Signal, Globe, Shield, Zap, MapPin } from 'lucide-react';
import { PageBanner } from '@/components/PageBanner';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Signal,
    title: 'Lightning-Fast Speeds',
    description: 'Experience internet speeds up to 50 Mbps with consistent, reliable connectivity.'
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Access high-speed internet anywhere in Kenya, even in remote areas.'
  },
  {
    icon: Shield,
    title: 'Secure Connection',
    description: 'Enterprise-grade security and encryption to protect your data.'
  },
  {
    icon: Zap,
    title: 'Low Latency',
    description: 'Optimized network routes for minimal latency and smooth browsing.'
  }
];

const plans = [
  {
    name: 'Starter',
    speed: '10 Mbps',
    price: 'KES 2,999',
    period: 'per month',
    features: [
      'Up to 10 Mbps download speed',
      'Unlimited data',
      'Email support',
      'Basic security features'
    ],
    popular: false
  },
  {
    name: 'Professional',
    speed: '30 Mbps',
    price: 'KES 4,999',
    period: 'per month',
    features: [
      'Up to 30 Mbps download speed',
      'Unlimited data',
      'Priority support',
      'Advanced security features',
      '24/7 monitoring'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    speed: '50 Mbps',
    price: 'KES 7,999',
    period: 'per month',
    features: [
      'Up to 50 Mbps download speed',
      'Unlimited data',
      'Dedicated account manager',
      'Enterprise security',
      'SLA guaranteed uptime'
    ],
    popular: false
  }
];

const benefits = [
  {
    title: 'Always On',
    description: 'Enjoy uninterrupted connectivity with 99.9% uptime guarantee.'
  },
  {
    title: 'Easy Setup',
    description: 'Professional installation within 48 hours of order placement.'
  },
  {
    title: 'Flexible Plans',
    description: 'Choose a plan that fits your needs with no long-term contracts.'
  },
  {
    title: 'Expert Support',
    description: 'Our dedicated team is available 24/7 to assist you.'
  }
];

export function ISP() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (featuresRef.current) {
        const cards = featuresRef.current.querySelectorAll('.feature-card');
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
            }
          }
        );
      }
      if (plansRef.current) {
        const planCards = plansRef.current.querySelectorAll('.plan-card');
        gsap.fromTo(
          planCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: plansRef.current,
              start: 'top 80%',
            }
          }
        );
      }
      if (benefitsRef.current) {
        const benefitItems = benefitsRef.current.querySelectorAll('.benefit-item');
        gsap.fromTo(
          benefitItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: benefitsRef.current,
              start: 'top 80%',
            }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageBanner
        title="Satellite Internet"
        subtitle="Reliable, high-speed satellite internet connectivity across Kenya. Stay connected anywhere, anytime."
      />

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0084ff]/10 text-[#0084ff] text-sm font-medium mb-4">
              WHY CHOOSE OUR SERVICE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Powerful Satellite Internet for Everyone
            </h2>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="feature-card p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg hover:border-[#0084ff]/20 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-10 h-10 text-[#0084ff] mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="section-padding bg-gradient-to-r from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#0084ff]/10 text-[#0084ff] text-sm font-medium mb-4">
                COVERAGE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Nationwide Satellite Coverage
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our satellite internet network covers the entire country, reaching areas where traditional broadband cannot reach. Enjoy consistent, reliable connectivity from urban centers to remote locations.
              </p>
              <div className="space-y-4">
                {[
                  'Rural and urban coverage',
                  'No geographic limitations',
                  'Fast installation across Kenya'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#0084ff] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 px-8 py-3 bg-[#0084ff] text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                Check Availability
              </button>
            </div>
            <div className="bg-gradient-to-br from-[#0084ff]/10 to-[#0084ff]/5 rounded-lg p-12 flex items-center justify-center min-h-80">
              <Satellite className="w-32 h-32 text-[#0084ff]/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0084ff]/10 text-[#0084ff] text-sm font-medium mb-4">
              BENEFITS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Satellite Internet?
            </h2>
          </div>

          <div ref={benefitsRef} className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="benefit-item p-8 border-l-4 border-[#0084ff] bg-gradient-to-r from-[#0084ff]/5 to-transparent rounded"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding bg-gradient-to-r from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0084ff]/10 text-[#0084ff] text-sm font-medium mb-4">
              PRICING
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h2>
          </div>

          <div ref={plansRef} className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`plan-card rounded-lg overflow-hidden transition-all duration-300 ${
                  plan.popular
                    ? 'ring-2 ring-[#0084ff] shadow-xl transform scale-105'
                    : 'border border-gray-200 shadow-lg'
                } bg-white`}
              >
                {plan.popular && (
                  <div className="bg-[#0084ff] text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-[#0084ff] text-sm font-semibold mb-6">
                    {plan.speed}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">
                      {plan.period}
                    </span>
                  </div>
                  <button
                    className={`w-full py-3 rounded-lg font-semibold mb-8 transition-colors ${
                      plan.popular
                        ? 'bg-[#0084ff] text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </button>
                  <div className="space-y-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-[#0084ff] to-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Connected?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Kenyans enjoying reliable, high-speed satellite internet. Get started today with a 30-day free trial.
          </p>
          <button className="px-8 py-4 bg-white text-[#0084ff] font-semibold rounded-lg hover:bg-gray-50 transition-colors">
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}
