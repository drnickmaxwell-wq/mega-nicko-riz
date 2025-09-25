"use client";
import { useEffect, useRef } from "react";

export default function WaveBackgroundLayered({
  layers = [], className = ""
}: { layers: Array<{ opacity?: number; colors?: string[]; speed?: string; amplitude?: string }>; className?: string }) {
  const ref = useRef<HTMLCanvasElement|null>(null);
  useEffect(() => {
    const c=ref.current; if(!c) return;
    const ctx=c.getContext("2d"); if(!ctx) return;
    const DPR=Math.max(1, window.devicePixelRatio||1);
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf=0;

    const parsed = layers.map((l,i)=>({
      opacity:l.opacity ?? 0.2,
      amp: parseFloat((l.amplitude||"20px").replace("px","")) || 20+i*4,
      freq: 0.008 + i*0.001,
      speed: parseFloat((l.speed||"20s").replace("s","")) || (20+i*5),
      colors: l.colors?.length? l.colors : ["rgba(64,196,180,.15)"],
    }));

    const fit=()=>{
      const r=c.getBoundingClientRect();
      c.width=Math.round(r.width*DPR);
      c.height=Math.round(r.height*DPR);
      ctx.setTransform(DPR,0,0,DPR,0,0);
    };

    let t0=performance.now();
    const draw=(tn:number)=>{
      const dt=(tn-t0)/1000;
      const w=c.width/DPR, h=c.height/DPR;
      ctx.clearRect(0,0,w,h);
      parsed.forEach((l,i)=>{
        ctx.globalAlpha=l.opacity;
        ctx.fillStyle=l.colors[0]!;
        const y0=h*0.55+i*12;
        const phase=reduce?0:dt*(40/l.speed);
        ctx.beginPath(); ctx.moveTo(0,y0);
        for(let x=0;x<=w;x+=8) ctx.lineTo(x, y0 + Math.sin(x*l.freq+phase)*l.amp);
        ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath(); ctx.fill();
      });
      ctx.globalAlpha=1;
      if(!reduce) raf=requestAnimationFrame(draw);
    };

    const ro=new ResizeObserver(()=>{ fit(); draw(performance.now()); });
    ro.observe(c);
    if(!reduce) raf=requestAnimationFrame(draw);
    return ()=>{ cancelAnimationFrame(raf); ro.disconnect(); };
  },[layers]);

  return <canvas ref={ref} className={`absolute inset-0 ${className}`} aria-hidden />;
}
