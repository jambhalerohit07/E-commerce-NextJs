import type { Metadata } from 'next';
import StoreProvider from '@/components/StoreProvider';
import Header from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'Next.js 16 E-Commerce Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
