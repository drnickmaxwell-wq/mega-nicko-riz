import Reveal from "@/components/effects/Reveal";
import { serviceJsonLd } from "@/lib/seo/service";

export const metadata = {
  title: "3D Implant Restorations — St Mary’s House Dental Care",
  description: "Digitally planned implant crowns and bridges for accuracy and comfort."
};

export default function TreatmentPage() {
  const jsonld = serviceJsonLd({
    name: "3D Implant Restorations",
    url: "/pwa/treatments/3d-dentistry/3d-implant-restorations"
  });

  return (
    <main className="mx-auto max-w-[var(--maxw,1200px)] px-6 py-16">
      <script type="application/ld+json">
        {JSON.stringify(jsonld)}
      </script>
      <h1 className="text-3xl font-semibold">3D Implant Restorations</h1>
      <Reveal>
        <p className="mt-4 text-white/80">Digitally planned implant crowns and bridges for accuracy and comfort.</p>
      </Reveal>
    </main>
  );
}
