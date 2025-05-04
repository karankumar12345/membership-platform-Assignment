import './globals.css';
import type { Metadata } from 'next';

import { ThemeProvider } from '../components/ThemeProvider';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
// import { ThemeProvider } from '@/components/ThemeProvider';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';



export const metadata: Metadata = {
  title: 'Community Hub',
  description: 'A platform for community members to connect, share, and grow together',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}