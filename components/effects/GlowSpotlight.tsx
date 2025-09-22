"use client";
import React, { useEffect, useRef } from "react";

export default function GlowSpotlight({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function move(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--x", x+"px");
      el.style.setProperty("--y", y+"px");
    }
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      className="relative"
      style={{
        background: "radial-gradient(400px 280px at var(--x,50%) var(--y,30%), rgba(64,196,180,.18), transparent 60%)"
      }}
    >
      {children}
    </div>
  );
}
