import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { AppStateProvider } from '@/context/AppStateContext';
import { Intro } from '@/components/common/Intro';
import { Header } from '@/components/common/Header';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Crimson Stream',
  description: 'A sleek media streaming app for browsing and watching movies and TV shows.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Creepster&display=swap" rel="stylesheet"></link>
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col')}>
        <AppStateProvider>
          <AuthProvider>
            <Intro>
              <Header />
              <main className="flex-grow">
                {children}
              </main>
            </Intro>
          </AuthProvider>
        </AppStateProvider>
        <Toaster />
      </body>
    </html>
  );
}
