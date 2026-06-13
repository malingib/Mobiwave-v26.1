import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Zap,
  Signal,
  Users,
  ArrowRight,
  Star,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Search,
  Globe
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: '⚡',
    title: '100 Mbps Download Speed',
    description: 'Experience ultra-fast speeds for seamless streaming, gaming, and browsing.'
  },
  {
    icon: '🛰️',
    title: '99.9% Internet Uptime',
    description: 'Reliable satellite connectivity with industry-leading uptime guarantee.'
  },
  {
    icon: '📱',
    title: '24/7 Customer Support',
    description: 'Our dedicated team is available round-the-clock for technical assistance.'
  }
];

const services = [
  {
    icon: '🌐',
    title: 'Broadband Internet',
    description: 'Our best broadband service offers high-quality streaming and fast connectivity.'
  },
  {
    icon: '📡',
    title: 'Home WiFi',
    description: 'Wall-to-wall WiFi coverage throughout your home for seamless connectivity.'
  },
  {
    icon: '📺',
    title: 'Satellite TV',
    description: 'Premium TV service with hundreds of channels and on-demand content.'
  },
  {
    icon: '📦',
    title: 'ISP TV Box',
    description: 'Advanced TV box for a superior entertainment experience.'
  }
];

const pricingPlans = [
  {
    name: 'Internet 150',
    downloadSpeed: '150 Mbps',
    uploadSpeed: '30 Mbps',
    price: 59.99,
    term: 'on a 24-month term. $79.99/mo thereafter',
    badge: 'Get Streaming For KES 500/Month',
    unlimited: true
  },
  {
    name: 'Internet 500',
    downloadSpeed: '500 Mbps',
    uploadSpeed: '30 Mbps',
    price: 99.99,
    term: 'on a 24-month term. $119.99/mo thereafter',
    badge: 'Get Streaming For KES 500/Month',
    unlimited: true,
    featured: true
  },
  {
    name: 'Internet 1.5 Gig',
    downloadSpeed: '1.5 Gbps',
    uploadSpeed: '50 Mbps',
    price: 119.99,
    term: 'on a 24-month term. $149.99/mo thereafter',
    badge: 'Get Streaming For KES 500/Month',
    unlimited: true
  }
];

const accordion = [
  {
    title: 'Save On Internet With Mobile',
    content: 'High-speed internet with flexible mobile plans. Work from anywhere with reliable connectivity.',
    features: ['Connect several devices at once', 'Gig download speeds available everywhere', 'Wall-to-wall WiFi connection']
  },
  {
    title: 'Zoom Through The Day',
    content: 'Optimized network performance for video conferencing and remote work.',
    features: ['Connect several devices at once', 'Gig download speeds available everywhere', 'Wall-to-wall WiFi connection']
  },
  {
    title: 'Game Your System',
    content: 'Low-latency gaming internet with consistent speeds and minimal lag.',
    features: ['Connect several devices at once', 'Gig download speeds available everywhere', 'Wall-to-wall WiFi connection']
  },
  {
    title: 'Stream Your Fave Flicks',
    content: 'Buffer-free streaming experience with dedicated bandwidth for entertainment.',
    features: ['Connect several devices at once', 'Gig download speeds available everywhere', 'Wall-to-wall WiFi connection']
  }
];

const stats = [
  { value: '10+', label: 'YEARS OF EXPERIENCE' },
  { value: '25 GB', label: 'BANDWIDTH CAPACITY' },
  { value: '20K+', label: 'CHANNELS' },
  { value: '99%', label: 'UPTIME GUARANTEE' }
];

const blogs = [
  {
    image: '🎬',
    tag: 'COMMUNITY',
    title: 'Make Your Streaming More Enjoyable With The Fastest Internet',
    date: '23 Jan, 2025',
    readTime: '5 mins read'
  },
  {
    image: '🌐',
    tag: 'KNOWLEDGE',
    title: 'How Reliable Internet Access Shapes Our World',
    date: '22 Jan, 2025',
    readTime: '3 mins read'
  },
  {
    image: '⚡',
    tag: 'KNOWLEDGE',
    title: 'Supercharge Your Online Experience: Top 5 Features',
    date: '21 Jan, 2025',
    readTime: '2 mins read'
  }
];

const testimonials = [
  {
    name: 'Tim Johnson',
    text: 'Don\'t give up, you guys are doing a lot of good for people who just want to enjoy internet content.',
    rating: 5
  },
  {
    name: 'Jonathon Smith',
    text: 'Even though I ended up staying with Rogers, your service was impressive.',
    rating: 5
  },
  {
    name: 'Andrew Lee',
    text: 'You\'re affiliated with quality service providers. Exceptional support throughout.',
    rating: 5
  }
];

export function ISP() {
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [activeAvailability, setActiveAvailability] = useState('broadband');
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (featuresRef.current) {
        const cards = featuresRef.current.querySelectorAll('.feature-card');
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
            }
          }
        );
      }

      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(
          statItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
            }
          }
        );
      }

      if (pricingRef.current) {
        const planCards = pricingRef.current.querySelectorAll('.pricing-card');
        gsap.fromTo(
          planCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pricingRef.current,
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
      {/* Hero Banner */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <circle cx="100" cy="100" r="200" fill="currentColor" opacity="0.1" />
            <circle cx="1100" cy="500" r="250" fill="currentColor" opacity="0.1" />
          </svg>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-400/20 text-blue-100 text-sm font-medium mb-4">
              ISP SATELLITE INTERNET PROVIDER
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              WE ARE LEADER IN THE SPACE INTERNET
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-12">
              From urban centers to remote areas, when connectivity matters, we deliver winning internet experience.
            </p>
          </div>

          {/* Availability Check Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Street Address & Apartment"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Check Availability
              </button>
            </form>
            <p className="text-center text-gray-600 text-sm mt-4">
              Already a customer? <a href="#" className="text-blue-600 font-semibold hover:underline">Sign in here.</a>
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              WHY CHOOSE ISP
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              WHAT MAKES US DIFFERENT
            </h2>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="feature-card p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a href="#" className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-gradient-to-r from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
                OUR SUSTAINABLE APPROACH
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                WE BELIEVE IN SPACE SUSTAINABILITY
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                High-speed internet connectivity makes WFH life easier with America's fastest download speeds on a fiber-powered satellite network.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Connect several devices at once',
                  'Gig download speeds available everywhere',
                  'Wall-to-wall WiFi connection'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-baseline gap-3 mb-8 p-4 bg-blue-50 rounded-lg">
                <span className="text-sm font-semibold text-gray-600">STARTING FROM</span>
                <h3 className="text-3xl font-bold text-gray-900">KES 2,999<span className="text-lg text-gray-600">/mo</span></h3>
              </div>
              <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Shop Internet Plans
              </button>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-12 flex items-center justify-center min-h-80">
              <Globe className="w-32 h-32 text-blue-300 opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 text-blue-300 text-sm font-medium mb-4">
              OUR SERVICES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              LET'S FIND WHAT YOU NEED
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors group cursor-pointer"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <a href="#" className="text-blue-400 text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About with Accordion */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="bg-gradient-to-br from-gray-200 to-gray-100 rounded-xl p-8 flex items-center justify-center min-h-96">
              <span className="text-6xl">🌍</span>
            </div>

            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
                POWERING DAILY LIFE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                DO MORE OF WHAT YOU LOVE EVERY DAY
              </h2>

              <div className="space-y-3">
                {accordion.map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setActiveAccordion(activeAccordion === i ? -1 : i)}
                      className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 text-left font-semibold text-gray-900 transition-colors flex items-center justify-between"
                    >
                      {item.title}
                      <span className={`transition-transform ${activeAccordion === i ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {activeAccordion === i && (
                      <div className="p-6 bg-white border-t border-gray-200">
                        <p className="text-gray-600 mb-4">{item.content}</p>
                        <ul className="space-y-2 mb-6">
                          {item.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-gray-700">
                              <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                          Shop Internet Plans
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding bg-gradient-to-r from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              PRICING PLANS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              OUR AFFORDABLE PRICING PLANS
            </h2>
          </div>

          <div ref={pricingRef} className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`pricing-card rounded-xl overflow-hidden transition-all duration-300 ${
                  plan.featured
                    ? 'ring-2 ring-blue-600 shadow-2xl transform scale-105'
                    : 'shadow-lg border border-gray-200'
                } bg-white`}
              >
                {plan.featured && (
                  <div className="bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                    FEATURED PLAN
                  </div>
                )}
                <div className="p-8">
                  <p className="text-xs font-semibold text-blue-600 mb-3">{plan.badge}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>

                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">Download speed up to</p>
                    <p className="text-3xl font-bold text-gray-900 mb-4">{plan.downloadSpeed}</p>
                    <p className="text-sm text-gray-600 mb-2">Upload speed up to</p>
                    <p className="text-lg font-semibold text-gray-900">{plan.uploadSpeed}</p>
                  </div>

                  {plan.unlimited && (
                    <div className="mb-6 p-3 bg-blue-50 rounded-lg text-center">
                      <p className="text-xs font-bold text-blue-600">UNLIMITED USAGE</p>
                    </div>
                  )}

                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">{plan.term}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">KES {plan.price.toLocaleString()}</span>
                      <span className="text-gray-600">/mo</span>
                    </div>
                  </div>

                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      plan.featured
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Shop Internet Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Section */}
      <section className="section-padding bg-blue-600 text-white rounded-2xl mx-4 md:mx-0">
        <div className="container-custom text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-400/20 text-blue-100 text-sm font-medium mb-4">
            TESTING
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            START NOW. DON'T HESITATE TO TEST OUR SERVICE
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Test account. Get full access to all channels and VOD content.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <div>
              <p className="text-4xl font-bold">KES 1,499<span className="text-lg">/month</span></p>
              <p className="text-blue-100 text-sm">1 Month Test - Satisfied Or Refunded</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              Test Now
            </button>
            <a href="tel:+254736427842" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Call: +254 736 427 842
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item text-center">
                <h3 className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.value}</h3>
                <p className="text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Check Availability Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
                CHECK AVAILABILITY
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                CHECK THE AVAILABILITY OF OUR SERVICE IN YOUR LOCALITY
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                With Internet Speed up to 10 Gig, Connect, Work, & Play Like Never Before.
              </p>

              <form className="space-y-4">
                <select
                  value={activeAvailability}
                  onChange={(e) => setActiveAvailability(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="broadband">Search area - Broadband Internet</option>
                  <option value="mobile">Mobile Connection</option>
                  <option value="security">Home Security</option>
                </select>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Check Availability
                </button>
              </form>
            </div>

            <div className="bg-blue-100 rounded-xl p-8 flex items-center justify-center min-h-80">
              <Search className="w-32 h-32 text-blue-300 opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              BEING NICE SHOULDN'T BE AN AFTERTHOUGHT
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The reviews are in and we're as obsessed with your internet as you are.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-xl border border-gray-200">
              <div>
                <p className="text-sm font-semibold text-gray-600">Ratings</p>
                <p className="text-2xl font-bold text-gray-900">4.7</p>
              </div>
              <a href="#" className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                View All Ratings <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              BLOG
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              OUR LATEST ARTICLES TO SHOW
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <a
                key={i}
                href="#"
                className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 h-48 flex items-center justify-center text-5xl">
                  {blog.image}
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold text-blue-600 uppercase mb-3">{blog.tag}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {blog.readTime}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ENJOY SPORTS, MOVIES, TV SHOWS & MORE
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            With our large and comprehensive collection of TV channels, never miss your favorite sports games and TV shows.
          </p>
          <div className="mb-8">
            <p className="text-blue-100 mb-2">Subscribe to ISP TV Box & Get Free WiFi For 1 Month</p>
            <p className="text-4xl font-bold">KES 4,999<span className="text-lg">/mo</span></p>
          </div>
          <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
            View All Pricing Plans
          </button>
        </div>
      </section>
    </div>
  );
}
