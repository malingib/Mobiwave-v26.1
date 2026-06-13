import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Pheddis Mbodze',
    role: 'Team Lead',
    company: 'TUAN',
    initials: 'PM',
    content:
      'MobiWave transformed our customer communication strategy. Their bulk SMS platform helped us reach over 100,000 customers instantly with a 99% delivery rate. The analytics dashboard is incredibly insightful.',
    rating: 5,
  },
  {
    name: 'Herbert Kahindi',
    role: 'Administrator',
    company: 'Malanga Welfare',
    initials: 'HK',
    content:
      'The M-Pesa integration API was seamless to implement. Within days, we had automated payment collection running smoothly. Their support team is always responsive and genuinely helpful.',
    rating: 5,
  },
  {
    name: 'Ibrahim Shehi',
    role: 'Operations Director',
    company: 'BID Logistics',
    initials: 'IS',
    content:
      'We switched from another provider to MobiWave and the difference is night and day. Better delivery rates, lower costs, and the USSD service has been a game-changer for our rural customers.',
    rating: 5,
  },
  {
    name: 'Shumaa Mwangome',
    role: 'Project Coordinator',
    company: 'Jawabu Nexus',
    initials: 'SM',
    content:
      'The API documentation is excellent and the developer support is top-notch. We integrated their services into our systems in less than a week. Highly recommend for any tech team.',
    rating: 5,
  },
];

const avatarColors = ['#0084ff', '#0068d6', '#1d8c89', '#0a1a25'];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [inViewRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  useEffect(() => {
    if (!isInView || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [isInView]);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goNext = () => setCurrentIndex((p) => (p + 1) % testimonials.length);
  const goPrev = () => setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[currentIndex];

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (inViewRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      id="testimonials"
      className="py-14 md:py-16 overflow-hidden"
      style={{ background: '#0a1a25' }}
    >
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-8">
          <span className="section-label-white text-[11px] px-3 py-1">Testimonials</span>
          <h2 className="section-heading-white">
            What They <span style={{ color: '#0084ff' }}>Say</span>
          </h2>
          <p className="text-white/60 text-[15px] md:text-base max-w-[640px] mx-auto">
            Don't just take our word for it — hear from the businesses
            that rely on MobiWave every day.
          </p>
        </div>

        {/* Testimonial Card */}
        <div ref={cardRef} className="max-w-xl md:max-w-2xl mx-auto">
          <div
            className="relative rounded-2xl p-5 md:p-6"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {/* Quote icon */}
            <div className="absolute -top-3 left-5 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: '#0084ff' }}>
              <Quote className="w-3.5 h-3.5 text-white" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-3">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-white/85 text-[17px] md:text-[19px] leading-relaxed mb-5 max-w-[75ch]">
              "{t.content}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                style={{ background: avatarColors[currentIndex % avatarColors.length] }}
              >
                {t.initials}
              </div>
              <div>
                <div className="font-semibold text-white text-sm leading-tight">{t.name}</div>
                <div className="text-white/55 text-xs md:text-sm">{t.role} · {t.company}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-7 bg-blue-500' : 'w-2.5 bg-white/25'}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={goPrev}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0084ff')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button onClick={goNext}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0084ff')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
