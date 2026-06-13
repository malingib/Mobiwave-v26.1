import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'How quickly can I get started?',
    answer:
      'You can sign up and start sending messages in under 5 minutes. Our quick-start guides and API documentation make integration seamless. For M-Pesa integration, you\'ll need a valid shortcode from Safaricom, which we can help you obtain.',
  },
  {
    question: 'What are the delivery rates?',
    answer:
      'We maintain a 99.9% delivery rate across all major Kenyan networks (Safaricom, Airtel, Telkom). Real-time delivery reports keep you informed of every message status, and our direct carrier connections ensure the fastest delivery times.',
  },
  {
    question: 'Is there a minimum commitment?',
    answer:
      'No minimum contracts or commitments. Pay for what you use, scale up or down anytime. Starter plans work on a pay-as-you-go basis, while Pro and Enterprise plans offer volume discounts for larger messaging needs.',
  },
  {
    question: 'How does M-Pesa integration work?',
    answer:
      'Our STK Push API allows you to initiate payments directly from your platform. Customers receive a popup on their phone to enter their M-Pesa PIN. We support C2B (Customer to Business), B2C (Business to Customer), and B2B (Business to Business) transactions.',
  },
  {
    question: 'Can I schedule messages?',
    answer:
      'Yes, schedule SMS, email, and WhatsApp messages for future delivery. Set up recurring campaigns and automated triggers based on user actions. Our campaign scheduler lets you plan weeks or months in advance.',
  },
  {
    question: 'What support options are available?',
    answer:
      'Starter plans get email support with 24-hour response time. Pro plans include priority chat support with 4-hour response. Enterprise customers receive 24/7 phone support and a dedicated account manager for strategic guidance.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.faq-item',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.faq-accordion',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-24 bg-background"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="faq-header text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-orange/10 text-brand-orange text-sm font-medium rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about Mawingu Connect
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="faq-accordion space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="faq-item bg-card rounded-xl border border-border px-6 data-[state=open]:border-brand-green/30 transition-colors"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-brand-green py-5 text-base font-medium [&[data-state=open]>svg]:rotate-45">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <a
            href="#cta"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-brand-green hover:text-brand-green/80 font-medium transition-colors"
          >
            Contact our team
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
