import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Innovations', href: '/innovations' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Our Services', href: '/services' },
];

const resources = [
  { label: 'Bulk SMS', href: '/services/bulk-sms' },
  { label: 'Bulk Email', href: '/services/bulk-email' },
  { label: 'USSD Services', href: '/services/ussd-codes' },
  { label: 'M-Pesa Integration', href: '/services/mpesa-integration' },
  { label: 'Airtime & Rewards', href: '/services/airtime-rewards' },
];

const legal = [
  { label: 'Terms of Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
];

export function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [inViewRef, isInView] = useInView<HTMLElement>({ threshold: 0.05 });
  const location = useLocation();

  useEffect(() => {
    if (!isInView || !footerRef.current) return;

    const ctx = gsap.context(() => {
      const items = footerRef.current?.querySelectorAll('.ft-animate');
      if (items) {
        gsap.fromTo(items,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: footerRef.current, start: 'top 90%' } }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, [isInView]);

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (href: string) =>
    `text-sm transition-colors duration-200 ${isActive(href) ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`;

  return (
    <footer
      ref={(el) => {
        (footerRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (inViewRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      style={{ background: '#0a1a25' }}
      className="text-white pt-16 pb-8"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="ft-animate lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-4 rounded-xl bg-white px-3 py-2">
              <img
                src="/branding/mw-logo.svg"
                alt="MobiWave Innovations"
                className="h-9 w-auto"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              MobiWave is a Kenyan technology company helping organizations scale trusted communication
              through SMS, USSD, WhatsApp, and integrated payment experiences.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: 'https://facebook.com' },
                { icon: Instagram, href: 'https://instagram.com' },
                { icon: Linkedin, href: 'https://linkedin.com' },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#0084ff')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="ft-animate">
            <h4 className="font-semibold text-white mb-5 text-base">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={linkClass(link.href)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-animate">
            <h4 className="font-semibold text-white mb-5 text-base">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={linkClass(link.href)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-animate">
            <h4 className="font-semibold text-white mb-5 text-base">Legal</h4>
            <ul className="space-y-3 mb-8">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={linkClass(link.href)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="text-gray-400 text-sm mb-3">
              Subscribe to our newsletter for the latest updates
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-white/10 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{ background: '#0084ff' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0068d6')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0084ff')}
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>

        <div className="ft-animate pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MobiWave Innovations Ltd. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Nairobi, Kenya · +254 736 427 842 · info@mobiwave.co.ke
          </p>
        </div>
      </div>
    </footer>
  );
}
