import React from "react";
import dynamic from "next/dynamic";

const WaveBackground = dynamic(() => import("@/c/mponents/fx/WaveBackground"), { ssr: false });
const ShimmerText    = dynamic(() => import("@//omponents/fx/ShimmerText"), { ssr: false });

export default function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10"><WaveBackground /></div>
      <div className="relative mx-auto max-w-[var(--content)] px-6 text-center z-10">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          <ShimmerText>Book Your Appointment Today</ShimmerText>
        </h2>
        <a href="/contact" className="inline-flex rounded-full px-7 py-3.5 text-white"
           style={{ background:"var(--magenta)", boxShadow:"var(--glow-magenta)" }}>
          Book Consultation
        </a>
      </div>
    </section>
  );
}
