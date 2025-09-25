export const metadata = { robots: { index: false, follow: false, nocache: true } };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div data-theme="ink">{children}</div>;
}
