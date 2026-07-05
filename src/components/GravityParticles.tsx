import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  homeX: number;
  homeY: number;
  baseSize: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  glow: number;
}

export function GravityParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let mouseX = -9999;
    let mouseY = -9999;

    const COUNT = 700;
    const WAVE_RADIUS = 140;
    const ATTRACTION = 0.015;
    const RETURN_FORCE = 0.006;
    const DAMPING = 0.94;
    let particles: Particle[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < COUNT; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        particles.push({
          x,
          y,
          vx: 0,
          vy: 0,
          homeX: x,
          homeY: y,
          baseSize: 0.3 + Math.random() * 0.8,
          size: 0.3 + Math.random() * 0.8,
          baseOpacity: 0.03 + Math.random() * 0.08,
          opacity: 0.03 + Math.random() * 0.08,
          glow: 0,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    resize();
    init();
    window.addEventListener('resize', () => { resize(); init(); });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let glowTarget = 0;
        if (dist < WAVE_RADIUS && mouseX > 0) {
          const t = 1 - dist / WAVE_RADIUS;
          glowTarget = t * t;

          p.vx += (dx / (dist + 0.5)) * ATTRACTION * glowTarget;
          p.vy += (dy / (dist + 0.5)) * ATTRACTION * glowTarget;
        }

        p.vx += (p.homeX - p.x) * RETURN_FORCE;
        p.vy += (p.homeY - p.y) * RETURN_FORCE;

        p.vx *= DAMPING;
        p.vy *= DAMPING;

        p.x += p.vx;
        p.y += p.vy;

        p.glow += (glowTarget - p.glow) * 0.06;

        p.size = p.baseSize * (1 + p.glow);
        p.opacity = p.baseOpacity + p.glow * 0.2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        if (p.glow > 0.1) {
          const glowGrad = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, p.size * 3
          );
          glowGrad.addColorStop(0, `rgba(200, 225, 255, ${p.glow * 0.08})`);
          glowGrad.addColorStop(1, 'rgba(150, 200, 255, 0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
