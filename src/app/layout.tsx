import { PageProvider } from '@/context';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SGR Universidad de Caldas',
  description: 'Generated by create next app',
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <PageProvider>{children}</PageProvider>
      </body>
    </html>
  );
}
