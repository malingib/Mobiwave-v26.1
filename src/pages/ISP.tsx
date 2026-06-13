import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Star,
  Calendar,
  Clock
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: '100 GB Download Speed',
    description: 'Catch the biggest games and PPV events. Grab a big bowl of popcorn and live the excitement.'
  },
  {
    title: '99% Internet Uptime',
    description: 'Catch the biggest games and PPV events. Grab a big bowl of popcorn and live the excitement.'
  },
  {
    title: '24/7 Customer Support',
    description: 'Catch the biggest games and PPV events. Grab a big bowl of popcorn and live the excitement.'
  }
];

const services = [
  {
    title: 'Broadband Internet',
    description: 'Our Best broadband service offer high-quality streaming.'
  },
  {
    title: 'Home Wifi',
    description: 'Our Best broadband service offer high-quality streaming.'
  },
  {
    title: 'Satellite TV',
    description: 'Our Best broadband service offer high-quality streaming.'
  },
  {
    title: 'Nestor TV Box',
    description: 'Our Best broadband service offer high-quality streaming.'
  }
];

const pricingPlans = [
  {
    name: 'Internet 150',
    downloadSpeed: '150 Mbps',
    uploadSpeed: '30 Mbps',
    price: 59.99,
    term: 'on a 24-month term. $79.99/mo thereafter, subject to increase.',
    badge: 'Get Ignite Streaming For $5/Month',
    unlimited: true,
    image: '/isp-images/pricing-1.09710122.png'
  },
  {
    name: 'Internet 500',
    downloadSpeed: '500 Mbps',
    uploadSpeed: '30 Mbps',
    price: 99.99,
    term: 'on a 24-month term. $119.99/mo thereafter, subject to increase.',
    badge: 'Get Ignite Streaming For $5/Month',
    unlimited: true,
    featured: true,
    image: '/isp-images/pricing-2.c6fb3f78.png'
  },
  {
    name: 'Internet 1.5 Gig',
    downloadSpeed: '1.5 Gbps',
    uploadSpeed: '50 Mbps',
    price: 119.99,
    term: 'on a 24-month term. $149.99/mo thereafter, subject to increase.',
    badge: 'Get Ignite Streaming For $5/Month',
    unlimited: true,
    image: '/isp-images/pricing-3.02248ee0.png'
  }
];

const accordion = [
  {
    title: 'Save On Internet With Mobile',
    content: 'WFH life gets easier from the company that has America\'s fastest download speeds on a fiber-powered network.',
    features: ['Connect several devices at once', 'Gig download speeds available everywhere', 'Wall-to-wall wifi connection']
  },
  {
    title: 'Zoom Through The Day',
    content: 'WFH life gets easier from the company that has America\'s fastest download speeds on a fiber-powered network.',
    features: ['Connect several devices at once', 'Gig download speeds available everywhere', 'Wall-to-wall wifi connection']
  },
  {
    title: 'Game Your System',
    content: 'WFH life gets easier from the company that has America\'s fastest download speeds on a fiber-powered network.',
    features: ['Connect several devices at once', 'Gig download speeds available everywhere', 'Wall-to-wall wifi connection']
  },
  {
    title: 'Stream Your Fave Flicks',
    content: 'WFH life gets easier from the company that has America\'s fastest download speeds on a fiber-powered network.',
    features: ['Connect several devices at once', 'Gig download speeds available everywhere', 'Wall-to-wall wifi connection']
  }
];

const stats = [
  { value: '10 +', label: 'YEARS OF EXEPERIENCE' },
  { value: '25 GB', label: 'BANDWIDTH CAPACITY' },
  { value: '20 K+', label: 'TV CHANNELS' },
  { value: '99 %', label: 'UPTIME GUARANTEE' }
];

const blogs = [
  {
    image: '/isp-images/blog-1.f679e713.jpg',
    tag: 'COMMUNITY',
    title: 'Make Your Streaming More Enjoyable At Once By Using The Fastest Internet In Canada',
    date: '23 Jan, 2025',
    readTime: '5 mins read'
  },
  {
    image: '/isp-images/blog-2.6d6d7fc2.jpg',
    tag: 'KNOWLEDGE',
    title: 'How Reliable Internet Access Shapes Our World',
    date: '22 Jan, 2025',
    readTime: '3 mins read'
  },
  {
    image: '/isp-images/blog-3.dd321114.jpg',
    tag: 'KNOWLEDGE',
    title: 'Supercharge Your Online Experience: The Top 5 F',
    date: '21 Jan, 2025',
    readTime: '2 mins read'
  }
];

const testimonials = [
  {
    name: 'Tim',
    text: 'Don\'t give up, you guys are doing a lot of good for people who just want to enjoy internet content.',
    rating: 5
  },
  {
    name: 'Jonathon',
    text: 'Even though I ended up staying with Rogers, the service you provided was top tier.',
    rating: 5
  },
  {
    name: 'Andrew',
    text: 'You\'re affiliated with Groupe TAQ and that speaks volumes about your quality.',
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
      <section 
        className="relative pt-28 md:pt-32 pb-16 md:pb-24 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 100%), url('/isp-images/banner-bg.87b2cdc9.jpg')`
        }}
      >
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-4 backdrop-blur">
              NESTOR SATELLITE INTERNET PROVIDER
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              WE ARE LEADER IN THE SPACE INTERNET
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-12">
              From Allegiant Stadium to your house, when the game is on the line, Nestor helps everyone enjoy a winning experience.
            </p>
          </div>

          {/* Availability Check Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
            <form className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                placeholder="Street Addresses & Apartments"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Check Availability
              </button>
            </form>
            <p className="text-center text-gray-600 text-sm">
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
              WHY NESTOR
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              WHAT MAKE US DIFFERENT
            </h2>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="feature-card p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl hover:shadow-2xl transition-all duration-300 group relative"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <div className="absolute top-4 right-4 text-3xl opacity-10">
                  {i === 0 ? '📡' : i === 1 ? '🛰️' : '📞'}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
                <div className="pt-6 border-t border-gray-200">
                  <a href="#" className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    Shop Now <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <span className="absolute top-4 left-4 text-4xl font-bold text-blue-100">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee - Fastest Internet */}
      <section className="py-8 bg-blue-600 text-white overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee gap-8">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-xl font-bold">Fastest Internet Speed In The Town ★</span>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
                OUR SUSTAINABLE APPROACH
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                WE BELIEVE IN SPACE SUSTAINABILITY AND WHICH WILL GIVE YOU
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                WFH life gets easier from the company that has America's fastest download speeds on a fiber-powered network.
              </p>
              <ul className="space-y-4 mb-8">
                {['Connect several devices at once', 'Gig download speeds available everywhere', 'Wall-to-wall wifi connection'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-baseline gap-3 mb-8 p-4 bg-blue-50 rounded-lg">
                <span className="text-sm font-semibold text-gray-600">STARTING FROM</span>
                <h3 className="text-3xl font-bold text-gray-900">$99.99<span className="text-lg text-gray-600">/mo</span></h3>
              </div>
              <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Shop Internet Plans
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/isp-images/about1.e97fb0ce.jpg" alt="About 1" className="rounded-lg w-full object-cover h-48" />
              <img src="/isp-images/about2.f94b85ca.jpg" alt="About 2" className="rounded-lg w-full object-cover h-48" />
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
            <div className="rounded-xl overflow-hidden">
              <img src="/isp-images/about.4381ec30.jpg" alt="About" className="w-full object-cover rounded-xl" />
              <div className="absolute relative -mt-16 ml-6 bg-white rounded-xl p-6 shadow-xl max-w-xs">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Affordable Home Packages Starting At</h4>
                <h2 className="text-4xl font-bold text-blue-600">$ 84.00</h2>
              </div>
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
                <div className="p-6">
                  <img src={plan.image} alt={plan.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                  <p className="text-xs font-semibold text-blue-600 mb-3">{plan.badge}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>

                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Download speed up to</p>
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
                      <span className="text-4xl font-bold text-gray-900">$ {plan.price.toFixed(2)}</span>
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
      <section 
        className="section-padding text-white relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(37, 99, 235, 0.8) 0%, rgba(29, 78, 216, 0.8) 100%), url('/isp-images/services-test-bg-2.71b91795.jpg')`
        }}
      >
        <div className="container-custom relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-4 backdrop-blur">
            TESTING
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            START NOW. DON'T HASITATE TO TEST OUR SERVICE
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Test account. Get full access to all channels and VOD
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div>
              <p className="text-4xl font-bold">$ 14.99<span className="text-lg">/month</span></p>
              <p className="text-white/80 text-sm">1 Month Test Satisfied Or Refunded.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              Test Now Our Service
            </button>
            <a href="tel:+3212344567" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Call: +321 234 4567 for any enquiry
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
                CHECK THE AVAILABILITY OF OUR SPECIAL ANTENA IN YOUR LOCALITY
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                With Internet Speed upto 10 Gig, Connect, Work, & Play Like Never Before.
              </p>

              <form className="space-y-4">
                <select
                  value={activeAvailability}
                  onChange={(e) => setActiveAvailability(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="broadband">Search area</option>
                  <option value="mobile">Broadband internet</option>
                  <option value="security">Mobile connection</option>
                  <option value="home">Home security</option>
                </select>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Check Availability
                </button>
              </form>
            </div>

            <div className="rounded-xl overflow-hidden">
              <img src="/isp-images/check-availability.adf7ff4a.png" alt="Check Availability" className="w-full object-cover rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              TESTIMONIAL
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              BEING NICE SHOULDN'T BE AN AFTERTHOUGHT
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The reviews are in and we're as obsessed with your internet as you are.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
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

          <div className="text-center">
            <div className="inline-flex items-center gap-4 bg-white px-6 py-4 rounded-xl border border-gray-300 shadow-lg">
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
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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

      {/* Enjoy Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden">
              <img src="/isp-images/enjoy.92d37569.png" alt="Enjoy" className="w-full object-cover rounded-xl" />
            </div>
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
                ENJOY
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                ENJOY SPORTS, MOVIES, TV SHOWS & MORE
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                With our large and comprehensive collection of TV channels, never miss your favorite sports games and TV shows.
              </p>
              <div className="mb-8 p-6 bg-blue-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-600 mb-2">Subscribe Nestor TV Box & Get Free Wi-Fi For 1 Month</p>
                <p className="text-4xl font-bold text-blue-600">$ 49.99<span className="text-lg text-gray-600">/mo</span></p>
              </div>
              <div className="mb-8 p-4 border-l-4 border-blue-600 bg-gray-50 rounded">
                <p className="font-bold text-gray-900">Nestor prepaid internet</p>
                <p className="text-gray-600">Only pay for the internet you need</p>
                <a href="#" className="text-blue-600 font-semibold text-sm mt-2 flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                View All Pricing Plan
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
