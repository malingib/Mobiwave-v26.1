import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageBanner } from './PageBanner';
import { Breadcrumbs } from './Breadcrumbs';
import { trackEvent } from '@/lib/analytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FaqBlock } from './ServicePageLayout';

gsap.registerPlugin(ScrollTrigger);

interface GuideStep {
  step: string;
  title: string;
  description: string;
}

interface GuideComparisonRow {
  name: string;
  cells: (string | { text: string; highlight?: boolean })[];
}

interface GuidePageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  breadcrumbLabel: string;
  updated?: string;
  intro?: string;
  steps?: GuideStep[];
  checklist?: string[];
  comparison?: {
    headers: string[];
    rows: GuideComparisonRow[];
    note?: string;
  };
  faqs: { question: string; answer: string }[];
  ctaTitle?: string;
  ctaDescription?: string;
  relatedRoutes?: { label: string; href: string }[];
}

function StepBlock({ steps }: { steps: GuideStep[] }) {
  return (
    <section className="section-padding mw-section-surface" aria-labelledby="guide-steps">
      <div className="container-custom">
        <div className="text-center mb-12 animate-section animate-item">
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
            <span className="text-xs font-bold text-[#7c3aed] uppercase tracking-[0.18em]">Step by Step</span>
            <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
          </div>
          <h2 id="guide-steps" className="text-3xl md:text-4xl font-extrabold text-[#0a1a25] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            How to do it in Kenya
          </h2>
          <p className="text-[#5b6b78] max-w-2xl mx-auto">
            A practical, compliance-aware walkthrough you can follow today.
          </p>
        </div>

        <ol className="grid md:grid-cols-2 gap-4 animate-section max-w-5xl mx-auto">
          {steps.map((item) => (
            <li key={item.step} className="animate-item mw-card p-5 flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0084ff] to-[#1d8c89] text-white font-bold" aria-hidden="true">{item.step}</span>
              <div>
                <h3 className="text-lg font-bold text-[#0a1a25] mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{item.title}</h3>
                <p className="text-[#5b6b78] text-sm leading-relaxed">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ChecklistBlock({ items }: { items: string[] }) {
  return (
    <section className="section-padding" aria-labelledby="guide-checklist">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto animate-section">
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
            <span className="text-xs font-bold text-[#7c3aed] uppercase tracking-[0.18em]">Checklist</span>
            <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
          </div>
          <h2 id="guide-checklist" className="text-3xl md:text-4xl font-extrabold text-[#0a1a25] mb-4 text-center" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Before you start
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mt-8">
            {items.map((item, index) => (
              <div key={index} className="animate-item mw-card flex items-start gap-3 px-4 py-3.5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0084ff] to-[#1d8c89] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-base sm:text-lg font-medium leading-snug text-[#0a1a25]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonBlock({ comparison }: { comparison: NonNullable<GuidePageLayoutProps['comparison']> }) {
  return (
    <section className="section-padding mw-section-surface" aria-labelledby="guide-comparison">
      <div className="container-custom">
        <div className="text-center mb-10 animate-section animate-item">
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
            <span className="text-xs font-bold text-[#7c3aed] uppercase tracking-[0.18em]">Comparison</span>
            <div className="w-7 h-0.5 rounded-full bg-[#1d8c89]" />
          </div>
          <h2 id="guide-comparison" className="text-3xl md:text-4xl font-extrabold text-[#0a1a25] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            How the options compare
          </h2>
          <p className="text-[#5b6b78] max-w-2xl mx-auto">
            The factors that matter for a Kenyan organisation deciding between providers.
          </p>
        </div>

        <div className="animate-section mw-card p-2 sm:p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Factor</TableHead>
                {comparison.headers.map((h) => (
                  <TableHead key={h} className={h === 'MobiWave' ? 'bg-[#0084ff]/5 text-[#0084ff]' : ''}>{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparison.rows.map((row) => (
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
        {comparison.note && (
          <p className="text-xs text-[#5b6b78] text-center mt-4 animate-item">{comparison.note}</p>
        )}
      </div>
    </section>
  );
}

export function GuidePageLayout({
  title,
  subtitle,
  description,
  breadcrumbLabel,
  updated,
  intro,
  steps,
  checklist,
  comparison,
  faqs,
  ctaTitle,
  ctaDescription,
  relatedRoutes
}: GuidePageLayoutProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const contactItems = [
    { icon: Phone, label: 'Phone', value: '+254 736 427 842', href: 'tel:+254****7842' },
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
            scrollTrigger: { trigger: section, start: 'top 80%' }
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageBanner title={title} subtitle={subtitle} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: breadcrumbLabel }]} />

      <div ref={contentRef}>
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto animate-section animate-item">
              <p className="text-[#5b6b78] text-lg leading-relaxed mb-6">{description}</p>
              {updated && (
                <p className="text-xs text-[#9aa8b2] uppercase tracking-wider mb-6">Last updated {updated}</p>
              )}
              {intro && (
                <div className="mw-card p-6 mb-6">
                  <p className="text-[#0a1a25] leading-relaxed">{intro}</p>
                </div>
              )}
              <a
                href="/contact"
                className="mw-btn-primary-solid"
                onClick={() => trackEvent('guide_cta_click', { guide: title, location: 'intro' })}
              >
                Talk to MobiWave <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {checklist && checklist.length > 0 && <ChecklistBlock items={checklist} />}
        {steps && steps.length > 0 && <StepBlock steps={steps} />}
        {comparison && comparison.rows.length > 0 && <ComparisonBlock comparison={comparison} />}

        <FaqBlock faqs={faqs} title={title} />

        {relatedRoutes && relatedRoutes.length > 0 && (
          <section className="section-padding mw-section-surface">
            <div className="container-custom">
              <div className="text-center mb-10 animate-section animate-item">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1a25] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Related resources
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto animate-section">
                {relatedRoutes.map((r) => (
                  <Link
                    key={r.href}
                    to={r.href}
                    className="animate-item mw-card p-5 flex items-center justify-between gap-3 hover:border-[#0084ff]/40 transition-colors"
                  >
                    <span className="font-bold text-[#0a1a25]">{r.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#0084ff]" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-white">
          <div className="container-custom">
            <Card className="relative overflow-hidden rounded-3xl border-0 p-0 gap-0" style={{ background: '#0a1a25' }}>
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #0084ff, transparent)', transform: 'translate(30%, -30%)' }} />
              <CardHeader className="relative z-10 p-6 sm:p-8 md:p-12 pb-0">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
                  <div className="max-w-xl">
                    <Badge variant="outline" className="section-label-white mb-4 border-white/20 text-white/90">Get Started</Badge>
                    <CardTitle className="section-heading-white mb-4">
                      {ctaTitle ?? `Ready to get started with ${title}?`}
                    </CardTitle>
                    <p className="text-white/60 text-lg">
                      {ctaDescription ?? 'Talk to our team about the fastest, compliant path for your organisation.'}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full lg:w-auto">
                    <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-500 text-base">
                      <a href="/contact">Send Message <ArrowRight data-icon="inline-end" /></a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                      <a href="tel:+254****7842">Call Us Now</a>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4 p-6 sm:p-8 pt-0 md:px-12 md:pb-12">
                {contactItems.map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                      <item.icon className="h-5 w-5 text-[#60a5fa]" />
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-white font-semibold hover:text-[#60a5fa] transition-colors">{item.value}</a>
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
