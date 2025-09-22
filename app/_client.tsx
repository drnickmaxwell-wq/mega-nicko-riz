"use client";

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Link from 'next/link';

// Dynamically import hero and section components client-side only
const HeroVideo = dynamic(() => import('@/components/hero/cinematic-hero-video').then((m) => m.default), { ssr: false });
const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection').then((m) => m.default ?? (m as any).FeaturesSection), { ssr: false });
const TreatmentsSection = dynamic(() => import('@/components/sections/TreatmentsSection').then((m) => m.default ?? (m as any).TreatmentsSection), { ssr: false });

export default function HomeClient() {
  // Inject JSON-LD for organization
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "St Mary’s House Dental Care",
      logo: "/logo-placeholder.png"
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="relative isolate overflow-hidden bg-[var(--surface)] text-[var(--foreground)]">
      {/* Hero Section */}
      <section className="relative">
        <HeroVideo />
      </section>

      {/* Features Section */}
    <section className="relative py-24">
        <FeaturesSection />
      </section>

      {/* Treatments Section */}
    <section className="relative py-24">
        <TreatmentsSection />
      </section>

    <section className="py-24 px-4">
      <div className="mx-auto max-w-3xl rounded-3xl bg-[var(--surface)]/[0.6] backdrop-blur-lg shadow-lg p-8 text-center border border-[var(--foreground)]/10">
        <h2 className="text-3xl font-semibold mb-6">Ready to transform your smile?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" aria-label="Book consultation" className="inline-block px-8 py-3 rounded-full font-semibold bg-[var(--magenta)] text-[var(--surface)] hover:bg-[var(--magenta)]/90 focus:outline-none focus-visible:ring focus-visible:ring-[var(--magenta)]/50 transition">
            Book Consultation
          </Link>
          <Link href="/pwa/emergency-dentist" aria-label="Emergency dental care" className="inline-block px-8 py-3 rounded-full font-semibold bg-[var(--turquoise)] text-[var(--surface)] hover:bg-[var(--turquoise)]/90 focus:outline-none focus-visible:ring focus-visible:ring-[var(--turquoise)]/50 transition">
            Emergency Care
          </Link>
        </div>
      </div>
    </section>* Footer Section */}
      <footer className="py-8 text-center text-sm border-t border-[var(--foreground)]/10">
        © {new Date().getFullYear()} St Mary’s House Dental Care. All rights reserved.
      </footer>
    </main>
  );
}
