"use client";
import { useEffect, useRef } from "react";
export default function WaveBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const DPR = Math.max(1, window.devicePixelRatio || 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const fit = () => { const r = c.getBoundingClientRect(); c.width = Math.round(r.width * DPR); c.height = Math.round(r.height * DPR); ctx.setTransform(DPR,0,0,DPR,0,0); };
    const draw = (t:number) => {
      const w=c.width/DPR, h=c.height/DPR; ctx.clearRect(0,0,w,h);
      const cols=["rgba(64,196,180,.18)","rgba(64,196,180,.12)","rgba(194,24,91,.08)","rgba(194,24,91,.04)"];
      for (let i=0;i<4;i++){
        const y0=h*0.55+i*12, amp=12+i*3, freq=0.008+i*0.001, phase=reduce?0:t*0.0004*(1+i*0.25);
        ctx.fillStyle=cols[i]; ctx.beginPath(); ctx.moveTo(0,y0);
        for (let x=0;x<=w;x+=8) ctx.lineTo(x, y0 + Math.sin(x*freq+phase)*amp);
        ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath(); ctx.fill();
      }
      if(!reduce) raf=requestAnimationFrame(draw);
    };
    const ro=new ResizeObserver(()=>{fit(); draw(0);}); ro.observe(c);
    if(!reduce) raf=requestAnimationFrame(draw);
    return ()=>{ cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} className={`absolute inset-0 ${className}`} aria-hidden />;
}
