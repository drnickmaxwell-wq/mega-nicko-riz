"use client";

import WaveBackgroundLayered from "@/components/fx/WaveBackgroundLayered";
import ShimmerTextJson from "@/components/fx/ShimmerTextJson";
import GlowCard from "@/components/fx/GlowCard";
import SparkleButtonJson from "@/components/ui/SparkleButtonJson";
import { tokenGradient, read } from "@/lib/design/token-utils";

// HERO (video + overlay + optional waves)
export function HeroSection({ section }: { section:any }) {
  const overlay = section?.background?.overlay
    ? section.background.overlay
    : "linear-gradient(135deg, rgba(0,0,0,.35), rgba(0,0,0,.35))";

  const waves = section?.background?.waves;
  const videoSrc = "/videos/hero/coastal-dental-hero.mp4";
  const poster = "/videos/hero/hero-poster.jpg";

  return (
    <section className="relative w-full overflow-hidden">
      <video className="w-full h-[70vh] object-cover" src={videoSrc} poster={poster} autoPlay muted loop playsInline preload="metadata" />
      <div className="absolute inset-0" style={{ background: overlay, mixBlendMode: "multiply" }} />
      <div className="absolute inset-0 grid place-items-center text-center px-6 z-10">
        <div className="mx-auto" style={{ maxWidth: section.content?.maxWidth || "1200px", padding: section.content?.padding || "8rem 2rem" }}>
          <h1 className="font-[700]" style={{ fontFamily:"var(--font-secondary, 'Playfair Display', serif)", fontSize:"clamp(2.5rem,6vw,3.5rem)", color:"#fff", lineHeight:1.2 }}>
            <ShimmerTextJson variant="primary">Experience Luxury</ShimmerTextJson>
          </h1>
          {section.content?.typography?.subheading && (
            <p className="mt-4 text-white opacity-90" style={{ fontFamily:"Montserrat, sans-serif", fontSize:"clamp(1rem,2.4vw,1.5rem)" }}>
              Coastal Dental Care — advanced 3D dentistry in Shoreham-by-Sea.
            </p>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <SparkleButtonJson variant="primary" href="/contact">Book Consultation</SparkleButtonJson>
            <SparkleButtonJson variant="emergency" href="/pwa/emergency-dentist">Emergency Care</SparkleButtonJson>
          </div>
        </div>
      </div>
      {waves && (
        <div className="absolute -bottom-1 left-0 right-0 h-24">
          <WaveBackgroundLayered layers={[
            { opacity:.7, colors:["#C2185B"], speed:"20s", amplitude:"20px" },
            { opacity:.5, colors:["#40C4B4"], speed:"15s", amplitude:"15px" },
            { opacity:.3, colors:["#D4AF37"], speed:"25s", amplitude:"25px" },
          ]}/>
        </div>
      )}
    </section>
  );
}

// GENERIC GRID renderer (for services/about/values/etc.)
export function CardsGrid({ section, kind }: { section:any; kind: string }) {
  const cfg   = read(kind, section.content) || read("cards", section.content) || {};
  const items = cfg.items || read("stats", section.content) || [];
  const cols  = cfg.columns || { desktop: 3 };

  return (
    <section className="mx-auto px-6 py-[6rem]" style={{ maxWidth: section.containerWidth || "1200px" }}>
      <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${cols.desktop || 3}, minmax(0,1fr))` }}>
        {items.map((it: any, i: number) => (
          <GlowCard key={i} className="p-6 group">
            <h3 className="text-xl font-semibold mb-2">{it.title || it.value || it.text}</h3>
            {it.description && <p className="opacity-80 mb-3">{it.description}</p>}
            {it.label && <p className="opacity-80">{it.label}</p>}
            {it.button?.text && <SparkleButtonJson variant="primary" href="#">{it.button.text}</SparkleButtonJson>}
          </GlowCard>
        ))}
      </div>
    </section>
  );
}

// CTA
export function CTASection({ section, tokens }: { section:any; tokens:any }) {
  const gradPath = section.background?.gradient || "gradients.pinkToTurquoise";
  const gradient = tokenGradient(gradPath, tokens) || "linear-gradient(135deg,#C2185B,#40C4B4)";
  return (
    <section className="relative py-[6rem] overflow-hidden">
      <div className="absolute inset-0" style={{ background: gradient, opacity: .95 }} />
      <div className="relative mx-auto max-w-[800px] px-6 text-center z-10 text-white">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Book Your Appointment Today</h2>
        <p className="opacity-90 mb-6">Friendly, modern care with 3D technology.</p>
        <div className="flex gap-4 justify-center">
          <SparkleButtonJson variant="gold" href="/contact">Book Your Appointment</SparkleButtonJson>
          <SparkleButtonJson variant="secondary" href="tel:+441273453109">Call Us</SparkleButtonJson>
        </div>
      </div>
    </section>
  );
}
