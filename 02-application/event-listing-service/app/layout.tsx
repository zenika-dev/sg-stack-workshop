import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Event Listing Service',
  description: 'Public list of upcoming events ordered by prominence score',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
