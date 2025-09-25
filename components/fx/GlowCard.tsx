"use client";

import React, { useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "magenta" | "turquoise" | "gold";
  hover?: boolean;
}

export default function GlowCard({
  children,
  className = "",
  variant = "turquoise",
  hover = true,
}: GlowCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const glowColors = {
    magenta: "var(--glow-magenta)",
    turquoise: "var(--glow-turquoise)",
    gold: "var(--glow-gold)",
  } as const;

  const borderColors = {
    magenta: "border-[var(--magenta)]/20",
    turquoise: "border-[var(--turquoise)]/20",
    gold: "border-[var(--gold)]/20",
  } as const;

  // subtle gradient overlay colour (fixed: valid CSS)
  const overlayGrad =
    variant === "magenta"
      ? "linear-gradient(135deg, rgba(194,24,91,0.10), transparent)"
      : variant === "gold"
      ? "linear-gradient(135deg, rgba(212,175,55,0.10), transparent)"
      : "linear-gradient(135deg, rgba(64,196,180,0.10), transparent)";

  return (
    <div
      className={`
        relative p-6 rounded-[var(--radius)]
        bg-[var(--surface)]/80 backdrop-blur-md border transition-all duration-300 ease-out
        ${borderColors[variant]}
        ${hover ? "hover:scale-[1.02] cursor-pointer" : ""}
        ${className}
      `}
      style={{
        boxShadow: isHovered && hover ? glowColors[variant] : "0 4px 10px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
    >
      {/* Subtle gradient overlay on hover */}
      <div
        className={`absolute inset-0 rounded-[var(--radius)] opacity-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : ""}`}
        style={{ background: overlayGrad }}
        aria-hidden
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
