'use client';
import dynamic from 'next/dynamic';

const ToothViewer = dynamic(() => import('@/features/3d/ToothViewer').then(m=>m.ToothViewer), { ssr: false });
const ARBlock = dynamic(() => import('@/features/3d/ARViewer').then(m=>m.ARViewer), { ssr: false });

export default function ThreeDemo() {
  return (
    <main className="min-h-screen p-10 grid gap-10 lg:grid-cols-2">
      <section>
        <h2 className="text-2xl font-semibold mb-4">3D Tooth Viewer</h2>
        <ToothViewer modelPath="/models/sample.glb" autoRotate />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">AR Viewer</h2>
        <ARBlock modelPath="/models/sample.glb" />
      </section>
    </main>
  );
}
