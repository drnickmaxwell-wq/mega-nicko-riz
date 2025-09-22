"use client";
import React from "react";
export default function GlowCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[var(--radius)] border border-[var(--surface)] bg-[var(--surface)]/60 backdrop-blur-md ${className}`} style={{ boxShadow:"var(--shadow)" }}>
      {children}
    </div>
  );
}
