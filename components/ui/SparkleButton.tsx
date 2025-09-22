"use client";
import React from "react";

type Variant = "magenta" | "turquoise" | "gold";
type Size = "md" | "lg";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; variant?: Variant; size?: Size; className?: string };
type BtnProps  = React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never; variant?: Variant; size?: Size; className?: string };

export default function SparkleButton(props: LinkProps | BtnProps) {
  const { className = "", variant = "magenta", size = "md", children, ...rest } = props as any;
  const bg =
    variant === "magenta" ? "var(--magenta)" :
    variant === "turquoise" ? "var(--turquoise)" : "var(--gold)";
  const glow =
    variant === "magenta" ? "var(--glow-magenta)" :
    variant === "turquoise" ? "var(--glow-turquoise)" : "var(--glow-gold)";
  const pad = size === "lg" ? "px-7 py-3.5 text-lg" : "px-5 py-2.5";

  const base = `inline-flex items-center justify-center rounded-full text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${pad} ${className}`;

  if ("href" in props) {
    const aProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...aProps} className={base} style={{ background: bg, boxShadow: glow }}>
        {children}
      </a>
    );
  }

  const bProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...bProps} className={base} style={{ background: bg, boxShadow: glow }}>
      {children}
    </button>
  );
}
