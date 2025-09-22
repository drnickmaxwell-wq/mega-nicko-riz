"use client";
import React from "react";

type Props = {
  onClick: () => void;
  label?: string;
};

export default function ChatButton({ onClick, label = "Chat" }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 rounded-full px-5 py-3 bg-[var(--turquoise, #40C4B4)] text-black font-medium shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/70"
      aria-label="Open chat"
    >
      {label}
    </button>
  );
}
