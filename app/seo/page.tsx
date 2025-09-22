import SEOHead from '@/features/seo/SEOHead';

export default function SEOShowcase() {
  return (
    <main className="min-h-screen p-10">
      <SEOHead title="Zero-Click SEO" description="Structured data and instant answers." />
      <h1 className="text-3xl font-semibold">Zero-Click SEO</h1>
      <p className="opacity-80 mt-2">Demo page to verify metadata, schema.org and rich results.</p>
    </main>
  );
}
