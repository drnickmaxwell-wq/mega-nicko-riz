import ContactFormClient from "@/components/contact/ContactFormClient";

export const metadata = {
  title: "Contact — St Mary’s House Dental Care",
  description: "Get in touch to book or ask a question."
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[var(--maxw,1200px)] px-6 py-16">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <ContactFormClient />
    </main>
  );
}
