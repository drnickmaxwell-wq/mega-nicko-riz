"use client";

import { useEffect, useRef } from "react";

interface Layer {
  color: string;
  opacity?: number;
  amp?: number;   // amplitude
  freq?: number;  // frequency
  speed?: number; // pixels per second
  offsetY?: number;
}

export default function WaveBackground({
  className = "",
  layers,
}: {
  className?: string;
  layers?: Layer[];
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const DPR = Math.max(1, window.devicePixelRatio || 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    // default palette (yours)
    const defaultLayers: Layer[] = [
      { color: "rgba(64,196,180,.18)", amp: 12, freq: 0.008, speed: 40, offsetY: 0 },
      { color: "rgba(64,196,180,.12)", amp: 15, freq: 0.009, speed: 50, offsetY: 12 },
      { color: "rgba(194,24,91,.08)",  amp: 18, freq: 0.010, speed: 60, offsetY: 24 },
      { color: "rgba(194,24,91,.04)",  amp: 21, freq: 0.011, speed: 70, offsetY: 36 },
    ];

    const L = layers && layers.length ? layers : defaultLayers;

    const fit = () => {
      const r = c.getBoundingClientRect();
      c.width = Math.round(r.width * DPR);
      c.height = Math.round(r.height * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const draw = (t: number) => {
      const w = c.width / DPR, h = c.height / DPR;
      ctx.clearRect(0, 0, w, h);

      L.forEach((l, i) => {
        const y0 = h * 0.55 + (l.offsetY ?? i * 12);
        const amp = l.amp ?? 12 + i * 3;
        const freq = l.freq ?? 0.008 + i * 0.001;
        const phase = reduce ? 0 : (t * 0.001 * (l.speed ?? 40));
        ctx.fillStyle = l.color;
        ctx.globalAlpha = l.opacity ?? 1;

        ctx.beginPath();
        ctx.moveTo(0, y0);
        for (let x = 0; x <= w; x += 8) {
          ctx.lineTo(x, y0 + Math.sin(x * freq + phase) * amp);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => {
      fit();
      draw(0);
    });
    ro.observe(c);
    if (!reduce) raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [layers]);

  return (
    <canvas
      ref={ref}
      className={`absolute inset-0 ${className}`}
      aria-hidden
    />
  );
}
