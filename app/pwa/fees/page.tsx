export const metadata = {
  title: "Fees — St Mary’s House Dental Care",
  description: "Transparent pricing with finance options available."
};
export default function FeesPage() {
  const rows = [
    { name: "New patient consultation", price: "£95" },
    { name: "Implant consultation", price: "£120" },
    { name: "Spark aligners (from)", price: "£2,500" },
    { name: "3D-printed veneers (from)", price: "£400 per tooth" },
    { name: "Whitening", price: "£350" },
  ];
  return (
    <main className="mx-auto max-w-[var(--maxw,1200px)] px-6 py-16">
      <h1 className="text-3xl font-semibold">Fees</h1>
      <table className="mt-6 w-full text-sm border-separate border-spacing-y-2">
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="bg-white/5">
              <td className="px-4 py-3 rounded-l-xl">{r.name}</td>
              <td className="px-4 py-3 text-right rounded-r-xl">{r.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-white/70">Finance available (subject to status) via Tabeo.</p>
    </main>
  );
}
