"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ChatMessage } from "./ChatMessage";

type ChatContextValue = {
  messages: ChatMessage[];
  send: (text: string) => Promise<void>;
  pending: boolean;
  open: boolean;
  setOpen: (b: boolean) => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within <ChatProvider>");
  return ctx;
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "sys-1", role: "system", content: "You are the St Mary’s House Dental Care concierge. Be clear, friendly, and avoid clinical diagnoses." },
    { id: "asst-hello", role: "assistant", content: "Welcome! Ask me about treatments, fees, appointments, or finance." },
  ]);
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);

  async function send(text: string) {
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setPending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })) }),
      });
      const data = await res.json();
      const content = data?.content ?? data?.message ?? "Sorry—I couldn’t reach the assistant.";
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "assistant", content }]);
    } catch (err) {
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "assistant", content: "Network error. Please try again." }]);
    } finally {
      setPending(false);
    }
  }

  const value = useMemo(() => ({ messages, send, pending, open, setOpen }), [messages, pending, open]);
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
