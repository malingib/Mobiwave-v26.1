import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, HelpCircle, Mail, MessageCircle, CreditCard, BarChart3, Gift, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageBanner } from '@/components/PageBanner';
import { TiltCard } from '@/components/TiltCard';

gsap.registerPlugin(ScrollTrigger);

const bulkSMSPlans = [
  {
    name: 'Small Business',
    price: '0.35',
    range: '1 - 50,000',
    unit: 'SMS per month',
    features: [
      'Ksh. 0.35 per SMS',
      'Personalized sender ID',
      'Delivery reports',
      '24/7 support',
      'API access'
    ],
    popular: false
  },
  {
    name: 'Medium Business',
    price: '0.30',
    range: '50,001 - 500,000',
    unit: 'SMS per month',
    features: [
      'Ksh. 0.30 per SMS',
      'Personalized sender ID',
      'Delivery reports',
      '24/7 priority support',
      'API access',
      'Message scheduling'
    ],
    popular: true
  },
  {
    name: 'Large Business',
    price: '0.25',
    range: '500,001 - 2,000,000',
    unit: 'SMS per month',
    features: [
      'Ksh. 0.25 per SMS',
      'Personalized sender ID',
      'Delivery reports',
      '24/7 priority support',
      'API access',
      'Message scheduling',
      'Dedicated account manager'
    ],
    popular: false
  },
  {
    name: 'Enterprise',
    price: '0.20',
    range: 'Above 2,000,000',
    unit: 'SMS per month',
    features: [
      'Ksh. 0.20 per SMS',
      'Personalized sender ID',
      'Delivery reports',
      '24/7 priority support',
      'API access',
      'Message scheduling',
      'Dedicated account manager',
      'Custom integration support'
    ],
    popular: false
  }
];

const ussdPlans = [
  {
    name: 'Dedicated USSD',
    description: 'Customers are charged to access code. Full control over your USSD service.',
    pricing: [
      { label: 'Cost', value: 'KES 110,000 +VAT' },
      { label: 'Up-front Fee', value: 'KES 40,000 +VAT' },
      { label: 'Monthly Fee', value: 'KES 40,000 +VAT' }
    ],
    features: [
      'Dedicated USSD code',
      'Full customization',
      'Customer charged for access',
      '24/7 support',
      'API integration'
    ]
  },
  {
    name: 'Test-Bed Service',
    description: 'Connection to test environment for 30 days. Perfect for development and testing.',
    pricing: [
      { label: 'Cost', value: 'KES 32,000 +VAT' },
      { label: 'Extension', value: 'KES 32,000 +VAT' }
    ],
    features: [
      '30-day test environment',
      'Development access',
      'Testing capabilities',
      'Extension available',
      'Technical support'
    ]
  },
  {
    name: 'Shared USSD',
    description: 'Cost-effective solution for businesses sharing a USSD code.',
    pricing: [
      { label: 'Setup Cost', value: 'KES 11,000 +VAT' },
      { label: 'Monthly Fee', value: 'KES 8,000 +VAT' }
    ],
    features: [
      'Shared USSD code',
      'Cost-effective',
      'Monthly billing',
      'Standard support'
    ]
  }
];

const shortcodePlans = [
  {
    name: 'Shared Short-Code',
    description: 'Cost-effective solution for businesses sharing a shortcode with others.',
    pricing: [
      { label: 'Cost per Network', value: 'KES 2,500 +VAT' },
      { label: 'Monthly Renewal', value: 'KES 5,000 +VAT' }
    ],
    requirements: [
      '1 Week waiting period',
      'Initial payments',
      'Authorisation letter from organisation',
      'List of preferred short codes'
    ],
    popular: false
  },
  {
    name: 'Dedicated Short-Code',
    description: 'Get your own exclusive shortcode for complete control over your communications.',
    pricing: [
      { label: 'Cost per Network', value: 'KES 15,000 +VAT' },
      { label: 'Monthly Rental', value: 'KES 15,000 +VAT' }
    ],
    requirements: [
      '1 Week waiting period',
      'Initial payments',
      'Authorisation letter from organisation',
      'List of preferred short codes'
    ],
    popular: true
  }
];

const otherServices = [
  {
    icon: Mail,
    name: 'Bulk Email',
    description: 'Send professional email campaigns at scale',
    price: 'Custom',
    unit: 'pricing',
    features: [
      'High deliverability rates',
      'Custom templates',
      'Campaign analytics',
      'List management'
    ]
  },
  {
    icon: MessageCircle,
    name: 'Bulk WhatsApp',
    description: 'Reach customers on their favorite messaging app',
    price: 'Custom',
    unit: 'pricing',
    features: [
      'Rich media messages',
      'Two-way communication',
      'Message templates',
      'Delivery tracking'
    ]
  },
  {
    icon: CreditCard,
    name: 'M-Pesa Integration',
    description: 'Seamless mobile money transactions',
    price: 'Custom',
    unit: 'pricing',
    features: [
      'C2B payments',
      'B2C disbursements',
      'B2B transfers',
      'Real-time notifications'
    ]
  },
  {
    icon: BarChart3,
    name: 'SMS Surveys',
    description: 'Collect feedback via SMS',
    price: 'Custom',
    unit: 'pricing',
    features: [
      'Easy survey creation',
      'Real-time responses',
      'Response analytics',
      'Export to Excel/CSV'
    ]
  },
  {
    icon: Gift,
    name: 'Airtime & Data Rewards',
    description: 'Incentivize customers instantly',
    price: 'Custom',
    unit: 'pricing',
    features: [
      'Instant airtime delivery',
      'Data bundle rewards',
      'All networks supported',
      'Bulk processing'
    ]
  },
  {
    icon: Headphones,
    name: 'Service Desk',
    description: 'Unified customer support platform',
    price: 'Custom',
    unit: 'pricing',
    features: [
      'Multi-channel support',
      'Ticket management',
      'Agent collaboration',
      'Performance analytics'
    ]
  }
];

export function Pricing() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      if (!section) return;
      const cards = section.querySelectorAll('.pricing-card');
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageBanner
        title="Simple, Transparent Pricing"
        subtitle="Choose the perfect plan for your communication needs. No hidden fees, no surprises."
      />

      {/* Bulk SMS Section */}
      <section ref={(el) => { sectionRefs.current[0] = el; }} className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0084ff]">
              <span className="h-px w-8 bg-[#0084ff]" />
              BULK SMS
              <span className="h-px w-8 bg-[#0084ff]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Bulk SMS Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Send SMS messages to your customers with our reliable and affordable bulk SMS packages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bulkSMSPlans.map((plan) => (
              <TiltCard key={plan.name} className="pricing-card" maxTilt={5}>
                <div className={`h-full border-b p-6 ${plan.popular ? 'border-[#1d8c89]' : 'border-gray-200'} relative`}>
                  {plan.popular && (
                    <div className="absolute -top-3 right-4 px-3 py-1 bg-[#1d8c89] text-white text-xs font-medium rounded-full">
                      POPULAR
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-sm text-gray-500">KES</span>
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-sm text-gray-500">/SMS</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{plan.range} {plan.unit}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-[#1d8c89] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-[#0084ff] text-white hover:bg-[#0068d6]">
                    Get Started
                  </Button>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* USSD Section */}
      <section ref={(el) => { sectionRefs.current[1] = el; }} className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-purple-600">
              <span className="h-px w-8 bg-purple-600" />
              USSD SERVICES
              <span className="h-px w-8 bg-purple-600" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">USSD Code Options</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create interactive USSD menus for customer engagement without internet.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {ussdPlans.map((plan) => (
              <div key={plan.name} className="pricing-card border-b border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                <div className="space-y-2 mb-4">
                  {plan.pricing.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">{item.label}</span>
                      <span className="font-semibold text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#1d8c89] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-[#0084ff] text-white hover:bg-[#0068d6]">
                  Get Started
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-2">
              USSD services require approval from the Communication Authority of Kenya and mobile network operators.
            </p>
            <a href="/contact" className="inline-flex items-center gap-2 text-[#0084ff] hover:underline">
              Contact us for custom USSD solutions <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Shortcodes Section */}
      <section ref={(el) => { sectionRefs.current[2] = el; }} className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
              <span className="h-px w-8 bg-orange-600" />
              SHORTCODES
              <span className="h-px w-8 bg-orange-600" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">SMS Shortcode Options</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Engage with your customers using easy-to-remember shortcodes for two-way communication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {shortcodePlans.map((plan) => (
              <div key={plan.name} className={`pricing-card border-b p-6 ${plan.popular ? 'border-[#1d8c89]' : 'border-gray-200'} relative`}>
                {plan.popular && (
                  <div className="absolute -top-3 right-4 px-3 py-1 bg-[#1d8c89] text-white text-xs font-medium rounded-full">
                    POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                <div className="space-y-2 mb-4">
                  {plan.pricing.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">{item.label}</span>
                      <span className="font-semibold text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
                  <ul className="space-y-1">
                    {plan.requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <HelpCircle className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full bg-[#0084ff] text-white hover:bg-[#0068d6]">
                  Get Started
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-2">
              All shortcodes require approval from the Communication Authority of Kenya.
            </p>
            <a href="/contact" className="inline-flex items-center gap-2 text-[#0084ff] hover:underline">
              Contact us for more information <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Other Services Section */}
      <section ref={(el) => { sectionRefs.current[3] = el; }} className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1d8c89]">
              <span className="h-px w-8 bg-[#1d8c89]" />
              MORE SERVICES
              <span className="h-px w-8 bg-[#1d8c89]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our full range of communication and payment solutions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((service) => (
              <div key={service.name} className="pricing-card border-b border-gray-200 p-6 transition-colors hover:border-[#0084ff]/40">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{service.description}</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-xl font-bold text-[#0084ff]">{service.price}</span>
                  <span className="text-sm text-gray-500">{service.unit}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#1d8c89] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full border-[#0084ff] text-[#0084ff] hover:bg-[#0084ff] hover:text-white">
                  Get Quote
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Pricing CTA */}
      <section className="bg-[#0a1a25] py-14">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need a custom package?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            We can tailor a solution just for you. Contact us for custom pricing based on your specific needs.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0084ff] font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact us for custom pricing <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
