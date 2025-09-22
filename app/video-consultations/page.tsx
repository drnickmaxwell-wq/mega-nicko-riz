"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";

export default function VideoConsultationsPage() {
  const [status, setStatus] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const res = await fetch("/api/video-consults", { method:"POST", body: JSON.stringify(payload) });
    setStatus(res.ok ? "Thanks! We’ll confirm by email." : "Sorry—please call us to book.");
  }
  return (
    <main className="mx-auto max-w-[var(--maxw,1200px)] px-6 py-16">
      <h1 className="text-3xl font-semibold">Video Consultations</h1>
      <form onSubmit={submit} className="mt-6 grid gap-3 max-w-xl">
        <input name="name" placeholder="Your name" className="rounded-xl bg-white/5 border border-white/10 p-3" required/>
        <input name="email" placeholder="Email" className="rounded-xl bg-white/5 border border-white/10 p-3" required/>
        <input name="phone" placeholder="Phone (optional)" className="rounded-xl bg-white/5 border border-white/10 p-3"/>
        <textarea name="notes" placeholder="What would you like to discuss?" className="h-28 rounded-xl bg-white/5 border border-white/10 p-3"/>
        <Button type="submit">Request a Video Consult</Button>
        {status && <p className="text-sm text-white/70">{status}</p>}
      </form>
    </main>
  );
}
