import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    company: 'Twiga Foods',
    quote:
      "Mawingu Connect transformed how we communicate with our suppliers and customers. Delivery notifications and payment confirmations are now instant, improving our operational efficiency by 40%.",
    author: 'Sarah Kimani',
    role: 'CTO, Twiga Foods',
    image: '/testimonial-1.jpg',
    rating: 5,
  },
  {
    id: 2,
    company: 'KCB Bank',
    quote:
      "The M-Pesa integration is flawless. We've reduced payment processing time by 80% and improved customer satisfaction significantly. The API documentation is excellent.",
    author: 'James Ochieng',
    role: 'Digital Director, KCB',
    image: '/testimonial-2.jpg',
    rating: 5,
  },
  {
    id: 3,
    company: 'Sendy',
    quote:
      "Reliable SMS delivery is critical for our logistics platform. Mawingu Connect delivers 99.9% uptime with excellent support. Their team understands the African market.",
    author: 'Marion Kiprop',
    role: 'Operations Lead, Sendy',
    image: '/testimonial-3.jpg',
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-header',
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
        '.testimonial-card',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.testimonials-carousel',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + testimonials.length) % testimonials.length);
    
    if (normalizedDiff === 0) {
      return {
        transform: 'translateX(0) translateZ(100px) scale(1)',
        opacity: 1,
        zIndex: 3,
      };
    } else if (normalizedDiff === 1 || normalizedDiff === -testimonials.length + 1) {
      return {
        transform: 'translateX(320px) translateZ(-100px) rotateY(-25deg) scale(0.8)',
        opacity: 0.6,
        zIndex: 2,
      };
    } else {
      return {
        transform: 'translateX(-320px) translateZ(-100px) rotateY(25deg) scale(0.8)',
        opacity: 0.6,
        zIndex: 2,
      };
    }
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="testimonials-header text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-purple/10 text-brand-purple text-sm font-medium rounded-full mb-4">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Loved by Businesses Across Africa
          </h2>
        </div>

        {/* 3D Carousel */}
        <div
          className="testimonials-carousel relative h-[450px] flex items-center justify-center"
          style={{ perspective: '1000px' }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="testimonial-card absolute w-full max-w-xl bg-card rounded-2xl p-8 border border-border shadow-card transition-all duration-600"
              style={{
                ...getCardStyle(index),
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDuration: '600ms',
              }}
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-brand-green/20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-brand-orange text-brand-orange"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full hover:bg-brand-green hover:text-white hover:border-brand-green transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-brand-green w-8'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full hover:bg-brand-green hover:text-white hover:border-brand-green transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
