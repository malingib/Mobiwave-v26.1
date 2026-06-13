import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const solutionTracks = [
  {
    title: 'Build',
    items: [
      'Web development',
      'Systems development',
      'Mobile app development',
    ],
  },
  {
    title: 'Improve',
    items: [
      'Systems analysis and optimization',
      'Integrations and software modernization',
      'Performance and reliability tuning',
    ],
  },
  {
    title: 'Assure',
    items: [
      'Security audits',
      'Technical advisory',
      'Architecture and implementation guidance',
    ],
  },
];

const innovationProjects = [
  { name: 'Tewaw', href: 'https://tewaw.mobiwave.co.ke' },
  { name: 'Malanga Welfare', href: 'https://malangawelfare.org' },
  { name: 'RewardHub', href: 'https://mobiwavesrs.co.ke' },
  { name: 'Voting System', href: 'https://mobipoll.co.ke' },
  { name: 'JuaAfya', href: 'https://juaafya.co.ke' },
  { name: 'BID Logistics', href: 'https://bidlogistics.co.ke' },
  { name: 'Kilifi.go.ke', href: 'https://kilifi.go.ke', note: 'County Government of Kilifi' },
  { name: 'Imani CMS', note: 'Church management system • Coming Soon' },
  { name: 'eShule', note: 'School management system • Coming Soon' },
  { name: 'MobiWaveAI', href: 'https://mobiwaveai.co.ke', note: 'AI customer support' },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const [inViewElementRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 80%' } }
      );

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.pricing-card');
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' } }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        inViewElementRef.current = el;
      }}
      id="pricing"
      className="section-padding overflow-hidden bg-white"
    >
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="section-label">Innovatins Hub</span>
          <h2 className="section-heading">
            <span className="gradient-text">Innovatins Hub</span>
          </h2>
          <p className="section-subtext max-w-2xl mx-auto mb-8">
            We deliver custom enterprise solutions tailored to your organization.
            Tell us your goals and we will scope the right implementation approach.
          </p>
        </div>

        {/* Solutions Layout */}
        <div ref={cardsRef} className="max-w-6xl mx-auto">
          <Card
            className="pricing-card relative overflow-hidden rounded-3xl border-0 p-0 gap-0"
            style={{ background: '#0a1a25' }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background:
                  'radial-gradient(140% 80% at 10% 0%, rgba(0,132,255,0.35) 0%, rgba(0,132,255,0) 55%), radial-gradient(120% 70% at 100% 100%, rgba(29,140,137,0.28) 0%, rgba(29,140,137,0) 60%)',
              }}
            />

            <CardHeader className="relative z-10 p-8 md:p-12 pb-6">
              <Badge
                variant="outline"
                className="w-fit border-white/20 bg-white/5 text-white/80 uppercase tracking-[0.16em] text-[11px]"
              >
                Advisory + Delivery
              </Badge>
              <CardTitle className="text-3xl md:text-4xl font-extrabold mt-5 mb-2 text-white">
                Custom Enterprise Solutions
              </CardTitle>
              <CardDescription className="text-base text-white/70 max-w-3xl">
                End-to-end software services for organizations that need practical delivery, strong security,
                and long-term technical direction.
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 px-8 md:px-12 pb-10 md:pb-12">
              <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-8">
                {solutionTracks.map((track) => (
                  <div
                    key={track.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 backdrop-blur-[1px]"
                  >
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-300 mb-4">
                      {track.title}
                    </h3>
                    <ul className="space-y-3">
                      {track.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="mt-0.5 size-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <Check className="size-3 text-blue-300" />
                          </div>
                          <span className="text-sm text-white/85 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-7">
                  <a href="#contact">
                    Request Consultation
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white px-7"
                >
                  <a href="tel:+254736427842">Talk to an Expert</a>
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs uppercase tracking-[0.16em] text-white/55 mb-4">Live and Upcoming Projects</p>
                <div className="relative overflow-hidden">
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-14 z-10 bg-gradient-to-r from-[#0a1a25] to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-14 z-10 bg-gradient-to-l from-[#0a1a25] to-transparent" />
                  <div
                    className="flex w-max gap-3"
                    style={{ animation: 'scroll-left 34s linear infinite' }}
                  >
                    {[...innovationProjects, ...innovationProjects].map((project, index) => (
                      <div
                        key={`${project.name}-${index}`}
                        className="shrink-0 rounded-full border border-white/15 bg-white/5 px-4 py-2.5"
                      >
                        {project.href ? (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-semibold text-white hover:text-blue-300 transition-colors"
                          >
                            {project.name}
                          </a>
                        ) : (
                          <span className="text-sm font-semibold text-white/95">{project.name}</span>
                        )}
                        {project.note && (
                          <span className="ml-2 text-xs text-white/60">{project.note}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Need a tailored roadmap for web, mobile, integrations, or security?{' '}
          <a href="#contact" className="text-blue-600 hover:underline">Speak with our solutions team.</a>
        </p>
      </div>
    </section>
  );
}
