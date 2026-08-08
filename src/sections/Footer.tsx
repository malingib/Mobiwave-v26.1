import { Link, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { useState, type ReactNode } from 'react';

const resourceLinks = [
  { label: 'API Documentation', href: '/developers/docs' },
  { label: 'Bulk SMS', href: '/services/bulk-sms' },
  { label: 'M-Pesa Integration', href: '/services/mpesa-integration' },
  { label: 'USSD Services', href: '/services/ussd-codes' },
  { label: 'WhatsApp', href: '/services/bulk-whatsapp' },
  { label: 'Technical Enquiries', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Customer Support', href: '/contact' },
  { label: 'Contact Us', href: '/contact' },
];

const socials = [
  { label: 'Twitter', href: 'https://x.com/mobiwave_ke', icon: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z' },
  { label: 'LinkedIn', href:           'https://www.linkedin.com/company/mobiwave-kenya', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { label: 'Facebook', href:           'https://www.facebook.com/p/MobiWave-Innovations-Ltd-61569833317922/', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label: 'Instagram', href: 'https://instagram.com/mobiwave_ke', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
];

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3
        className="relative mb-5 pb-2 text-sm font-bold text-[#172333]"
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        {title}
        <span className="absolute bottom-0 left-0 h-0.5 w-8 rounded-full bg-[#7566cf]" />
      </h3>
      {children}
    </div>
  );
}

export function Footer() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [email, setEmail] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#172333]/10 bg-white pb-8 pt-16">

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 gap-10 border-b border-[#172333]/10 pb-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 mb-5">
              <img src="/branding/mw-logo.svg" alt="MobiWave" className="h-9 w-auto" loading="lazy" />
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-[#586273]">
              Kilifi-based communication platform built for Kenyan organisations.
              Bulk SMS, email, WhatsApp, USSD, and M-Pesa integration.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#172333]/10 bg-[#f7f7fc] text-[#586273] transition-all duration-300 hover:border-[#176fe8] hover:bg-[#176fe8] hover:text-white"
                  aria-label={s.label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <FooterColumn title="Resources">
              <ul className="space-y-2.5">
                {resourceLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className={`text-sm transition-colors duration-200 hover:text-[#36b8ff] ${
                        isActive(l.href) ? 'font-medium text-[#176fe8]' : 'text-[#586273]'
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>

          <div className="md:col-span-3">
            <FooterColumn title="Quick Links">
              <ul className="space-y-2.5">
                {legalLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-[#586273] transition-colors duration-200 hover:text-[#176fe8]">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>

          <div className="md:col-span-3">
            <FooterColumn title="Newsletter">
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#172333]/15 bg-white px-4 py-3 text-sm text-[#172333] placeholder:text-[#586273]/60 transition-colors focus:border-[#176fe8] focus:outline-none focus:ring-1 focus:ring-[#176fe8]/20"
                />
                <button type="submit" className="mw-btn-primary-solid w-full justify-center">
                  Subscribe
                </button>
              </form>
            </FooterColumn>
          </div>
        </div>

        <p className="pt-8 text-center text-sm text-[#586273]">
          &copy; {new Date().getFullYear()}{' '}
          <Link to="/" className="text-[#172333] transition-colors hover:text-[#176fe8]">
            MobiWave Innovations Ltd
          </Link>
          {' '}— Kilifi, Kenya
        </p>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#176fe8] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#0f5ec9]"
        style={{ boxShadow: '0 4px 20px rgba(0,132,255,0.35)' }}
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
}
