import dynamic from "next/dynamic";

const Header     = dynamic(() => import("@/components/layout/Header"), { ssr: false });
const Footer     = dynamic(() => import("@/components/layout/Footer"), { ssr: false });
const ActionDock = dynamic(() => import("@/components/layout/ActionDock"), { ssr: false });

const Hero       = dynamic(() => import("@/components/hero/HeroVideo"), { ssr: false });
const Features   = dynamic(() => import("@/components/sections/FeaturesSection"), { ssr: false });
const Treatments = dynamic(() => import("@/components/sections/TreatmentsSection"), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection"), { ssr: false });

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[var(--content)] px-6">
        <Hero videoSrc="/videos/hero/coastal-dental-hero.mp4" posterSrc="/videos/hero/hero-poster.jpg" />
      </main>
      <section className="relative">
        <Features />
        <Treatments />
        <CTASection />
      </section>
      <Footer />
      <ActionDock />
    </>
  );
}
