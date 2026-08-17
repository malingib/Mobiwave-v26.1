import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ArrowRight, Phone, Mail, Clock, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageBanner } from './PageBanner';
import { Breadcrumbs } from './Breadcrumbs';
import { trackEvent } from '@/lib/analytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
  howItWorks?: { step: string; title: string; description: string }[];
  comparisonTable?: {
    headers: string[];
    rows: { name: string; cells: (string | { text: string; highlight?: boolean })[] }[];
    note?: string;
  };
  faqs?: { question: string; answer: string }[];
  stats?: { value: string; label: string }[];
}

export function FaqBlock({ faqs, title }: { faqs: { question: string; answer: string }[]; title: string }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="section-padding mw-section-surface" id="faq" aria-labelledby={`${title}-faq`}>
      <div className="container-custom">
        <div className="grid items-start gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0084ff]">
              <span className="h-px w-8 bg-[#0084ff]" />
              Frequently Asked Questions
            </div>
            <h2 id={`${title}-faq`} className="text-3xl md:text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0a1a25] sm:text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {title} questions, answered.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-[#5b6b78]">
              The practical questions Kenyan organisations ask about {title.toLowerCase()}, with straight answers and KES pricing where it applies.
            </p>
            <a href="/contact" className="mt-8 inline-flex text-sm font-bold text-[#0084ff] hover:text-[#0068d6]">Still have a question? Talk to us <span className="ml-2">&rarr;</span></a>
          </div>

          <div className="border-t border-[#0a1a25]/15">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className="border-b border-[#0a1a25]/15">
                  <h3>
                    <button onClick={() => setOpenIndex(isOpen ? -1 : index)} className="group flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6" aria-expanded={isOpen}>
                      <span className="text-base sm:text-lg font-bold text-[#0a1a25] transition-colors group-hover:text-[#0084ff]" style={{ fontFamily: 'Outfit, sans-serif' }}>{faq.question}</span>
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#0a1a25]/15 transition-all ${isOpen ? 'rotate-180 border-[#0084ff] bg-[#0084ff] text-white' : 'text-[#5b6b78]'}`} aria-hidden="true"><ChevronDown className="h-4 w-4" /></span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <p className="max-w-2xl pb-6 pr-12 text-sm leading-7 text-[#5b6b78] sm:text-base">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicePageLayout({
  title,
  subtitle,
  description,
  features,
  benefits,
  useCases,
  pricing,
  ctaDescription,
  howItWorks,
  comparisonTable,
  faqs,
  stats
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
      <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: title }]} />

      <div ref={contentRef}>
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center animate-section">
              <div className="animate-item lg:col-span-2 text-center max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-2.5 mb-5">
                  <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
                  <span className="text-xs font-bold text-[#7c3aed] uppercase tracking-[0.18em]">{title}</span>
                  <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1a25] mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {subtitle}
                </h2>
                <p className="text-[#5b6b78] text-lg leading-relaxed mb-8">
                  {description}
                </p>
                <a
                  href="/contact"
                  className="mw-btn-primary-solid"
                  onClick={() => trackEvent('service_cta_click', { service: title, location: 'intro' })}
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding mw-section-surface">
          <div className="container-custom">
            <div className="text-center mb-12 animate-section animate-item">
              <div className="flex items-center justify-center gap-2.5 mb-5">
                <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
                <span className="text-xs font-bold text-[#7c3aed] uppercase tracking-[0.18em]">Features</span>
                <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1a25] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Key Features</h2>
              <p className="text-[#5b6b78] max-w-2xl mx-auto">
                Practical capabilities built for delivery, control, and measurable growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3 md:gap-4 animate-section max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="animate-item mw-card flex items-start gap-3 px-4 py-3.5">
                  <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center text-[#1d8c89]">
                    <Check className="h-4 w-4" />
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
                      <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center text-[#1d8c89]">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-item">
                <div className="mw-card p-8">
                  <h3 className="text-xl font-bold text-[#0a1a25] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Get Started Today</h3>
                  <p className="text-[#5b6b78] mb-6">
                    Ready to transform your business communication? Contact us today to learn more about our {title} service.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/contact"
                      className="mw-btn-primary-solid justify-center"
                      onClick={() => trackEvent('service_cta_click', { service: title, location: 'mid_page' })}
                    >
                      Contact Us <ArrowRight className="w-5 h-5" />
                    </a>
                    <a
                      href="/pricing"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#0084ff] text-[#0084ff] font-semibold hover:bg-[#0084ff] hover:text-white transition-colors"
                    >
                      View Pricing
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding mw-section-surface">
          <div className="container-custom">
            <div className="text-center mb-12 animate-section">
              <div className="flex items-center justify-center gap-2.5 mb-5">
                <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
                <span className="text-xs font-bold text-[#7c3aed] uppercase tracking-[0.18em]">Applications</span>
                <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1a25] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Use Cases</h2>
              <p className="text-[#5b6b78] max-w-2xl mx-auto">
                See how businesses like yours are using our {title} service.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-section">
              {useCases.map((useCase, index) => (
                <div key={index} className="animate-item mw-card p-5 sm:p-6 min-h-[180px]">
                  <h3 className="text-base sm:text-lg font-bold text-[#0a1a25] mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{useCase.title}</h3>
                  <p className="text-[#5b6b78] text-sm sm:text-[0.95rem] leading-relaxed">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {stats && stats.length > 0 && (
          <section className="section-padding">
            <div className="container-custom">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-section">
                {stats.map((stat) => (
                  <div key={stat.label} className="animate-item mw-card p-5 text-center">
                    <div className="text-2xl md:text-3xl font-extrabold text-[#0a1a25] mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.value}</div>
                    <div className="text-xs md:text-sm text-[#5b6b78] uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {howItWorks && howItWorks.length > 0 && (
          <section className="section-padding mw-section-surface" aria-labelledby={`${title}-how-it-works`}>
            <div className="container-custom">
              <div className="text-center mb-12 animate-section animate-item">
                <div className="flex items-center justify-center gap-2.5 mb-5">
                  <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
                  <span className="text-xs font-bold text-[#7c3aed] uppercase tracking-[0.18em]">How It Works</span>
                  <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
                </div>
                <h2 id={`${title}-how-it-works`} className="text-3xl md:text-4xl font-extrabold text-[#0a1a25] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>How {title} works in Kenya</h2>
                <p className="text-[#5b6b78] max-w-2xl mx-auto">From registration to live delivery, here is what working with MobiWave looks like.</p>
              </div>

              <ol className="grid md:grid-cols-2 gap-4 animate-section max-w-5xl mx-auto">
                {howItWorks.map((item) => (
                  <li key={item.step} className="animate-item mw-card p-5 flex gap-4">
                    <span className="pt-1 text-sm font-bold text-[#0084ff]" aria-hidden="true">{item.step}</span>
                    <div>
                      <h3 className="text-lg font-bold text-[#0a1a25] mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{item.title}</h3>
                      <p className="text-[#5b6b78] text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {comparisonTable && comparisonTable.rows.length > 0 && (
          <section className="section-padding" aria-labelledby={`${title}-comparison`}>
            <div className="container-custom">
              <div className="text-center mb-10 animate-section animate-item">
                <div className="flex items-center justify-center gap-2.5 mb-5">
                  <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
                  <span className="text-xs font-bold text-[#7c3aed] uppercase tracking-[0.18em]">Comparison</span>
                  <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
                </div>
                <h2 id={`${title}-comparison`} className="text-3xl md:text-4xl font-extrabold text-[#0a1a25] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>MobiWave vs other providers in Kenya</h2>
                <p className="text-[#5b6b78] max-w-2xl mx-auto">A side-by-side look at how MobiWave compares on the things that matter for Kenyan organisations.</p>
              </div>

              <div className="animate-section mw-card p-2 sm:p-4 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Capability</TableHead>
                      {comparisonTable.headers.map((h) => (
                        <TableHead key={h} className={h === 'MobiWave' ? 'bg-[#0084ff]/5 text-[#0084ff]' : ''}>{h}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonTable.rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell className="font-medium text-[#0a1a25]">{row.name}</TableCell>
                        {row.cells.map((cell, i) => {
                          const text = typeof cell === 'string' ? cell : cell.text;
                          const highlight = typeof cell === 'string' ? false : cell.highlight;
                          return (
                            <TableCell key={i} className={highlight ? 'bg-[#0084ff]/5 font-semibold text-[#0a1a25]' : 'text-[#5b6b78]'}>
                              {text}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {comparisonTable.note && (
                <p className="text-xs text-[#5b6b78] text-center mt-4 animate-item">{comparisonTable.note}</p>
              )}
            </div>
          </section>
        )}

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

        {faqs && faqs.length > 0 && <FaqBlock faqs={faqs} title={title} />}

        <section className="py-14 bg-white md:py-20">
          <div className="container-custom">
            <Card
              className="relative overflow-hidden rounded-3xl border-0 p-0 gap-0"
              style={{ background: '#0a1a25' }}
            >
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
