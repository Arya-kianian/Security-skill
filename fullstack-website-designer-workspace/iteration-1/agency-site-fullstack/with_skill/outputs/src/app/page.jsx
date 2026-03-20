'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CaseStudies from '@/components/CaseStudies';
import Team from '@/components/Team';
import Contact from '@/components/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    // ── Scroll progress bar ──────────────────────────────────────
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }

    // ── Universal reveal animations ──────────────────────────────
    const revealTargets = [
      { selector: '.reveal-up',    from: { y: 70, opacity: 0 } },
      { selector: '.reveal-left',  from: { x: -70, opacity: 0 } },
      { selector: '.reveal-right', from: { x: 70,  opacity: 0 } },
      { selector: '.reveal-scale', from: { scale: 0.82, opacity: 0 } },
    ];

    revealTargets.forEach(({ selector, from }) => {
      gsap.utils.toArray(selector).forEach((el) => {
        gsap.from(el, {
          ...from,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });
    });

    // ── Stagger groups ───────────────────────────────────────────
    gsap.utils.toArray('[data-stagger]').forEach((group) => {
      const children = group.children;
      gsap.from(children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: group,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <CaseStudies />
      <Team />
      <Contact />

      {/* Footer */}
      <footer
        style={{
          borderTop: '3px solid #ffffff',
          padding: '3rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'rgba(255,255,255,0.5)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.25rem' }}>
          APEX STUDIO
        </span>
        <span>© {new Date().getFullYear()} Apex Studio. All rights reserved.</span>
        <nav aria-label="Footer navigation" style={{ display: 'flex', gap: '2rem' }}>
          <a href="#case-studies" style={{ color: 'rgba(255,255,255,0.5)' }}>Work</a>
          <a href="#team" style={{ color: 'rgba(255,255,255,0.5)' }}>Team</a>
          <a href="#contact" style={{ color: 'rgba(255,255,255,0.5)' }}>Contact</a>
        </nav>
      </footer>
    </main>
  );
}
