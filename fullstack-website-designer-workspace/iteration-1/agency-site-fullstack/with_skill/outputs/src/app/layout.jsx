import './globals.css';

export const metadata = {
  title: 'Apex Studio — Bold Creative Agency',
  description:
    'Apex Studio builds digital experiences that challenge convention. Branding, web, motion, and strategy for brands that refuse to blend in.',
  keywords: ['creative agency', 'web design', 'branding', 'motion design', 'Apex Studio'],
  openGraph: {
    title: 'Apex Studio — Bold Creative Agency',
    description: 'We build digital experiences that challenge convention.',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Unbounded:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Scroll progress bar — filled by GSAP ScrollTrigger in page.jsx */}
        <div className="scroll-progress" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
