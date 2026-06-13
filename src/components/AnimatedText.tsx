import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface AnimatedTextProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  animation?: 'clip' | 'fadeUp' | 'fadeIn';
}

export function AnimatedText({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.05,
  as: Component = 'span',
  animation = 'clip',
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;
    
    const words = containerRef.current.querySelectorAll('.word');
    hasAnimated.current = true;

    if (animation === 'clip') {
      gsap.fromTo(
        words,
        { 
          clipPath: 'inset(0 100% 0 0)',
          opacity: 0 
        },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 0.6,
          stagger: staggerDelay,
          delay,
          ease: 'power3.out',
        }
      );
    } else if (animation === 'fadeUp') {
      gsap.fromTo(
        words,
        { 
          y: 30,
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: staggerDelay,
          delay,
          ease: 'power3.out',
        }
      );
    } else {
      gsap.fromTo(
        words,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          stagger: staggerDelay,
          delay,
          ease: 'power2.out',
        }
      );
    }
  }, [animation, delay, staggerDelay]);

  const words = children.split(' ');

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={className}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="word inline-block mr-[0.25em]"
          style={{ 
            clipPath: animation === 'clip' ? 'inset(0 100% 0 0)' : undefined,
            opacity: animation === 'fadeIn' ? 0 : undefined 
          }}
        >
          {word}
        </span>
      ))}
    </Component>
  );
}
