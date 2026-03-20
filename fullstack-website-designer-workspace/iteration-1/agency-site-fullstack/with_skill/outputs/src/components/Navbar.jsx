'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { label: 'Work',    href: '#case-studies' },
  { label: 'Team',    href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const navRef  = useRef(null);
  const logoRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Entry animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from(navRef.current, { y: -80, opacity: 0, duration: 0.9, delay: 0.3 });
    tl.from('.nav-link', { y: -20, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=0.5');
  }, []);

  // Scroll-based background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Magnetic logo
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;
    const handleMove = (e) => {
      const rect = logo.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      gsap.to(logo, { x, y, duration: 0.4, ease: 'power2.out' });
    };
    const handleLeave = () => gsap.to(logo, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
    logo.addEventListener('mousemove', handleMove);
    logo.addEventListener('mouseleave', handleLeave);
    return () => {
      logo.removeEventListener('mousemove', handleMove);
      logo.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const navStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.25rem 2.5rem',
    borderBottom: `3px solid ${scrolled ? '#ffffff' : 'transparent'}`,
    background: scrolled
      ? 'rgba(0,0,0,0.95)'
      : 'transparent',
    backdropFilter: scrolled ? 'blur(18px)' : 'none',
    transition: 'background 0.35s ease, border-color 0.35s ease',
  };

  return (
    <nav ref={navRef} style={navStyle} aria-label="Main navigation">
      {/* Logo */}
      <a
        ref={logoRef}
        href="/"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          fontWeight: 900,
          letterSpacing: '0.05em',
          color: '#fff',
          display: 'inline-block',
          lineHeight: 1,
        }}
        aria-label="Apex Studio — home"
      >
        APEX<span style={{ color: 'var(--color-accent)' }}>.</span>
      </a>

      {/* Desktop nav links */}
      <ul
        style={{
          display: 'flex',
          gap: '2.5rem',
          listStyle: 'none',
          alignItems: 'center',
        }}
        role="list"
      >
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="nav-link"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.75)',
                transition: 'color 0.2s ease',
                position: 'relative',
                paddingBottom: '2px',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
            >
              {label}
            </a>
          </li>
        ))}

        {/* CTA */}
        <li>
          <a
            href="#contact"
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.5rem', fontSize: '0.7rem' }}
          >
            Let's talk
          </a>
        </li>
      </ul>
    </nav>
  );
}
