import { useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });
  
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdateRef.current < 16) return; // Throttle to ~60fps
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        lastUpdateRef.current = now;
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
          normalizedX: (event.clientX / window.innerWidth) * 2 - 1,
          normalizedY: (event.clientY / window.innerHeight) * 2 - 1,
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return mousePosition;
}
