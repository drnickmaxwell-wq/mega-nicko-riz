"use client";
import React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
};

export default function Button({ variant="primary", className, ...rest }: Props) {
  const base = "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition";
  const styles = {
    primary: "bg-[var(--turquoise,#40C4B4)] text-[var(--ink,#07080a)] shadow-md hover:opacity-90",
    outline: "border border-[var(--gold,#D4AF37)] text-[var(--text,#EAEAF2)] hover:bg-white/5",
    ghost: "text-[var(--text,#EAEAF2)] hover:bg-white/5"
  }[variant];
  return <button className={clsx(base, styles, className)} {...rest} />;
}
