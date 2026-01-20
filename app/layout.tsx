import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Crayfish Dissection Mapping Application',
  description: 'Interactive map for visualizing crayfish research data',
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

