import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageBanner } from './PageBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  benefits: string[];
  useCases: { title: string; description: string }[];
  pricing?: {
    title: string;
    price: string;
    unit: string;
    features: string[];
  }[];
  ctaDescription?: string;
}

export function ServicePageLayout({
  title,
  subtitle,
  description,
  icon: _Icon,
  features,
  benefits,
  useCases,
  pricing,
  ctaDescription
}: ServicePageLayoutProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const contactItems = [
    { icon: Phone, label: 'Phone', value: '+254 736 427 842', href: 'tel:+254736427842' },
    { icon: Mail, label: 'Email', value: 'info@mobiwave.co.ke', href: 'mailto:info@mobiwave.co.ke' },
    { icon: Clock, label: 'Office Hours', value: 'Monday-Friday, 9am-5pm', href: null }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!contentRef.current) return;

      const sections = gsap.utils.toArray<HTMLElement>('.animate-section', contentRef.current);
      sections.forEach((section) => {
        const items = gsap.utils.toArray<HTMLElement>('.animate-item', section);
        if (items.length === 0) return;

        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageBanner title={title} subtitle={subtitle} />

      <div ref={contentRef}>
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center animate-section">
              <div className="animate-item lg:col-span-2 text-center max-w-3xl mx-auto">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#0084ff]/10 text-[#0084ff] text-sm font-medium mb-4">
                  {title}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {subtitle}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {description}
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0084ff] to-[#031522] text-white font-medium hover:shadow-lg transition-shadow"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#f4f7fb]">
          <div className="container-custom">
            <div className="text-center mb-12 animate-section animate-item">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Practical capabilities built for delivery, control, and measurable growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3 md:gap-4 animate-section max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="animate-item flex items-start gap-3 rounded-xl bg-white/70 border border-[#dbe6f5] px-4 py-3.5">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0084ff] to-[#1d8c89] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="text-base sm:text-lg font-medium leading-snug text-[#0a1a25]">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center animate-section">
              <div className="animate-item">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Choose Our {title} Service?
                </h2>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0084ff] to-[#1d8c89] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-item">
                <div className="bg-gradient-to-br from-[#e9f4ff] to-white rounded-2xl p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Get Started Today</h3>
                  <p className="text-gray-600 mb-6">
                    Ready to transform your business communication? Contact us today to learn more about our {title} service.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0084ff] to-[#031522] text-white font-medium hover:shadow-lg transition-shadow"
                    >
                      Contact Us <ArrowRight className="w-5 h-5" />
                    </a>
                    <a
                      href="/pricing"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#0084ff] text-[#0084ff] font-medium hover:bg-[#0084ff] hover:text-white transition-colors"
                    >
                      View Pricing
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#f4f7fb]">
          <div className="container-custom">
            <div className="text-center mb-12 animate-section">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Use Cases</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See how businesses like yours are using our {title} service.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-section">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="animate-item bg-white rounded-xl p-5 sm:p-6 shadow-md border border-gray-100 min-h-[180px]"
                >
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-[0.95rem] leading-relaxed">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {pricing && pricing.length > 0 && (
          <section className="section-padding">
            <div className="container-custom">
              <div className="text-center mb-12 animate-section">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pricing</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Choose the plan that best fits your business needs.
                </p>
              </div>

              <div className={`grid ${pricing.length === 1 ? 'max-w-md mx-auto' : pricing.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'md:grid-cols-3'} gap-4 md:gap-6 animate-section`}>
                {pricing.map((plan, index) => (
                  <div
                    key={index}
                    className="animate-item bg-white rounded-xl p-5 sm:p-6 shadow-md border border-gray-100 min-h-[360px] flex flex-col"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.title}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500">{plan.unit}</span>
                    </div>
                    <ul className="space-y-2 mb-6 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-[#1d8c89] flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-[#0084ff] to-[#031522] text-white hover:shadow-lg mt-auto">
                      Get Started
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-white">
          <div className="container-custom">
            <Card
              className="relative overflow-hidden rounded-3xl border-0 p-0 gap-0"
              style={{ background: '#0a1a25' }}
            >
              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #0084ff, transparent)', transform: 'translate(30%, -30%)' }}
              />
              <div
                className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #0055ae, transparent)', transform: 'translate(-30%, 30%)' }}
              />

              <CardHeader className="relative z-10 p-6 sm:p-8 md:p-12 pb-0">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
                  <div className="max-w-xl">
                    <Badge variant="outline" className="section-label-white mb-4 border-white/20 text-white/90">
                      Ready to Transform?
                    </Badge>
                    <CardTitle className="section-heading-white mb-4">
                      Ready to Transform Your <span style={{ color: '#0084ff' }}>{title} Strategy?</span>
                    </CardTitle>
                    <p className="text-white/60 text-lg">
                      {ctaDescription ?? 'Get in touch with our team today to discuss how MobiWave can help your business communicate more effectively.'}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full lg:w-auto">
                    <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-500 text-base">
                      <a href="/contact">
                        Send Message
                        <ArrowRight data-icon="inline-end" />
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                      <a href="tel:+254736427842">Call Us Now</a>
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="grid md:grid-cols-3 gap-4 p-6 sm:p-8 pt-0 md:px-12 md:pb-12">
                {contactItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                  >
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                      <item.icon className="h-5 w-5 text-[#60a5fa]" />
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} className="text-white font-semibold hover:text-[#60a5fa] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white font-semibold">{item.value}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
