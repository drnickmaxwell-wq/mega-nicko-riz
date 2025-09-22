"use client";
import React from "react";
export default function ShimmerText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={className}
      style={{ background:"linear-gradient(90deg, rgba(255,255,255,.25), rgba(255,255,255,.7), rgba(255,255,255,.25))",
               WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent",
               backgroundSize:"220% 100%", animation:"smh-shimmer 3.8s ease-in-out infinite" }}>
      {children}
      <style jsx>{`
        @keyframes smh-shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @media (prefers-reduced-motion: reduce){ span { animation: none } }
      `}</style>
    </span>
  );
}
