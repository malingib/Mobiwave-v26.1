import { useState, useEffect } from 'react';
import { Menu, Cloud, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

const navLinks = [
  { name: 'Products', href: '#features' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Developers', href: '#integrations' },
  { name: 'Company', href: '#testimonials' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-brand-dark/90 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-brand rounded-xl shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}>
              Mawingu
              <span className="text-brand-green"> Connect</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-brand-green group ${
                  isScrolled ? 'text-foreground' : 'text-white/90'
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="ghost"
              className={`text-sm font-medium ${
                isScrolled
                  ? 'text-foreground hover:text-brand-green'
                  : 'text-white hover:text-white/80'
              }`}
              onClick={() => scrollToSection('#cta')}
            >
              Sign In
            </Button>
            <Button
              className="bg-brand-green hover:bg-brand-green/90 text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
              onClick={() => scrollToSection('#pricing')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={isScrolled ? 'text-foreground' : 'text-white'}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 bg-background">
              <div className="flex flex-col h-full pt-8">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-10 h-10 flex items-center justify-center bg-gradient-brand rounded-xl">
                    <Cloud className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold">
                    Mawingu<span className="text-brand-green"> Connect</span>
                  </span>
                </div>

                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="flex items-center justify-between px-4 py-3 text-left text-foreground hover:bg-muted rounded-lg transition-colors"
                      >
                        {link.name}
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                      </button>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto pb-8 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => scrollToSection('#cta')}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full bg-brand-green hover:bg-brand-green/90 text-white"
                    onClick={() => scrollToSection('#pricing')}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
