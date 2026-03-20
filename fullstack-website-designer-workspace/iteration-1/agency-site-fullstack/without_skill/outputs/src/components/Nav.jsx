'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '#work',    label: 'Work' },
  { href: '#about',   label: 'About' },
  { href: '#team',    label: 'Team' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const navRef = useRef(null);

  useEffect(() => {
    async function init() {
      const { default: gsap } = await import('gsap');

      // Entrance animation
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 2.5, ease: 'power3.out' }
      );
    }
    init();
  }, []);

  const handleAnchor = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="nav" ref={navRef} role="navigation" aria-label="Main navigation">
      <Link href="/" className="nav__logo">
        Apex<span>.</span>Studio
      </Link>
      <ul className="nav__links">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <a href={href} onClick={(e) => handleAnchor(e, href)}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
