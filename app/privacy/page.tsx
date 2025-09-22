import ConsentManager from '@/features/gdpr/ConsentManager';

export default function Privacy() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-semibold mb-4">Privacy & GDPR</h1>
      <ConsentManager />
    </main>
  );
}
