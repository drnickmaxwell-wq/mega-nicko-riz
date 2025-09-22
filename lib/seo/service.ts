export function serviceJsonLd(input: { name: string; url: string; area?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: input.name,
    url: input.url,
    areaServed: input.area || "Shoreham-by-Sea"
  };
}
