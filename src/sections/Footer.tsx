import { Link, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { useState } from 'react';

const resourceLinks = [
  { label: 'Bulk SMS', href: '/services/bulk-sms' },
  { label: 'M-Pesa Integration', href: '/services/mpesa-integration' },
  { label: 'USSD Services', href: '/services/ussd-codes' },
  { label: 'WhatsApp', href: '/services/bulk-whatsapp' },
  { label: 'API Docs', href: '#' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '#' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Customer Support', href: '/contact' },
  { label: 'Contact Us', href: '/contact' },
];

const socials = [
  { label: 'Twitter', href: 'https://x.com/mobiwave_ke', icon: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z' },
  { label: 'LinkedIn', href: 'https://ke.linkedin.com/company/mobiwave', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { label: 'Facebook', href: 'https://facebook.com/mobiwave', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label: 'Instagram', href: 'https://instagram.com/mobiwave_ke', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
];

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
    <footer className="relative overflow-hidden" style={{ background: '#0a1a25' }}>
      {/* Subtle background shape */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0,132,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(108,92,231,0.2) 0%, transparent 40%)',
        }}
      />

      <div className="container-custom relative z-10 pt-16 pb-8">
        {/* White card container */}
        <div
          className="rounded-2xl p-8 md:p-12 mb-8"
          style={{
            background: '#fff',
            boxShadow: '0 4px 40px rgba(0,0,0,0.15)',
            backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(0,132,255,0.03) 0%, transparent 40%)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Col 1 — Brand + Socials */}
            <div className="md:col-span-4">
              <Link to="/" className="inline-flex items-center gap-3 mb-5">
                <img src="/branding/mw-logo.svg" alt="MobiWave" className="h-9 w-auto" loading="lazy" />
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">
                Nairobi-based communication platform built for Kenyan organisations.
                Bulk SMS, email, WhatsApp, USSD, and M-Pesa integration.
              </p>
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ background: '#eef0f5', color: '#666' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#0084ff';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#eef0f5';
                      e.currentTarget.style.color = '#666';
                    }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={s.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Company Links */}
            <div className="md:col-span-2">
              <h3
                className="text-base font-bold mb-5 pb-2 relative"
                style={{ fontFamily: 'Outfit, sans-serif', color: '#0a1a25' }}
              >
                Resources
                <span
                  className="absolute bottom-0 left-0 w-10 h-0.5 rounded-full"
                  style={{ background: '#6c5ce7' }}
                />
              </h3>
              <ul className="space-y-2.5">
                {resourceLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className={`text-sm transition-colors duration-200 hover:translate-x-1 inline-block ${
                        isActive(l.href) ? 'text-[#0084ff] font-medium' : 'text-gray-500 hover:text-[#0084ff]'
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Quick Links */}
            <div className="md:col-span-3">
              <h3
                className="text-base font-bold mb-5 pb-2 relative"
                style={{ fontFamily: 'Outfit, sans-serif', color: '#0a1a25' }}
              >
                Quick Links
                <span
                  className="absolute bottom-0 left-0 w-10 h-0.5 rounded-full"
                  style={{ background: '#6c5ce7' }}
                />
              </h3>
              <ul className="space-y-2.5">
                {legalLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-gray-500 hover:text-[#0084ff] transition-colors duration-200"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Newsletter */}
            <div className="md:col-span-3">
              <h3
                className="text-base font-bold mb-5 pb-2 relative"
                style={{ fontFamily: 'Outfit, sans-serif', color: '#0a1a25' }}
              >
                Subscribe Newsletter
                <span
                  className="absolute bottom-0 left-0 w-10 h-0.5 rounded-full"
                  style={{ background: '#6c5ce7' }}
                />
              </h3>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#0084ff] focus:ring-1 focus:ring-[#0084ff]/20 transition-colors"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{
                    background: '#1d8c89',
                    color: '#fff',
                    fontFamily: 'Outfit, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#17a085';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(29,140,137,0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#1d8c89';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-sm text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>
          &copy; {new Date().getFullYear()} All Copyright by{' '}
          <Link to="/" className="hover:text-[#1d8c89] transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }}>
            MobiWave Innovations Ltd
          </Link>{' '}
          &mdash; Nairobi, Kenya
        </p>
      </div>

      {/* Floating back-to-top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-[#0084ff] text-white flex items-center justify-center shadow-lg hover:bg-[#0068d6] transition-colors"
        style={{ boxShadow: '0 4px 20px rgba(0,132,255,0.35)' }}
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
}
