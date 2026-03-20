'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScrollProvider
 * Wraps the app with Lenis for butter-smooth scrolling.
 * Integrates with GSAP's ticker for frame-perfect animations.
 */
export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    let gsap;

    async function init() {
      const gsapModule = await import('gsap');
      gsap = gsapModule.default || gsapModule.gsap;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      // Expose lenis globally so GSAP ScrollTrigger can use it
      window.__lenis = lenis;

      // Hook Lenis into GSAP ticker
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      // Update ScrollTrigger on scroll if available
      lenis.on('scroll', () => {
        if (window.ScrollTrigger) {
          window.ScrollTrigger.update();
        }
      });
    }

    init();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return <>{children}</>;
}
