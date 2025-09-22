// app/pwa/page.tsx
import nextDynamic from "next/dynamic";
import type { Metadata } from "next";

/** Stop build-time pre-render for /pwa */
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "PWA | St Mary’s House",
  description: "App-style pages for patients.",
  robots: { index: false, follow: false, nocache: true }, // keep NOINDEX until ready
};

// Use a different import name so it doesn't clash with the page setting above
const PWAClient = nextDynamic(() => import("./_client"), { ssr: false });

export default function Page() {
  return <PWAClient />;
}
