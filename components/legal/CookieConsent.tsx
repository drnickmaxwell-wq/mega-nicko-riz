"use client";
import React, { useEffect, useState } from "react";

const KEY = "smh_cookie_consent_v1";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const v = localStorage.getItem(KEY);
    if (!v) setOpen(true);
  }, []);
  if (!open) return null;
  return (
    <div className="fixed bottom-4 inset-x-4 z-50 bg-[var(--ink-2,#0b0b0e)] border border-white/10 rounded-2xl p-4 text-[var(--text,#EAEAF2)] shadow-xl">
      <p className="text-sm">
        We use cookies to improve your experience. Manage your preferences in settings.
      </p>
      <div className="mt-3 flex gap-2">
        <button className="px-4 py-2 rounded-xl bg-[var(--turquoise,#40C4B4)] text-[var(--ink,#07080a)]" onClick={() => { localStorage.setItem(KEY, "all"); setOpen(false); }}>Accept all</button>
        <button className="px-4 py-2 rounded-xl border border-white/20" onClick={() => { localStorage.setItem(KEY, "essential"); setOpen(false); }}>Essential only</button>
      </div>
    </div>
  );
}
