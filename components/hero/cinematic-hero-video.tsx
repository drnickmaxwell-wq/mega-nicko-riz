"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = { videoSrc?: string; posterSrc?: string; title?: string; subtitle?: string; className?: string; autoPlay?: boolean; muted?: boolean; loop?: boolean; };
export default function CinematicHeroVideo({
  videoSrc = "", // can be empty while you fight video; poster will show
  posterSrc = "/videos/hero-poster.jpg",
  title = "St Mary’s House Dental Care",
  subtitle = "Luxury, 3D-first dentistry in Shoreham-by-Sea.",
  className = "", autoPlay = true, muted = true, loop = true,
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const v = ref.current; if (!v || !videoSrc) return;
    const ok = () => setLoaded(true), bad = () => setLoaded(false);
    v.addEventListener("loadeddata", ok); v.addEventListener("error", bad);
    if (autoPlay) v.play().catch(()=>void 0);
    return ()=>{ v.removeEventListener("loadeddata", ok); v.removeEventListener("error", bad); };
  }, [autoPlay, videoSrc]);

  return (
    <div className={`relative w-full overflow-hidden rounded-[var(--radius)] ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10"
           style={{ background:"linear-gradient(to bottom, rgba(0,0,0,.35) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,.45) 100%)", mixBlendMode:"multiply" }} />
      <video ref={ref} className="block h-[46vh] w-full object-cover md:h-[58vh] lg:h-[64vh]"
             src={videoSrc || undefined} poster={posterSrc} autoPlay={!!videoSrc && autoPlay}
             muted={muted} loop={loop} playsInline preload="metadata" />
      <div className="absolute inset-0 z-20 grid place-items-center px-6">
        <div className="mx-auto max-w-[var(--content)] text-center">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">{title}</h1>
          {subtitle && <p className="mt-4 text-white/85 text-base md:text-lg">{subtitle}</p>}
        </div>
      </div>
      {!loaded && (
        <div aria-hidden className="absolute inset-0 z-0"
             style={{ background:"linear-gradient(135deg, rgba(194,24,91,.10) 0%, rgba(64,196,180,.16) 100%)" }} />
      )}
    </div>
  );
}
