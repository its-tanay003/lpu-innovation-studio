import type { Metadata } from 'next';
import { Orbitron, Exo_2, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ClientLayout } from '@/components/layout/ClientLayout';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo2',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const metadata: Metadata = {
  title: 'LPU Innovation Studio | Build the Future',
  description: 'Lovely Professional University\'s 50,000 sq ft technology facility. From theory to hands-on. From idea to national competition.',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          orbitron.variable,
          exo2.variable,
          jetbrains.variable,
          'min-h-screen bg-bg-base font-exo2 text-white antialiased'
        )}
      >
        <div className="bg-circuit fixed inset-0 pointer-events-none opacity-20" />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
