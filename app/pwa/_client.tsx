// app/pwa/_client.tsx
"use client";

export default function PWAClient() {
  return (
    <main className="min-h-dvh flex items-center justify-center p-10">
      <div className="max-w-xl w-full rounded-xl border border-black/10 bg-white/80 p-6 text-black">
        <h1 className="text-2xl font-semibold">PWA Area</h1>
        <p className="mt-3">
          This is a placeholder so Vercel can build cleanly. We’ll wire the real PWA sections after previews are stable.
        </p>
      </div>
    </main>
  );
}
