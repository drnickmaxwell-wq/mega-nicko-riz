export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

import ManusPreviewClient from './_client';

export default function Page() {
  return <ManusPreviewClient />;
}
