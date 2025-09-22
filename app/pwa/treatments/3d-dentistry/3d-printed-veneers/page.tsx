import Reveal from "@/components/effects/Reveal";
import { serviceJsonLd } from "@/lib/seo/service";

export const metadata = {
  title: "3D-Printed Veneers — St Mary’s House Dental Care",
  description: "Fast, cost-effective veneers produced with 3D precision."
};

export default function TreatmentPage() {
  const jsonld = serviceJsonLd({
    name: "3D-Printed Veneers",
    url: "/pwa/treatments/3d-dentistry/3d-printed-veneers"
  });

  return (
    <main className="mx-auto max-w-[var(--maxw,1200px)] px-6 py-16">
      <script type="application/ld+json">
        {JSON.stringify(jsonld)}
      </script>
      <h1 className="text-3xl font-semibold">3D-Printed Veneers</h1>
      <Reveal>
        <p className="mt-4 text-white/80">Fast, cost-effective veneers produced with 3D precision.</p>
      </Reveal>
    </main>
  );
}
