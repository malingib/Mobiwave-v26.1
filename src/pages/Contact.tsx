import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PageBanner } from '@/components/PageBanner';
import { submitContactForm } from '@/lib/contact-form';
import { trackEvent } from '@/lib/analytics';

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
    icon: MapPin,
    label: 'Address',
    value: 'Titanic Building, 1st Floor, Room 2, Biashara Street, Kilifi',
    href: null
  },
  {
    icon: Clock,
    label: 'Office Hours',
    value: 'Monday - Friday, 9am - 5pm',
    href: null
  }
];

const inquiryTypes = [
  'General Inquiry',
  'Sales',
  'Support',
  'Partnership',
  'Custom Solution'
];

const subjects = [
  'Bulk SMS',
  'Bulk Email',
  'Bulk WhatsApp',
  'USSD Codes',
  'Shortcodes',
  'M-Pesa Integration',
  'SMS Surveys',
  'Airtime Rewards',
  'Service Desk',
  'Other'
];

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formStartedRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
            }
          }
        );
      }
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current.querySelectorAll('.info-card'),
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 80%',
            }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitContactForm(e.currentTarget);
      trackEvent('form_success', { form_location: 'contact_page' });
      trackEvent('generate_lead', { form_location: 'contact_page', lead_type: 'contact_form' });
      setIsSubmitted(true);
    } catch {
      trackEvent('form_error', { form_location: 'contact_page' });
      setSubmitError('We could not send your message. Please call +254 736 427 842 or email info@mobiwave.co.ke.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageBanner
        title="Contact Us"
        subtitle="Have questions or need assistance? Our team is here to help. Reach out to us through any of the channels below."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have a question about our services? Need a custom solution? Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div ref={infoRef} className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="info-card flex items-start gap-4 border-b border-gray-200 py-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-[#0084ff]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-medium text-gray-900 hover:text-[#0084ff] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium text-gray-900">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <form
              ref={formRef}
              onFocusCapture={() => {
                if (formStartedRef.current) return;
                formStartedRef.current = true;
                trackEvent('form_start', { form_location: 'contact_page' });
              }}
              onSubmit={handleSubmit}
              className="lg:col-span-2 border border-gray-200 p-6 sm:p-8"
            >
              <input type="hidden" name="formType" value="contact-page" />
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#1d8c89]/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-[#1d8c89]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 text-center">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="mt-2"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                        <Select name="subject" required>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject.toLowerCase().replace(/\s+/g, '-')}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type *</Label>
                        <Select name="inquiryType" required>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Enter your message"
                      required
                      rows={5}
                      className="mt-2"
                    />
                  </div>

                  {submitError && <p className="text-sm leading-5 text-red-600" role="alert">{submitError}</p>}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0084ff] text-white hover:bg-[#0068d6] py-6"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
