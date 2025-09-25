"use client";

import React from "react";

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  shimmerColor?: "gold" | "magenta" | "turquoise";
}

export default function ShimmerText({
  children,
  className = "",
  as: Component = "span",
  shimmerColor = "gold",
}: ShimmerTextProps) {
  const shimmerGradients = {
    gold: "linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, var(--gold) 25%, rgba(255, 255, 255, 1) 50%, var(--gold) 75%, rgba(255, 255, 255, 0.8) 100%)",
    magenta: "linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, var(--magenta) 25%, rgba(255, 255, 255, 1) 50%, var(--magenta) 75%, rgba(255, 255, 255, 0.8) 100%)",
    turquoise: "linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, var(--turquoise) 25%, rgba(255, 255, 255, 1) 50%, var(--turquoise) 75%, rgba(255, 255, 255, 0.8) 100%)",
  };

  return (
    <Component
      className={className}
      style={{
        background: shimmerGradients[shimmerColor],
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        animation: "smh-shimmer 3s ease-in-out infinite",
      }}
    >
      {children}
      <style jsx>{`
        @keyframes smh-shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </Component>
  );
}
