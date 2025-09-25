"use client";
import React from "react";
type Variant = "primary"|"secondary"|"gold"|"emergency";

export default function SparkleButtonJson({
  href="#", children, variant="primary", className=""
}: { href?: string; children: React.ReactNode; variant?: Variant; className?: string }) {
  const bg = {
    primary:   "linear-gradient(135deg, #C2185B 0%, #40C4B4 100%)",
    secondary: "linear-gradient(135deg, #40C4B4 0%, #0288D1 100%)",
    gold:      "linear-gradient(135deg, #D4AF37 0%, #C2185B 100%)",
    emergency: "linear-gradient(135deg, #FF3B30 0%, #C2185B 100%)",
  }[variant];
  return (
    <a href={href} className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-white ${className}`} style={{ background:bg, boxShadow:"0 10px 15px rgba(0,0,0,.12)" }}>
      {children}
    </a>
  );
}
