"use client";
import React from "react";

export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

export default function ChatMessageBubble({ role, content }: ChatMessage) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
          isUser
            ? "bg-[var(--turquoise,#40C4B4)] text-[var(--ink,#07080a)]"
            : "bg-white/7 text-[var(--text,#EAEAF2)] border border-white/10"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
