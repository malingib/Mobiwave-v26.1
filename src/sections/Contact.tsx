import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useInView } from '@/hooks/useInView';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+254 736 427 842',
    href: 'tel:+254736427842'
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@mobiwave.co.ke',
    href: 'mailto:info@mobiwave.co.ke'
  },
  {
    icon: Clock,
    label: 'Office Hours',
    value: 'Monday–Friday, 9am–5pm',
    href: null
  }
];

const services = [
  'Get a Product',
  'Consultation',
  'Support',
  'Maintenance'
];

const products = [
  'Bulk SMS',
  'Bulk Email',
  'USSD Codes',
  'Short Codes',
  'M-Pesa Integration',
  'Survey',
  'Service Desk',
  'Bulk WhatsApp',
  'Airtime and Data Reward System'
];

interface ContactProps {
  embedded?: boolean;
}

export function Contact({ embedded = false }: ContactProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [inViewRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Content animations
      if (contentRef.current) {
        const heading = contentRef.current.querySelector('h2');
        const subheading = contentRef.current.querySelector('p');
        const cards = contentRef.current.querySelectorAll('.contact-card');

        gsap.fromTo(
          heading,
          { y: 40, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
            }
          }
        );

        gsap.fromTo(
          subheading,
          { y: 20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: subheading,
              start: 'top 85%',
            }
          }
        );

        gsap.fromTo(
          cards,
          { x: -50, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.5, 
            stagger: 0.1, 
            delay: 0.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cards[0],
              start: 'top 85%',
            }
          }
        );
      }

      // Form animation
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { scale: 0.9, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.6, 
            delay: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
            }
          }
        );

        const formFields = formRef.current.querySelectorAll('.form-field');
        gsap.fromTo(
          formFields,
          { y: 20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.4, 
            stagger: 0.1, 
            delay: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  if (embedded) {
    return (
      <form ref={formRef} onSubmit={handleSubmit} className="w-full" aria-label="Contact form">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-14 h-14 rounded-2xl bg-[#1d8c89]/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-7 h-7 text-[#1d8c89]" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Message sent</h4>
            <p className="text-white/55 text-sm text-center">We&apos;ll get back to you within an hour during business hours.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="form-field">
              <Label htmlFor="emb-name" className="text-white/80 text-sm">Name <span className="text-red-400">*</span></Label>
              <Input id="emb-name" placeholder="Your name" required className="mt-1.5 border-white/15 bg-white/10 text-white placeholder:text-white/40 focus:border-[#0084ff]" />
            </div>
            <div className="form-field">
              <Label htmlFor="emb-email" className="text-white/80 text-sm">Email <span className="text-red-400">*</span></Label>
              <Input id="emb-email" type="email" placeholder="you@company.co.ke" required className="mt-1.5 border-white/15 bg-white/10 text-white placeholder:text-white/40 focus:border-[#0084ff]" />
            </div>
            <div className="form-field">
              <Label htmlFor="emb-phone" className="text-white/80 text-sm">Phone</Label>
              <Input id="emb-phone" type="tel" placeholder="+254 7XX XXX XXX" className="mt-1.5 border-white/15 bg-white/10 text-white placeholder:text-white/40 focus:border-[#0084ff]" />
            </div>
            <div className="form-field">
              <Label htmlFor="emb-service" className="text-white/80 text-sm">Service <span className="text-red-400">*</span></Label>
              <Select required>
                <SelectTrigger id="emb-service" className="mt-1.5 border-white/15 bg-white/10 text-white">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <button type="submit" className="mw-btn-primary-solid w-full justify-center py-3.5">
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </div>
        )}
      </form>
    );
  }

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (inViewRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      id="contact"
      className={embedded ? 'relative overflow-hidden' : 'section-padding relative overflow-hidden'}
      style={{ background: embedded ? 'transparent' : '#f4f7fb' }}
    >
      {!embedded && (
        <>
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-40" style={{ background: 'rgba(0,132,255,0.06)' }} />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-30" style={{ background: 'rgba(29,140,137,0.08)' }} />
        </>
      )}

      <div className={embedded ? 'relative z-10 px-8 pb-8 md:px-12 md:pb-12' : 'container-custom relative z-10'}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <div ref={contentRef}>
            {!embedded && <span className="section-label">Get In Touch</span>}
            {!embedded && (
              <h2 className="section-heading">
                Have a Question?{' '}
                <span className="gradient-text">Write to Us!</span>
              </h2>
            )}
            <p className={embedded ? 'text-white/70 mb-10' : 'section-subtext mb-10'}>
              Get in touch with our team today to discuss how MobiWave Innovations 
              can help your business communicate more effectively with your customers.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className={`contact-card flex items-center gap-4 p-5 rounded-xl transition-all duration-300 group ${
                    embedded
                      ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                      : 'bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105" style={{ background: embedded ? 'rgba(96,165,250,0.16)' : 'rgba(0,132,255,0.08)' }}>
                    <item.icon className="w-5 h-5" style={{ color: '#0084ff' }} />
                  </div>
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${embedded ? 'text-white/50' : 'text-gray-400'}`}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className={`font-semibold text-sm transition-colors ${embedded ? 'text-white hover:text-[#60a5fa]' : 'text-gray-900 hover:text-blue-600'}`}>
                        {item.value}
                      </a>
                    ) : (
                      <div className={`font-semibold text-sm ${embedded ? 'text-white' : 'text-gray-900'}`}>{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`rounded-2xl p-8 ${embedded ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-100 shadow-sm'}`}
          >
            <h3 className={`text-2xl font-bold mb-6 text-center ${embedded ? 'text-white' : 'text-gray-900'}`}>
              Get in Touch
            </h3>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#1d8c89]/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-[#1d8c89]" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                <p className="text-gray-600 text-center">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="form-field">
                  <Label htmlFor="name" className={embedded ? 'text-white/80' : 'text-gray-700'}>
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    required
                    className={`mt-1.5 focus:border-[#0084ff] focus:ring-[#0084ff]/20 ${embedded ? 'border-white/15 bg-white/10 text-white placeholder:text-white/45' : 'border-gray-200'}`}
                  />
                </div>

                <div className="form-field">
                  <Label htmlFor="email" className={embedded ? 'text-white/80' : 'text-gray-700'}>
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    required
                    className={`mt-1.5 focus:border-[#0084ff] focus:ring-[#0084ff]/20 ${embedded ? 'border-white/15 bg-white/10 text-white placeholder:text-white/45' : 'border-gray-200'}`}
                  />
                </div>

                <div className="form-field">
                  <Label htmlFor="phone" className={embedded ? 'text-white/80' : 'text-gray-700'}>
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    className={`mt-1.5 focus:border-[#0084ff] focus:ring-[#0084ff]/20 ${embedded ? 'border-white/15 bg-white/10 text-white placeholder:text-white/45' : 'border-gray-200'}`}
                  />
                </div>

                <div className="form-field">
                  <Label htmlFor="service" className={embedded ? 'text-white/80' : 'text-gray-700'}>
                    Service <span className="text-red-500">*</span>
                  </Label>
                  <Select required>
                    <SelectTrigger className={`mt-1.5 focus:border-[#0084ff] focus:ring-[#0084ff]/20 ${embedded ? 'border-white/15 bg-white/10 text-white' : 'border-gray-200'}`}>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-field">
                  <Label htmlFor="product" className={embedded ? 'text-white/80' : 'text-gray-700'}>
                    Product <span className="text-red-500">*</span>
                  </Label>
                  <Select required>
                    <SelectTrigger className={`mt-1.5 focus:border-[#0084ff] focus:ring-[#0084ff]/20 ${embedded ? 'border-white/15 bg-white/10 text-white' : 'border-gray-200'}`}>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product} value={product.toLowerCase().replace(/\s+/g, '-')}>
                          {product}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-white font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ background: '#0084ff' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#0068d6')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#0084ff')}
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
