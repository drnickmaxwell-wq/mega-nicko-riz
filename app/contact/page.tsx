export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata = {
  title: "Contact | St Mary’s House",
  description: "Book a consultation or ask a question.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[var(--content)] px-6 py-16">
      <h1 className="text-3xl font-semibold">Contact & Book</h1>
      <p className="mt-3 opacity-80">
        Call <a className="underline" href="tel:+441273453109">01273 453109</a> or send us a message.
      </p>
      <form className="mt-6 grid gap-3 max-w-xl">
        <input name="name" placeholder="Your name" className="rounded-md border px-3 py-2" />
        <input name="email" placeholder="Email" className="rounded-md border px-3 py-2" />
        <input name="phone" placeholder="Phone" className="rounded-md border px-3 py-2" />
        <textarea name="message" placeholder="How can we help?" className="rounded-md border px-3 py-2 min-h-[120px]" />
        <button className="rounded-md px-5 py-2 text-white" style={{ background:"var(--magenta)", boxShadow:"var(--glow-magenta)" }}>
          Send
        </button>
      </form>
    </main>
  );
}
