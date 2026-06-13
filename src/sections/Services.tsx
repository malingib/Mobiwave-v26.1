import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MessageSquare, Mail, Smartphone, MessageCircle,
  Hash, CreditCard, Headphones, Gift, BarChart3, ArrowUpRight, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '@/hooks/useInView';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'bulk-sms',
    icon: MessageSquare,
    title: 'Bulk SMS',
    description: 'Reach millions of customers instantly with our enterprise-grade SMS platform. Enjoy 99.9% delivery rates, real-time analytics, and competitive pricing.',
    href: '/services/bulk-sms',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=320&fit=crop',
    iconBg: '#0084ff',
    category: 'Messaging',
  },
  {
    id: 'bulk-email',
    icon: Mail,
    title: 'Bulk Email',
    description: 'Send personalized email campaigns at scale with high deliverability rates and detailed analytics to optimize your campaigns.',
    href: '/services/bulk-email',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=320&fit=crop',
    iconBg: '#0068d6',
    category: 'Email',
  },
  {
    id: 'ussd',
    icon: Smartphone,
    title: 'USSD Services',
    description: 'Create interactive USSD menus for customer engagement without internet. Perfect for mobile banking, surveys, and information services.',
    href: '/services/ussd-codes',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=320&fit=crop',
    iconBg: '#1d8c89',
    category: 'USSD',
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    title: 'Bulk WhatsApp',
    description: 'Connect with customers on their favorite messaging platform. Send rich media messages, notifications, and provide customer support.',
    href: '/services/bulk-whatsapp',
    img: 'https://images.unsplash.com/photo-1611746869696-d09bce200020?w=600&h=320&fit=crop',
    iconBg: '#1ea6ff',
    category: 'Messaging',
  },
  {
    id: 'shortcodes',
    icon: Hash,
    title: 'SMS Shortcodes',
    description: 'Premium shortcode services for voting, surveys, and lead generation. Easy-to-remember numbers that drive customer engagement.',
    href: '/services/shortcodes',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=320&fit=crop',
    iconBg: '#0055ae',
    category: 'Acquisition',
  },
  {
    id: 'mpesa',
    icon: CreditCard,
    title: 'M-Pesa Integration',
    description: 'Seamless mobile payment integration for your business. Accept payments, disburse funds, and reconcile transactions automatically.',
    href: '/services/mpesa-integration',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=320&fit=crop',
    iconBg: '#1d8c89',
    category: 'Payments',
  },
  {
    id: 'service-desk',
    icon: Headphones,
    title: 'Customer Service Desk',
    description: 'Unified platform for managing customer interactions across all channels. Streamline support and improve response times significantly.',
    href: '/services/service-desk',
    img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=320&fit=crop',
    iconBg: '#0a1a25',
    category: 'Support',
  },
  {
    id: 'rewards',
    icon: Gift,
    title: 'Airtime & Data Rewards',
    description: 'Incentivize customers with instant airtime and data rewards. Perfect for promotions, referrals, and loyalty programs.',
    href: '/services/airtime-rewards',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=320&fit=crop',
    iconBg: '#0084ff',
    category: 'Loyalty',
  },
  {
    id: 'surveys',
    icon: BarChart3,
    title: 'SMS Survey Platform',
    description: 'Collect valuable feedback through SMS-based surveys. High response rates with real-time results and analytics.',
    href: '/services/sms-surveys',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=320&fit=crop',
    iconBg: '#36b8ff',
    category: 'Analytics',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [inViewElementRef, isInView] = useInView<HTMLElement>({ threshold: 0.05 });
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
        return;
      }
      if (window.innerWidth < 1200) {
        setItemsPerView(2);
        return;
      }
      setItemsPerView(3);
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  useEffect(() => {
    setStartIndex(0);
  }, [itemsPerView]);

  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 80%' } }
      );

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.svc-card');
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: gridRef.current, start: 'top 80%' } }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  const maxStartIndex = Math.max(0, services.length - itemsPerView);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < maxStartIndex;

  const showPrev = () => {
    setStartIndex((prev) => Math.max(0, prev - itemsPerView));
  };

  const showNext = () => {
    setStartIndex((prev) => Math.min(maxStartIndex, prev + itemsPerView));
  };

  const visibleServices = services.slice(startIndex, startIndex + itemsPerView);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        inViewElementRef.current = el;
      }}
      id="services"
      className="section-padding bg-white"
    >
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="section-label">Our Services</span>
          <h2 className="section-heading">
            Additional Services to{' '}
            <span className="gradient-text">Maximize Your Business</span>
          </h2>
          <p className="section-subtext max-w-2xl mx-auto">
            We provide next-generation communication tools to help your business
            connect with customers effectively at every touchpoint.
          </p>

        </div>

        {/* One-row slider (3 at a time) */}
        <div className="flex items-center gap-2 md:gap-3 lg:gap-5">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={showPrev}
            disabled={!canGoPrev}
            className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white disabled:opacity-40 shrink-0 size-9 md:size-10"
            aria-label="Previous services"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <div ref={gridRef} className={`grid gap-4 md:gap-6 lg:gap-8 flex-1 ${itemsPerView === 1 ? 'grid-cols-1' : itemsPerView === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {visibleServices.map((svc) => (
              <Card key={svc.id} className="svc-card service-card group p-0 h-full gap-0">
              {/* Image */}
              <div className="relative overflow-hidden h-44 sm:h-48 md:h-52">
                <img
                  src={svc.img}
                  alt={svc.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/600x320/${svc.iconBg.replace('#', '')}/ffffff?text=${encodeURIComponent(svc.title)}`;
                  }}
                />
                {/* Icon badge */}
                <div
                  className="absolute -bottom-5 left-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white"
                  style={{ background: svc.iconBg }}
                >
                  <svc.icon className="size-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <CardHeader className="pt-10 pb-3 px-5 sm:px-6">
                <Badge variant="secondary" className="w-fit uppercase tracking-wide">
                  {svc.category}
                </Badge>
                <CardTitle className="text-lg sm:text-xl leading-snug">{svc.title}</CardTitle>
                <span className="title-underline" />
              </CardHeader>
              <CardContent className="pt-0 pb-2 px-5 sm:px-6">
                <CardDescription className="text-sm sm:text-[0.95rem] leading-relaxed text-gray-500 min-h-[96px] sm:min-h-[112px] md:min-h-[120px]">{svc.description}</CardDescription>
              </CardContent>
              <CardFooter className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1">
                <Button asChild variant="link" className="read-more-link h-auto p-0">
                  <Link to={svc.href}>
                    Read More
                    <ArrowUpRight />
                  </Link>
                </Button>
              </CardFooter>
              </Card>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={showNext}
            disabled={!canGoNext}
            className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white disabled:opacity-40 shrink-0 size-9 md:size-10"
            aria-label="Next services"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
