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
        isActive(href) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
      }`}
    >
      {label}
      {isActive(href) && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full bg-blue-600" />
      )}
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`transition-all duration-400 overflow-hidden ${
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        }`}
        style={{ background: '#0a1a25' }}
      >
        <div className="container-custom flex justify-between items-center py-2 text-sm">
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
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] py-3'
            : 'bg-white py-4'
        }`}
      >
        <div className="container-custom flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/branding/mw-logo.svg"
              alt="MobiWave Innovations"
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
              loading="eager"
              decoding="async"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navLink('/', 'Home')}

            <div className="relative pb-4 -mb-4"
              onMouseEnter={openServicesMenu}
              onMouseLeave={closeServicesMenu}
            >
              <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                location.pathname.startsWith('/services') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}>
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 pt-4 z-50">
                  <div className="w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2"
                    style={{ minWidth: 220 }}>
                    {services.map((s) => (
                      <Link key={s.href} to={s.href}
                        className={`block px-4 py-2.5 text-sm transition-colors ${
                          isActive(s.href) ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
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

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://sms.mobiwave.co.ke/login"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200"
              style={{ borderColor: '#0084ff', color: '#0084ff' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#0084ff';
                (e.currentTarget as HTMLElement).style.color = 'white';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = '#0084ff';
              }}
            >
              SMS Platform
            </a>
            <a
              href="https://rewards.mobiwave.co.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
              style={{ background: '#0a1a25' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#0084ff')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#0a1a25')}
            >
              Rewards Platform
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
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
          className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 transition-all duration-300 ${
          isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}>
          <div className="container-custom py-4 max-h-[calc(100dvh-72px)] overflow-y-auto flex flex-col gap-1">
            <Link to="/" className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>Home</Link>

            <div className="px-1 py-1">
              <button
                type="button"
                onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                className="w-full flex items-center justify-between py-3 px-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
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
                      <Link key={s.href} to={s.href} className={`block py-2.5 px-3 rounded-lg text-sm transition-colors ${isActive(s.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'}`}>{s.label}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link to="/pricing" className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${isActive('/pricing') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>Pricing</Link>
            <Link to="/innovations" className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${isActive('/innovations') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>Innovations</Link>
            <Link to="/about" className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${isActive('/about') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>About Us</Link>
            <Link to="/contact" className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${isActive('/contact') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>Contact Us</Link>

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
