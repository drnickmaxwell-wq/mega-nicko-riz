export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "St Mary’s House Dental Care",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "St Mary’s House, St Mary’s Road",
      "addressLocality": "Shoreham-by-Sea",
      "postalCode": "BN43 5ZA",
      "addressRegion": "West Sussex",
      "addressCountry": "GB"
    },
    "telephone": "01273 453109",
    "url": process.env.NEXT_PUBLIC_SITE_URL || ""
  };
}
