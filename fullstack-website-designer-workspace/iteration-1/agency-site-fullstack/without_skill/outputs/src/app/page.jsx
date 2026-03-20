/**
 * Home Page — Apex Studio
 *
 * Section order:
 * 1. Hero     — full-screen canvas particle field + GSAP title reveal
 * 2. Marquee  — infinite horizontally-scrolling services strip
 * 3. Work     — GSAP ScrollTrigger horizontal-scroll case studies (5 cards)
 * 4. Team     — 3D tilt-card grid with scroll-triggered entrance
 * 5. Contact  — two-column form + info with Express backend integration
 * 6. Footer
 */

import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';

// Dynamic imports for all heavy/client components to keep the initial
// server payload minimal and avoid SSR hydration mismatches with GSAP.
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const Marquee = dynamic(() => import('@/components/Marquee'), { ssr: false });
const HorizontalScroll = dynamic(() => import('@/components/HorizontalScroll'), { ssr: false });
const TeamSection = dynamic(() => import('@/components/TeamSection'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/ContactSection'), { ssr: false });

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Marquee strip */}
      <Marquee speed={0.6} direction={1} />

      {/* 3. Work — horizontal scroll */}
      <HorizontalScroll />

      {/* 4. Team — 3D tilt cards */}
      <TeamSection />

      {/* 5. Contact */}
      <ContactSection />

      {/* 6. Footer */}
      <Footer />
    </>
  );
}
