"use client";

export default function ShimmerTextJson({
  children, className = "", variant = "primary", speed = 3, soft = false,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "gold";
  speed?: number;
  soft?: boolean;
}) {
  const bg =
    variant === "gold"
      ? `linear-gradient(90deg, rgba(255,255,255,${soft?0.6:0.8}) 0%, var(--gold) 25%, rgba(255,255,255,1) 50%, var(--gold) 75%, rgba(255,255,255,${soft?0.6:0.8}) 100%)`
      : variant === "secondary"
      ? `linear-gradient(90deg, rgba(255,255,255,${soft?0.6:0.8}) 0%, var(--turquoise) 25%, rgba(255,255,255,1) 50%, var(--turquoise) 75%, rgba(255,255,255,${soft?0.6:0.8}) 100%)`
      : `linear-gradient(90deg, rgba(255,255,255,${soft?0.6:0.8}) 0%, var(--magenta) 25%, rgba(255,255,255,1) 50%, var(--magenta) 75%, rgba(255,255,255,${soft?0.6:0.8}) 100%)`;

  return (
    <span
      className={className}
      style={{
        background: bg,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        animation: `smh-shimmer ${Math.max(0.5, speed)}s ease-in-out infinite`,
      }}
    >
      {children}
      <style jsx>{`
        @keyframes smh-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(*) { animation: none !important; }
        }
      `}</style>
    </span>
  );
}
