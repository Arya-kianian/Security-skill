import './globals.css';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import CustomCursor from '@/components/CustomCursor';
import Nav from '@/components/Nav';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

export const metadata = {
  title: 'Apex Studio — Bold Creative Agency',
  description:
    'Apex Studio crafts digital experiences that demand attention. Branding, web design, and motion for brands that refuse to blend in.',
  keywords: 'creative agency, branding, web design, motion design, UI/UX',
  openGraph: {
    title: 'Apex Studio — Bold Creative Agency',
    description: 'Digital experiences that demand attention.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Studio',
    description: 'Bold creative agency crafting digital experiences.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body>
        <CustomCursor />
        <Nav />
        <SmoothScrollProvider>
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
