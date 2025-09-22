// lib/pageContext.ts
// Minimal "what page am I on?" helper for page-aware answers.
// You can grow this per route with facts/FAQs you want the bot to know.

export type PageContext = {
  slug: string;
  summary: string;
  faqs?: { q: string; a: string }[];
  ctas?: { label: string; href: string }[];
};

export function resolvePageContext(pathname: string): PageContext {
  // Normalise
  const p = (pathname || "/").toLowerCase();

  // Veneers
  if (p.includes("/treatments/veneers") || p.includes("3d-printed-veneers")) {
    return {
      slug: "treatments/veneers",
      summary:
        "This page is about 3D-Printed Veneers: same-day veneers, CAD/CAM design, digital smile preview, in-house printing.",
      faqs: [
        { q: "How long do 3D veneers last?", a: "Longevity depends on bite and care; our team will advise suitability during consultation." },
        { q: "Are they same-day?", a: "Often yes; the workflow is scan → design → preview → print/fit in a single visit." },
      ],
      ctas: [
        { label: "Book Consultation", href: "/contact" },
        { label: "Fees & Finance", href: "/fees" },
      ],
    };
  }

  // Implants
  if (p.includes("/treatments/implants")) {
    return {
      slug: "treatments/implants",
      summary:
        "This page is about Dental Implants: digitally planned, guided placement, custom implant crowns/bridges, sedation available.",
      faqs: [
        { q: "Are implants safe?", a: "Implants are established; we assess medical history, bone and bite before recommending." },
        { q: "Do they hurt?", a: "Treatment is done with local anaesthetic; sedation is available for anxious patients." },
      ],
      ctas: [
        { label: "Book Consultation", href: "/contact" },
        { label: "Emergency Care", href: "/pwa/emergency-dentist" },
      ],
    };
  }

  // Emergency
  if (p.includes("/emergency") || p.includes("/pwa/emergency")) {
    return {
      slug: "emergency",
      summary:
        "Emergency dentistry page: toothache/trauma, same-day slots, call +44 1273 453109. No diagnosis in chat; prompt phone call.",
      faqs: [
        { q: "Do you have same-day appointments?", a: "Yes— we reserve urgent slots daily. Please call +44 1273 453109." },
      ],
      ctas: [
        { label: "Call Now", href: "tel:+441273453109" },
        { label: "Directions", href: "https://maps.google.com/?q=St+Mary’s+House+Dental+Care+BN43+5ZA" },
      ],
    };
  }

  // Default (homepage etc.)
  return {
    slug: "home",
    summary:
      "Home page: luxury private dentistry in Shoreham-by-Sea with 3D smile design, in-house printing, implants, Spark Aligners, and general care.",
    faqs: [
      { q: "Do you treat nervous patients?", a: "Yes—calm, unhurried care and sedation options where appropriate." },
      { q: "Do you offer finance?", a: "Yes—monthly options via Tabeo, subject to status." },
    ],
    ctas: [
      { label: "Book Consultation", href: "/contact" },
      { label: "Fees & Finance", href: "/fees" },
    ],
  };
}
