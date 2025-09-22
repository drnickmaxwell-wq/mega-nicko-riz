// app/page.tsx
export const metadata = {
  title: "St Mary’s House Dental Care | Luxury Coastal Dentistry",
  description: "Experience advanced 3D-first dentistry in Shoreham-by-Sea. Our luxury practice offers cosmetic, implant, and family dental care."
};

import dynamic from 'next/dynamic';

// Dynamically import the client component to keep this file a server component
const HomeClient = dynamic(() => import('./_client'), { ssr: false });

export default function Page() {
  return <HomeClient />;
}
