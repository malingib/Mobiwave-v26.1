import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';

const services = [
  { label: 'Bulk SMS', href: '/services/bulk-sms' },
  { label: 'Bulk Email', href: '/services/bulk-email' },
  { label: 'Bulk WhatsApp', href: '/services/bulk-whatsapp' },
  { label: 'USSD Codes', href: '/services/ussd-codes' },
  { label: 'Shortcodes', href: '/services/shortcodes' },
  { label: 'M-Pesa Integration', href: '/services/mpesa-integration' },
  { label: 'SMS Surveys', href: '/services/sms-surveys' },
  { label: 'Airtime Rewards', href: '/services/airtime-rewards' },
  { label: 'Service Desk', href: '/services/service-desk' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const servicesCloseTimerRef = useRef<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
  }, [location]);

  useEffect(() => {
    return () => {
      if (servicesCloseTimerRef.current) window.clearTimeout(servicesCloseTimerRef.current);
    };
  }, []);

  const openServicesMenu = () => {
    if (servicesCloseTimerRef.current) {
      window.clearTimeout(servicesCloseTimerRef.current);
      servicesCloseTimerRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const closeServicesMenu = () => {
    servicesCloseTimerRef.current = window.setTimeout(() => {
      setIsServicesOpen(false);
    }, 320);
  };

  const isActive = (path: string) => location.pathname === path;

  const navLink = (href: string, label: string) => (
    <Link
      to={href}
      className={`relative text-sm font-medium transition-colors ${
        'text-white hover:text-white'
      }`}
    >
      {label}
      {isActive(href) && (
        <span className="absolute -bottom-1 left-0 w-full h-px rounded-full bg-white/55" />
      )}
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-0 sm:pt-0">
      <div
        className={`hidden md:block w-full transition-all duration-400 overflow-hidden ${
          isScrolled ? 'max-h-0 opacity-0 -translate-y-2' : 'max-h-10 opacity-100 translate-y-0'
        }`}
        style={{
          background: '#0a1a25',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-8 px-5 py-2 text-sm text-white/80 lg:px-8">
          <div className="flex items-center gap-5">
            <a href="tel:+254736427842" className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" />
              +254 736 427 842
            </a>
            <a href="mailto:info@mobiwave.co.ke" className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" />
              info@mobiwave.co.ke
            </a>
          </div>
          <div className="flex items-center gap-4 text-white/60 text-xs">
            <span>Mon–Fri · 9am–5pm EAT</span>
          </div>
        </div>
      </div>

      <nav
        className={`relative mt-1.5 w-full max-w-xl px-2 transition-all duration-300 sm:mt-2 sm:px-4 lg:max-w-fit ${
          isScrolled ? 'translate-y-0' : 'translate-y-0'
        }`}
      >
        <div
          className={`relative mx-auto flex w-full max-w-xl items-center justify-between gap-3 overflow-hidden rounded-[26px] border px-4 py-2.5 shadow-[0_16px_40px_rgba(4,16,28,0.18)] transition-all duration-300 sm:px-5 sm:py-2.5 lg:w-auto lg:max-w-fit lg:gap-4 ${
            isScrolled
              ? 'border-white/12 bg-[rgba(10,30,43,0.76)] backdrop-blur-md'
              : 'border-white/10 bg-[rgba(9,27,39,0.64)] backdrop-blur-md'
          }`}
          style={{
            boxShadow: '0 16px 40px rgba(4,16,28,0.18), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <Link to="/" className="flex items-center gap-2.5 pr-2 group">
            <img
              src="/branding/mw-logo.svg"
              alt="MobiWave Innovations"
              className="h-8 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
              loading="eager"
              decoding="async"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-5 px-1.5">
            {navLink('/', 'Home')}

            <div className="relative pb-4 -mb-4"
              onMouseEnter={openServicesMenu}
              onMouseLeave={closeServicesMenu}
            >
              <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                'text-white hover:text-white'
              }`}>
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 pt-4 z-50">
                  <div className="w-56 rounded-2xl border border-white/10 bg-[rgba(8,24,35,0.94)] py-2 shadow-[0_18px_40px_rgba(10,26,37,0.22)]"
                    style={{ minWidth: 220 }}>
                    {services.map((s) => (
                      <Link key={s.href} to={s.href}
                        className={`block px-4 py-2.5 text-sm transition-colors ${
                          isActive(s.href) ? 'bg-white/10 text-white' : 'text-white/75 hover:bg-white/8 hover:text-white'
                        }`}>
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLink('/pricing', 'Pricing')}
            {navLink('/innovations', 'Innovations')}
            {navLink('/about', 'About Us')}

            {navLink('/contact', 'Contact Us')}
          </div>

          <div className="hidden lg:flex items-center gap-2 pl-1">
            <a
              href="https://sms.mobiwave.co.ke/login"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full border text-sm font-semibold text-white transition-all duration-200 hover:bg-white/8"
              style={{ borderColor: 'rgba(255,255,255,0.12)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLElement).style.color = 'white';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.88)';
              }}
            >
              SMS Platform
            </a>
            <a
              href="https://rewards.mobiwave.co.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full border text-sm font-semibold text-white transition-all duration-200"
              style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)')}
            >
              Rewards Platform
            </a>
          </div>

          <button
            className="lg:hidden rounded-full p-2 text-white/90 hover:bg-white/10 hover:text-white transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`lg:hidden absolute top-full left-1/2 mt-2 w-full max-w-xl -translate-x-1/2 rounded-[26px] border border-white/10 bg-[rgba(9,27,39,0.88)] shadow-[0_16px_40px_rgba(4,16,28,0.18)] backdrop-blur-md transition-all duration-300 ${
          isMobileOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-2'
        }`}>
          <div className="max-h-[calc(100dvh-96px)] overflow-y-auto px-4 py-4 flex flex-col gap-1">
            <Link to="/" className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${isActive('/') ? 'bg-white/18 text-white' : 'text-white/90 hover:bg-white/10'}`}>Home</Link>

            <div className="px-1 py-1">
              <button
                type="button"
                onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                className="w-full flex items-center justify-between py-3 px-3 rounded-xl text-base font-medium text-white/90 hover:bg-white/10 transition-colors"
                aria-expanded={isMobileServicesOpen}
                aria-controls="mobile-services-list"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <div
                id="mobile-services-list"
                className={`grid transition-all duration-300 ${
                  isMobileServicesOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pl-3 pr-1 pb-2 pt-1 space-y-1">
                    {services.map((s) => (
                      <Link key={s.href} to={s.href} className={`block py-2.5 px-3 rounded-lg text-sm transition-colors ${isActive(s.href) ? 'bg-white/18 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}>{s.label}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link to="/pricing" className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${isActive('/pricing') ? 'bg-white/18 text-white' : 'text-white/90 hover:bg-white/10'}`}>Pricing</Link>
            <Link to="/innovations" className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${isActive('/innovations') ? 'bg-white/18 text-white' : 'text-white/90 hover:bg-white/10'}`}>Innovations</Link>
            <Link to="/about" className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${isActive('/about') ? 'bg-white/18 text-white' : 'text-white/90 hover:bg-white/10'}`}>About Us</Link>
            <Link to="/contact" className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${isActive('/contact') ? 'bg-white/18 text-white' : 'text-white/90 hover:bg-white/10'}`}>Contact Us</Link>

            <div className="flex flex-col gap-3 pt-4 border-t mt-2">
              <a href="https://sms.mobiwave.co.ke/login" target="_blank" rel="noopener noreferrer"
                className="w-full py-3 rounded-xl border border-blue-600 text-blue-600 text-sm font-semibold text-center">
                SMS Platform
              </a>
              <a href="https://rewards.mobiwave.co.ke" target="_blank" rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-white text-sm font-semibold text-center"
                style={{ background: '#0a1a25' }}>
                Rewards Platform
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
