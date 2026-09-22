import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import SiteChrome from '@/components/SiteChrome';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Crystal Express Limited | Bangladesh Freight Forwarding',
    template: '%s | Crystal Express Limited',
  },
  description:
    'The right route, managed from the first handover. Crystal Express coordinates air, ocean, inland and specialist logistics from Bangladesh origin onward.',
  metadataBase: new URL('https://www.crystalexpress.example'),
  robots: { index: false, follow: false }, // Flip to index/follow at launch
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
