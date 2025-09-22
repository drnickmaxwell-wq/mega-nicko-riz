"use client";

import React from "react";

export function CoastalWaves() {
  // super-light placeholder so we prove the dynamic import works
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(1200px 600px at 50% 110%, rgba(64,196,180,0.18), transparent 60%)",
        pointerEvents: "none",
      }}
    />
  );
}

export default CoastalWaves;
