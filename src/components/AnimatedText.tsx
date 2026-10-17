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
  as: Component = 'span',
}: AnimatedTextProps) {
  return <Component className={className}>{children}</Component>;
}
