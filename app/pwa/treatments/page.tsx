import Reveal from "@/components/effects/Reveal";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Treatments — St Mary’s House Dental Care",
  description: "Explore general, cosmetic, and 3D dentistry treatments."
};

export default function TreatmentsIndex() {
  const groups = [
    { name: "3D Dentistry", items: [
      { name: "3D-Printed Veneers", href: "/treatments/3d-dentistry/3d-printed-veneers" },
      { name: "3D Implant Restorations", href: "/treatments/3d-dentistry/3d-implant-restorations" },
      { name: "3D Dentures", href: "/treatments/3d-dentistry/3d-dentures" },
      { name: "Surgically Guided Implants", href: "/treatments/3d-dentistry/surgically-guided-implants" },
      { name: "Spark Aligners", href: "/treatments/3d-dentistry/spark-aligners" },
    ]},
    { name: "Cosmetic", items: [
      { name: "Whitening", href: "/treatments/cosmetic/whitening" },
      { name: "Composite Bonding", href: "/treatments/cosmetic/composite-bonding" },
      { name: "Orthodontics", href: "/treatments/cosmetic/orthodontics" },
    ]},
    { name: "General", items: [
      { name: "Restorative", href: "/treatments/general/restorative" },
      { name: "Children", href: "/treatments/general/children" },
      { name: "Sedation", href: "/treatments/general/sedation" },
      { name: "The Wand", href: "/treatments/general/the-wand" },
    ]},
  ];
  return (
    <main className="mx-auto max-w-[var(--maxw,1200px)] px-6 py-16">
      <h1 className="text-3xl font-semibold">Treatments</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {groups.map((g)=> (
          <Reveal key={g.name}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold">{g.name}</h2>
              <ul className="mt-4 space-y-2">
                {g.items.map((it)=> (
                  <li key={it.href}>
                    <a className="text-[var(--turquoise,#40C4B4)] hover:underline" href={it.href}>{it.name}</a>
                  </li>
                ))}
              </ul>
              <Button className="mt-4" onClick={()=> location.href="/appointments"}>Book a consultation</Button>
            </div>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
