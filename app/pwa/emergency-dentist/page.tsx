// app/pwa/emergency-dentist/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import { redirect } from 'next/navigation';

export default function Page() {
  // keep this page tiny; send users to the canonical emergency page
  redirect('/pwa/patient-care/emergency');
}
