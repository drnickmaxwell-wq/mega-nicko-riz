"use client";
import React from "react";
import Button from "@/components/ui/Button";

export default function AppointmentsPage() {
  const tabeoKey = process.env.NEXT_PUBLIC_TABEO_EMBED_KEY;
  return (
    <main className="mx-auto max-w-[var(--maxw,1200px)] px-6 py-16">
      <h1 className="text-3xl font-semibold">Book an Appointment</h1>
      <p className="mt-3 text-white/80">
        Call <a className="underline" href="tel:01273453109">01273 453109</a> or request a time below.
      </p>

      <div className="mt-6 flex gap-3">
        <Button onClick={()=> location.href="tel:01273453109"}>Call now</Button>
        <Button variant="outline" onClick={()=> location.href="/contact"}>Message us</Button>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Finance Options (Tabeo)</h2>
        {!tabeoKey ? (
          <p className="text-sm text-white/70 mt-2">Tabeo embed not configured yet. Add NEXT_PUBLIC_TABEO_EMBED_KEY in ENV.</p>
        ) : (
          <div className="mt-4 rounded-xl border border-white/10 p-4 bg-white/5">
            {/* Replace with real Tabeo embed using your key */}
            <p className="text-sm">Tabeo widget would render here.</p>
          </div>
        )}
      </section>
    </main>
  );
}
