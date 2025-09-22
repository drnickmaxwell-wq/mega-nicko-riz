"use client";

import React, { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const enabled = process.env.NEXT_PUBLIC_FEATURE_CHATDOCK === "true";

export default function ChatDock() {
  const [open, setOpen] = useState(false);
  if (!enabled) return null;

  return (
    <>
      {/* Floating button */}
      <button
        aria-label="Open dental concierge"
        className="fixed bottom-4 right-4 z-50 rounded-full px-4 py-3 text-white shadow-lg"
        style={{ background: "var(--magenta)", boxShadow: "var(--glow-magenta)" }}
        onClick={() => setOpen((v) => !v)}
      >
        Chat
      </button>

      {/* Drawer */}
      {open && <Drawer onClose={() => setOpen(false)} />}
    </>
  );
}

function Drawer({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const [tab, setTab] = useState<"ask" | "book">("ask");

  return (
    <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose}>
      <div
        ref={ref}
        role="dialog"
        aria-label="Dental concierge"
        className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-[var(--surface)] text-[var(--ink)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--surface)]/70">
          <strong>SMH Dental Concierge</strong>
          <button className="underline" onClick={onClose} aria-label="Close">Close</button>
        </div>

        <div className="flex border-b border-[var(--surface)]/70">
          <button
            className={`flex-1 py-2 ${tab === "ask" ? "bg-[var(--surface)]/60" : ""}`}
            onClick={() => setTab("ask")}
          >
            Ask
          </button>
          <button
            className={`flex-1 py-2 ${tab === "book" ? "bg-[var(--surface)]/60" : ""}`}
            onClick={() => setTab("book")}
          >
            Book
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-120px)]">
          {tab === "ask" ? <AskPanel /> : <BookPanel />}
        </div>

        <p className="px-4 py-2 text-xs opacity-80 border-t border-[var(--surface)]/70">
          No medical diagnosis here. This assistant offers general guidance and can help book or escalate. By chatting you consent to simple logging for quality.
        </p>
      </div>
    </div>
  );
}

function AskPanel() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi — I’m your private dental concierge. How can I help today?" },
  ]);
  const [input, setInput] = useState("");

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    const path = typeof window !== "undefined" ? window.location.pathname : "/";
    const next = [...messages, { role: "user", content: text } as Msg];
    setMessages(next);
    const r = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: text, path }),
    });
    const j = await r.json().catch(() => ({}));
    const reply = typeof j?.reply === "string" ? j.reply : "Sorry — please try again.";
    setMessages([...next, { role: "assistant", content: reply }]);
  }

  return (
    <>
      <div className="space-y-3 mb-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`rounded-xl px-3 py-2 max-w-[90%] ${m.role === "assistant" ? "bg-[var(--surface)]/60" : "bg-[var(--magenta)]/90 text-white ml-auto"}`}
          >
            {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={onSend} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-md border border-[var(--surface)] px-3 py-2"
          placeholder="Ask about veneers, implants, fees…"
        />
        <button
          className="rounded-md px-4 py-2 text-white"
          style={{ background: "var(--turquoise)", boxShadow: "var(--glow-turquoise)" }}
        >
          Send
        </button>
      </form>
    </>
  );
}

function BookPanel() {
  const [state, setState] = useState<{ ok?: boolean; error?: string }>({});
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      service: String(fd.get("service") || ""),
      preferredTime: String(fd.get("preferredTime") || ""),
      consent: fd.get("consent") === "on",
      company: "" // honeypot empty
    };

    const r = await fetch("/api/book", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const ok = r.ok;
    setState(ok ? { ok: true } : { error: "Please check your details or try again." });
    if (ok) (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-1 gap-2">
        <input name="name" placeholder="Your name" className="rounded-md border px-3 py-2" required />
        <input type="email" name="email" placeholder="Email" className="rounded-md border px-3 py-2" required />
        <input name="phone" placeholder="Phone" className="rounded-md border px-3 py-2" required />
        <input name="service" placeholder="Service (veneers, implants…)" className="rounded-md border px-3 py-2" />
        <input name="preferredTime" placeholder="Preferred time" className="rounded-md border px-3 py-2" />
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" name="consent" /> I consent to be contacted about my enquiry.
        </label>
        {/* honeypot */}
        <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        className="rounded-md px-4 py-2 text-white"
        style={{ background: "var(--magenta)", boxShadow: "var(--glow-magenta)" }}
      >
        Send enquiry
      </button>
      {state.ok && <p className="text-green-700 text-sm">Thanks — we’ll be in touch shortly.</p>}
      {state.error && <p className="text-red-600 text-sm">{state.error}</p>}
    </form>
  );
}
