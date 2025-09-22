import Reveal from "@/components/effects/Reveal";
import { serviceJsonLd } from "@/lib/seo/service";

export const metadata = {
  title: "Spark Aligners — St Mary’s House Dental Care",
  description: "Discreet teeth straightening with 3D digital planning."
};

export default function TreatmentPage() {
  const jsonld = serviceJsonLd({
    name: "Spark Aligners",
    url: "/pwa/treatments/3d-dentistry/spark-aligners"
  });

  return (
    <main className="mx-auto max-w-[var(--maxw,1200px)] px-6 py-16">
      <script type="application/ld+json">
        {JSON.stringify(jsonld)}
      </script>
      <h1 className="text-3xl font-semibold">Spark Aligners</h1>
      <Reveal>
        <p className="mt-4 text-white/80">Discreet teeth straightening with 3D digital planning.</p>
      </Reveal>
    </main>
  );
}
