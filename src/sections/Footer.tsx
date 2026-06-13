import { Cloud, Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Github } from 'lucide-react';

const productLinks = [
  { name: 'Bulk SMS', href: '#features' },
  { name: 'WhatsApp API', href: '#features' },
  { name: 'USSD Services', href: '#features' },
  { name: 'M-Pesa Integration', href: '#features' },
  { name: 'Voice & IVR', href: '#features' },
  { name: 'Analytics', href: '#features' },
];

const companyLinks = [
  { name: 'About Us', href: '#' },
  { name: 'Careers', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'Case Studies', href: '#testimonials' },
  { name: 'Partners', href: '#' },
  { name: 'Contact', href: '#cta' },
];

const resourceLinks = [
  { name: 'API Documentation', href: '#integrations' },
  { name: 'Help Center', href: '#faq' },
  { name: 'Status Page', href: '#' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Security', href: '#' },
  { name: 'Privacy Policy', href: '#' },
];

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-neutral-900 text-white relative overflow-hidden">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-green via-brand-orange to-brand-blue" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-brand rounded-xl">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                Mawingu<span className="text-brand-green"> Connect</span>
              </span>
            </a>
            <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
              Africa's most reliable cloud communication platform. Empowering businesses 
              to connect with millions across the continent.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:hello@mawinguconnect.co.ke"
                className="flex items-center gap-3 text-neutral-400 hover:text-brand-green transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                hello@mawinguconnect.co.ke
              </a>
              <a
                href="tel:+254700123456"
                className="flex items-center gap-3 text-neutral-400 hover:text-brand-green transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                +254 700 123 456
              </a>
              <div className="flex items-center gap-3 text-neutral-400 text-sm">
                <MapPin className="w-4 h-4" />
                Nairobi, Kenya
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-neutral-400 hover:text-brand-green transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-neutral-400 hover:text-brand-green transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-neutral-400 hover:text-brand-green transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm">
            © 2026 Mawingu Connect. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 text-neutral-400 hover:bg-brand-green hover:text-white transition-all duration-300"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
