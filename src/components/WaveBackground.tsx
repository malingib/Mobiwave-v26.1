import { useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function WaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  const waveColors = useMemo(
    () => [
      { stroke: 'rgba(0,180,216,0.35)', fill: 'rgba(0,180,216,0.06)', width: 2.5 },
      { stroke: 'rgba(29,140,137,0.45)', fill: 'rgba(29,140,137,0.08)', width: 2.5 },
      { stroke: 'rgba(0,132,255,0.55)', fill: 'rgba(0,132,255,0.10)', width: 2.5 },
      { stroke: 'rgba(0,180,216,0.7)', fill: 'rgba(0,180,216,0.12)', width: 3 },
      { stroke: 'rgba(29,140,137,0.8)', fill: 'rgba(29,140,137,0.14)', width: 3 },
      { stroke: 'rgba(0,132,255,0.9)', fill: 'rgba(0,132,255,0.16)', width: 3 },
    ],
    []
  );

  // Canvas-based concentric wave rings (logo style)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.45;
      const baseR = Math.min(w, h) * 0.12;
      const ringCount = 6;

      // Concentric arc rings that pulse outward
      for (let i = 0; i < ringCount; i++) {
        const phase = time * 0.4 + i * 0.7;
        const pulse = Math.sin(phase) * 0.5 + 0.5;
        const r = baseR + i * (baseR * 0.6) + pulse * 15;
        const alpha = 0.08 + (1 - i / ringCount) * 0.12 - pulse * 0.03;

        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, 0, false);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 2.5 - i * 0.15;
        ctx.stroke();
      }

      // WiFi signal arcs at top-right
      const wifiCx = cx + baseR * 1.8;
      const wifiCy = cy - baseR * 1.2;
      for (let i = 0; i < 3; i++) {
        const phase = time * 0.5 + i * 0.5;
        const pulse = Math.sin(phase) * 0.5 + 0.5;
        const r = 15 + i * 14 + pulse * 4;
        const alpha = 0.15 - i * 0.03;

        ctx.beginPath();
        ctx.arc(wifiCx, wifiCy, r, -Math.PI * 0.85, -Math.PI * 0.15, false);
        ctx.strokeStyle = `rgba(29, 140, 137, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Bottom wavy lines
      const waveY = cy + baseR * 2.2;
      const waveColorsLocal = [
        '#00b4d81f',
        'rgba(29,140,137,0.15)',
        'rgba(0,132,255,0.18)',
      ];

      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        const yOff = waveY + j * 18;
        for (let x = 0; x <= w; x += 3) {
          const normalizedX = x / w;
          const wave =
            Math.sin(normalizedX * Math.PI * 3 + time * 0.6 + j * 0.8) * 12 +
            Math.sin(normalizedX * Math.PI * 5 + time * 0.4) * 6;
          if (x === 0) ctx.moveTo(x, yOff + wave);
          else ctx.lineTo(x, yOff + wave);
        }
        ctx.strokeStyle = waveColorsLocal[j];
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      time += 0.016;
      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0a1a25 0%, #002a5e 35%, #0a1a25 65%, #031522 100%)',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,132,255,0.12) 0%, transparent 65%)',
        }}
      />

      {/* Secondary glow */}
      <div
        className="absolute top-2/3 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(29,140,137,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Canvas for animated waves + concentric arcs */}
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity, y: y1 }}
      />

      {/* Animated SVG wave layers at bottom */}
      <motion.div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ y: y2 }}>
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="block w-full h-[120px] sm:h-[160px]">
          {waveColors.map((wc, i) => (
            <motion.path
              key={i}
              d={`M0 ${140 + i * 8} C ${240 + i * 10} ${100 + i * 12}, ${480 + i * 10} ${160 - i * 8}, 720 ${130 + i * 6} C 960 ${100 + i * 10}, 1200 ${155 - i * 6}, 1440 ${125 + i * 8} V200 H0 Z`}
              fill={wc.fill}
              stroke={wc.stroke}
              strokeWidth={wc.width}
              animate={{
                d: [
                  `M0 ${140 + i * 8} C ${240 + i * 10} ${100 + i * 12}, ${480 + i * 10} ${160 - i * 8}, 720 ${130 + i * 6} C 960 ${100 + i * 10}, 1200 ${155 - i * 6}, 1440 ${125 + i * 8} V200 H0 Z`,
                  `M0 ${135 + i * 8} C ${240 + i * 10} ${115 + i * 10}, ${480 + i * 10} ${145 - i * 6}, 720 ${125 + i * 8} C 960 ${115 + i * 8}, 1200 ${145 - i * 8}, 1440 ${130 + i * 7} V200 H0 Z`,
                  `M0 ${140 + i * 8} C ${240 + i * 10} ${100 + i * 12}, ${480 + i * 10} ${160 - i * 8}, 720 ${130 + i * 6} C 960 ${100 + i * 10}, 1200 ${155 - i * 6}, 1440 ${125 + i * 8} V200 H0 Z`,
                ],
              }}
              transition={{
                duration: 6 + i * 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
