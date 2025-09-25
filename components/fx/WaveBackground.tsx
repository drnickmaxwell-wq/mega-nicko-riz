"use client";

import React from "react";

interface WaveBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
}

export default function WaveBackground({
  children,
  className = "",
  variant = "light",
}: WaveBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Coastal Wave Background Image */}
      <div 
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: "url('/waves-bg-2560.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Gradient Overlay for Text Contrast */}
      <div 
        className="absolute inset-0"
        style={{
          background: variant === "light" 
            ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(64,196,180,0.1) 50%, rgba(194,24,91,0.1) 100%)"
            : "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(64,196,180,0.1) 50%, rgba(194,24,91,0.1) 100%)"
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
