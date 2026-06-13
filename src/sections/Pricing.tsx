import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Check, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses getting started',
    monthlyPrice: 0.45,
    annualPrice: 0.36,
    unit: 'per SMS',
    features: [
      'Up to 10,000 SMS/month',
      'Bulk SMS & Email',
      'Basic analytics',
      'Email support',
      '1 API key',
      'M-Pesa C2B integration',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For growing businesses with advanced needs',
    monthlyPrice: 0.35,
    annualPrice: 0.28,
    unit: 'per SMS',
    features: [
      'Up to 100,000 SMS/month',
      'WhatsApp Business API',
      'M-Pesa STK Push',
      'Advanced analytics',
      'Priority support',
      '5 API keys',
      'Dedicated account manager',
      'USSD shortcodes',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Tailored solutions for large organizations',
    monthlyPrice: null,
    annualPrice: null,
    unit: 'Custom pricing',
    features: [
      'Unlimited SMS volume',
      'Custom integrations',
      'SLA guarantee',
      '24/7 phone support',
      'Unlimited API keys',
      'On-premise option',
      'Custom contracts',
      'Dedicated infrastructure',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pricing-header',
        { y: 30, opacity: 0 },
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
        '.pricing-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.pricing-grid',
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
      id="pricing"
      className="py-24 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pricing-header text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-brand-green/10 text-brand-green text-sm font-medium rounded-full mb-4">
            PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Pay as you grow. No hidden fees, no setup costs.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-brand-green"
          />
          <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Annual
          </span>
          {isAnnual && (
            <span className="px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-medium rounded-full">
              Save 20%
            </span>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card relative bg-card rounded-2xl p-8 border transition-all duration-300 hover:shadow-card-hover ${
                plan.popular
                  ? 'border-brand-green shadow-glow scale-105 z-10'
                  : 'border-border hover:border-brand-green/30'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-brand-green text-white text-sm font-medium rounded-full shadow-glow">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                {plan.monthlyPrice ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      KES {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/{plan.unit}</span>
                  </div>
                ) : (
                  <div className="text-4xl font-bold text-foreground">
                    Custom
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`w-full ${
                  plan.popular
                    ? 'bg-brand-green hover:bg-brand-green/90 text-white shadow-glow hover:shadow-glow-lg'
                    : 'bg-muted hover:bg-muted/80 text-foreground'
                } transition-all duration-300`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include: 99.9% uptime SLA • Real-time delivery reports • 
            Safaricom, Airtel & Telkom coverage
          </p>
        </div>
      </div>
    </section>
  );
}
