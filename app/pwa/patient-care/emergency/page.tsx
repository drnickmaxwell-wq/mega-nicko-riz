// app/pwa/patient-care/emergency/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export const metadata = {
  robots: { index: false, follow: false },
};

import Client from './_client';

export default function Page() {
  return <Client />;
}
