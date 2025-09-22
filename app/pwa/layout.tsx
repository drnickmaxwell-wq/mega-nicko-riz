// app/pwa/layout.tsx
/** Make ALL /pwa pages dynamic at runtime */
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function PWALayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
