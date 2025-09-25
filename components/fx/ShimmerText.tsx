"use client";

import React from "react";

type AsTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
type ShimmerColor = "gold" | "magenta" | "turquoise";

/**
 * Luxury ShimmerText (token-driven, reduced-motion safe)
 * Backwards compatible with the simple version:
 *   <ShimmerText className="...">Text</ShimmerText>
 * New API:
 *   <ShimmerText as="h1" shimmerColor="gold" className="...">Heading</ShimmerText>
 */
export default function ShimmerText({
  children,
  className = "",
  as: Component = "span",
  shimmerColor = "gold",
  speed = 3,               // seconds
  soft = false,            // softer base gradient (less contrast)
}: {
  children: React.ReactNode;
  className?: string;
  as?: AsTag;
  shimmerColor?: ShimmerColor;
  speed?: number; // seconds for one animation cycle
  soft?: boolean; // reduce contrast in the base gradient
}) {
  // Use CSS variables so themes (Light/Ink) and tokens flow through
  const colorStops =
    shimmerColor === "magenta"
      ? `linear-gradient(90deg, rgba(255,255,255,${soft ? 0.6 : 0.8}) 0%, var(--magenta) 25%, rgba(255,255,255,1) 50%, var(--magenta) 75%, rgba(255,255,255,${soft ? 0.6 : 0.8}) 100%)`
      : shimmerColor === "turquoise"
      ? `linear-gradient(90deg, rgba(255,255,255,${soft ? 0.6 : 0.8}) 0%, var(--turquoise) 25%, rgba(255,255,255,1) 50%, var(--turquoise) 75%, rgba(255,255,255,${soft ? 0.6 : 0.8}) 100%)`
      : // gold default
        `linear-gradient(90deg, rgba(255,255,255,${soft ? 0.6 : 0.8}) 0%, var(--gold) 25%, rgba(255,255,255,1) 50%, var(--gold) 75%, rgba(255,255,255,${soft ? 0.6 : 0.8}) 100%)`;

  return (
    <Component
      className={className}
      style={{
        background: colorStops,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        animation: `smh-shimmer ${Math.max(0.5, speed)}s ease-in-out infinite`,
      }}
    >
      {children}
      {/* Scoped keyframes + reduced motion guard */}
      <style jsx>{`
        @keyframes smh-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(*) {
            animation: none !important;
          }
        }
      `}</style>
    </Component>
  );
}
