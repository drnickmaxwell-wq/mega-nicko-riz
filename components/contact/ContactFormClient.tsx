// components/contact/ContactFormClient.tsx
"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";

export default function ContactFormClient() {
  const [status, setStatus] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(payload) });
      setStatus(res.ok ? "Thanks! We’ll get back to you shortly." : "Sorry—please call us on 01273 453109.");
    } catch {
      setStatus("Sorry—please call us on 01273 453109.");
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 grid gap-3 max-w-xl">
      <input name="name" placeholder="Name" className="rounded-xl bg-white/5 border border-white/10 p-3" required/>
      <input name="email" type="email" placeholder="Email" className="rounded-xl bg-white/5 border border-white/10 p-3" required/>
      <input name="phone" placeholder="Phone (optional)" className="rounded-xl bg-white/5 border border-white/10 p-3"/>
      <textarea name="message" placeholder="How can we help?" className="h-28 rounded-xl bg-white/5 border border-white/10 p-3"/>
      <div className="flex gap-2">
        <Button type="submit">Send</Button>
        <Button type="button" variant="outline" onClick={() => (location.href = "tel:01273453109")}>
          Call 01273 453109
        </Button>
      </div>
      {status && <p className="text-sm text-white/70">{status}</p>}
    </form>
  );
}
