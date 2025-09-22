"use client";
import React from "react";

export default function CoastalWaves({ className="" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1440 240" aria-hidden="true" role="img">
      <defs>
        <linearGradient id="wave" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#40C4B4" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#C2185B" stopOpacity="0.32" />
        </linearGradient>
      </defs>
      <path fill="url(#wave)" d="M0,160 C220,200 320,120 540,160 C760,200 920,80 1140,120 C1260,140 1380,140 1440,140 L1440,240 L0,240 Z" />
    </svg>
  );
}
