"use client";

import React from "react";

export function CinematicOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.55))",
        mixBlendMode: "multiply",
        pointerEvents: "none",
      }}
    />
  );
}

export default CinematicOverlay;
