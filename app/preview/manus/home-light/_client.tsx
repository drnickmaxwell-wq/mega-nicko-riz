"use client";

import dynamic from "next/dynamic";

// ✅ Use cinematic-hero-video only
const HeroVideo = dynamic(
  () => import("@/components/hero/cinematic-hero-video").then((m) => m.default),
  { ssr: false }
);

const FeaturesSection = dynamic(
  () =>
    import("@/components/sections/FeaturesSection").then(
      (m) => m.default ?? m.FeaturesSection
    ),
  { ssr: false }
);

const TreatmentsSection = dynamic(
  () =>
    import("@/components/sections/TreatmentsSection").then(
      (m) => m.default ?? m.TreatmentsSection
    ),
  { ssr: false }
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/TestimonialsSection").then(
      (m) => m.default ?? m.TestimonialsSection
    ),
  { ssr: false }
);

export default function HomeLightClient() {
  return (
    <main
      className="relative min-h-dvh bg-[var(--background)] text-[var(--foreground)] overflow-hidden"
      data-theme="light"
    >
      {/* Hero Video */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
        <HeroVideo
          videoSrc="/hero-video.mp4"
          posterSrc="/hero-poster.jpg"
          title="St Mary’s House Dental Care"
          subtitle="Light preview theme."
        />
        <div className="mt-8 flex gap-4">
          <a
            href="/contact"
            className="inline-flex items-center rounded-full px-6 py-3 bg-[var(--magenta)] text-white"
          >
            Book Consultation
          </a>
          <a
            href="/pwa/emergency-dentist"
            className="inline-flex items-center rounded-full px-6 py-3 bg-[var(--turquoise)] text-white"
          >
            Emergency Care
          </a>
        </div>
      </section>

      {/* Sections */}
      <section className="relative z-10 max-w-7xl w-full py-16 px-4 mx-auto">
        <FeaturesSection />
      </section>
      <section className="relative z-10 max-w-7xl w-full py-24 px-4 mx-auto">
        <TreatmentsSection />
      </section>
      <section className="relative z-10 max-w-7xl w-full py-16 px-4 mx-auto">
        <TestimonialsSection />
      </section>
    </main>
  );
}
