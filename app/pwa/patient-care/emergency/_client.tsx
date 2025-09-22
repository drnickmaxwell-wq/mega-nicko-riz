"use client";

export default function EmergencyClient() {
  return (
    <main className="min-h-dvh flex items-center justify-center p-10">
      <div className="max-w-xl w-full rounded-xl border border-black/10 bg-white/80 p-6 text-black">
        <h1 className="text-2xl font-semibold">Emergency Dentistry</h1>
        <p className="mt-3">
          This is a placeholder client view so Vercel can build cleanly.
          We’ll wire the real emergency design after previews are stable.
        </p>
        <div className="mt-6 flex gap-4">
          <a href="tel:01273453109" className="rounded-full px-5 py-2 bg-red-600 text-white">
            Call 01273 453109
          </a>
          <a href="/contact" className="rounded-full px-5 py-2 border border-black/20">
            Contact Page
          </a>
        </div>
      </div>
    </main>
  );
}
