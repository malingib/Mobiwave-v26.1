import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, Users, Target } from 'lucide-react';
import { PageBanner } from '@/components/PageBanner';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: '2022',
    title: 'Company Launched',
    description: 'MobiWave Innovations was launched with a vision to revolutionize business communications in Kenya.',
  },
  {
    year: '2022',
    title: 'Core Messaging Suite',
    description: 'Rolled out Bulk SMS, Bulk Email, and Bulk WhatsApp services for multi-channel customer communication.',
  },
  {
    year: '2023',
    title: 'Interactive Channels',
    description: 'Expanded into USSD Codes, Shortcodes, and SMS Surveys for richer engagement flows.',
  },
  {
    year: '2024',
    title: 'Payments and Support',
    description: 'Launched M-Pesa Integration and Service Desk to support payment-enabled and support-led workflows.',
  },
  {
    year: '2025',
    title: 'Rewards Platform',
    description: 'Introduced Airtime Rewards to help businesses drive retention and customer loyalty.',
  },
  {
    year: '2026',
    title: 'Innovations Hub',
    description: 'Expanded the Innovations Hub to showcase live deployments, use cases, and upcoming products in one place.',
  }
];

const allProducts = [
  'Bulk SMS',
  'Bulk Email',
  'Bulk WhatsApp',
  'USSD Codes',
  'Shortcodes',
  'M-Pesa Integration',
  'SMS Surveys',
  'Airtime Rewards',
  'Service Desk'
];

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We conduct our business with the highest ethical standards and transparency.'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We continuously seek new ways to improve our services and create value for our clients.'
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'We put our customers at the center of everything we do, ensuring their success is our priority.'
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for excellence in every aspect of our service delivery.'
  }
];

export function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll('.timeline-item');
        gsap.fromTo(
          items,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
            }
          }
        );
      }
      if (valuesRef.current) {
        const cards = valuesRef.current.querySelectorAll('.value-card');
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: valuesRef.current,
              start: 'top 80%',
            }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageBanner
        title="About MobiWave"
        subtitle="Kenya's premier telecommunications solutions provider, empowering businesses with innovative communication tools since 2022."
      />

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#176fe8]">
                <span className="h-px w-8 bg-[#176fe8]" />
                OUR MISSION
                <span className="h-px w-8 bg-[#176fe8]" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Bridging Communication Gaps with Innovative Solutions
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                At MobiWave Innovations, our mission is to provide businesses with cutting-edge communication tools that enhance customer engagement, streamline operations, and drive growth. We believe that effective communication is the foundation of successful businesses.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are committed to delivering reliable, affordable, and innovative telecommunications solutions that meet the evolving needs of businesses across Kenya and beyond. Our goal is to empower organizations of all sizes with the tools they need to connect with their audiences effectively.
              </p>
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">All Products</h3>
                <div className="flex flex-wrap gap-2.5">
                  {allProducts.map((product) => (
                    <span
                      key={product}
                      className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div className="border-b border-[#172333]/10 pb-5">
                  <div className="text-4xl font-bold text-[#172333] mb-2">50+</div>
                  <div className="text-gray-600">Projects</div>
                </div>
                <div className="border-b border-[#172333]/10 pb-5">
                  <div className="text-4xl font-bold text-[#172333] mb-2">10M+</div>
                  <div className="text-gray-600">Messages Sent</div>
                </div>
                <div className="border-b border-[#172333]/10 pb-5">
                  <div className="text-4xl font-bold text-[#172333] mb-2">99.9%</div>
                  <div className="text-gray-600">Delivery Rate</div>
                </div>
                <div className="border-b border-[#172333]/10 pb-5">
                  <div className="text-4xl font-bold text-[#172333] mb-2">9+</div>
                  <div className="text-gray-600">Services</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1d8c89]">
              <span className="h-px w-8 bg-[#1d8c89]" />
              OUR JOURNEY
              <span className="h-px w-8 bg-[#1d8c89]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The MobiWave Story</h2>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="timeline-item border-b border-gray-200 py-5"
              >
                <span className="inline-flex px-2.5 py-1 rounded-full bg-[#0084ff]/10 text-[#0084ff] font-semibold text-sm">
                  {milestone.year}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">{milestone.title}</h3>
                <p className="text-gray-600 text-sm">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-purple-600">
              <span className="h-px w-8 bg-purple-600" />
              OUR VALUES
              <span className="h-px w-8 bg-purple-600" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Drives Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values shape our culture and guide our decisions as we work to deliver exceptional services to our clients.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card border-b border-gray-200 py-5 transition-colors hover:border-[#0084ff]/40"
              >
                <div className="mb-4 text-[#0084ff]">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
