"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
  className?: string;
  showTexture?: boolean; // optional tiled svg texture
};

/**
 * WaveBackgroundLayout
 * Token-safe gradient layer + optional subtle texture.
 * No external deps. Motion-safe. Build-safe on Vercel.
 */
export default function WaveBackgroundLayout({
  children,
  intensity = "subtle",
  className = "",
  showTexture = false,
}: Props) {
  const layer =
    intensity === "strong"
      ? "bg-[radial-gradient(60%_60%_at_40%_0%,rgba(194,24,91,0.16),transparent),radial-gradient(60%_60%_at_80%_0%,rgba(64,196,180,0.16),transparent)]"
      : intensity === "medium"
      ? "bg-[radial-gradient(60%_60%_at_40%_0%,rgba(194,24,91,0.10),transparent),radial-gradient(60%_60%_at_80%_0%,rgba(64,196,180,0.10),transparent)]"
      : "bg-[radial-gradient(60%_60%_at_40%_0%,rgba(194,24,91,0.06),transparent),radial-gradient(60%_60%_at_80%_0%,rgba(64,196,180,0.06),transparent)]";

  return (
    <div className={`relative ${className}`}>
      {/* gradient underlay */}
      <div className={`absolute inset-0 -z-10 ${layer}`} />

      {/* optional tiled svg texture (safe even if the file is missing) */}
      {showTexture && (
        <div
          className="absolute inset-0 -z-10 opacity-[0.15] bg-repeat"
          style={{ backgroundImage: "url('/textures/waves.svg')" }}
          aria-hidden
        />
      )}

      {children}
    </div>
  );
}
