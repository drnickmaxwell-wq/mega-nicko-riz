// app/_hero.tsx
'use client';

import dynamic from 'next/dynamic';

/* --------- Import A: prefer this if it exists --------- */
const Hero = dynamic(
  () =>
    import('@/components/hero/cinematic-hero-video')
      .then((m) => m.default ?? (() => null))
      .catch(() =>
        import('@/components/manus/effects/advanced-micro-animations').then((m) => m.default ?? (() => null))
      ),
  { ssr: false }
);

/* --------- Import B: use this if A is missing --------- */
// const Hero = dynamic(
//   () =>
//     import('@/components/hero/4k-hero-video')
//       .then((m) => m.default ?? (() => null))
//       .catch(() =>
//         import('@/components/manus/effects/advanced-micro-animations').then((m) => m.default ?? (() => null))
//       ),
//   { ssr: false }
// );

export default function HomeHero() {
  return <Hero />;
}
