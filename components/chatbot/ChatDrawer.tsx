"use client";
import React, { useEffect, useRef } from "react";
import ChatMessageBubble from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatButton from "./ChatButton";
import { useChatContext } from "./ChatProvider";

export default function ChatDrawer() {
  const { messages, send, pending, open, setOpen } = useChatContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages, open]);

  return (
    <>
      <ChatButton onClick={() => setOpen(true)} />
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <aside
            className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-[var(--ink-2,#0b0b0e)] border-l border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            aria-label="Chat drawer"
          >
            <header className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h2 className="text-sm font-semibold text-[var(--text,#EAEAF2)]">AI Concierge</h2>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-white/70 hover:text-white">✕</button>
            </header>
            <div ref={ref} className="px-4 py-4 overflow-y-auto h-[calc(100%-140px)]">
              {messages.filter(m => m.role !== "system").map((m) => (
                <ChatMessageBubble key={m.id} {...m} />
              ))}
              {pending && <div className="text-xs text-white/60 mt-2">Thinking…</div>}
            </div>
            <div className="p-3 border-t border-white/10">
              <ChatInput onSend={send} disabled={pending} />
              <p className="mt-2 text-[10px] text-white/40">
                Educational only. Not a diagnosis. Do not include personal medical information here.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
