import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
  { label: 'Blog', href: '#blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const progressBar = document.querySelector('.scroll-progress');

    function onScroll() {
      setScrolled(window.scrollY > 20);
      if (progressBar) {
        const pct =
          window.scrollY /
          (document.body.scrollHeight - window.innerHeight);
        progressBar.style.transform = `scaleX(${pct})`;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
      role="banner"
    >
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          background: rgba(15, 10, 30, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .navbar--scrolled {
          background: rgba(15, 10, 30, 0.92);
          border-bottom-color: rgba(99, 102, 241, 0.12);
        }
        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--color-text);
        }
        .navbar__logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .navbar__nav {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
        }
        .navbar__link {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-text-muted);
          transition: color 0.2s ease;
          position: relative;
        }
        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
          transition: width 0.2s ease;
        }
        .navbar__link:hover { color: var(--color-text); }
        .navbar__link:hover::after { width: 100%; }
        .navbar__actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .navbar__signin {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-text-muted);
          transition: color 0.2s ease;
          padding: 0.5rem 0.75rem;
        }
        .navbar__signin:hover { color: var(--color-text); }
        .navbar__menu-btn {
          display: none;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: var(--color-text-muted);
          font-size: 1.25rem;
          transition: background 0.2s;
          cursor: pointer;
        }
        .navbar__menu-btn:hover { background: rgba(255,255,255,0.08); }
        .navbar__mobile {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(15, 10, 30, 0.97);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(99,102,241,0.1);
          padding: 1rem 2rem 1.5rem;
          flex-direction: column;
          gap: 1rem;
        }
        .navbar__mobile.open { display: flex; }
        .navbar__mobile a {
          font-size: var(--text-base);
          font-weight: 500;
          color: var(--color-text-muted);
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: color 0.2s;
        }
        .navbar__mobile a:hover { color: var(--color-text); }
        @media (max-width: 768px) {
          .navbar__nav, .navbar__actions .btn { display: none; }
          .navbar__menu-btn { display: flex; }
        }
      `}</style>

      {/* Logo */}
      <a href="#" className="navbar__logo" aria-label="Luminary home">
        <div className="navbar__logo-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 2L11.5 7H16.5L12.5 10.5L14 15.5L9 12.5L4 15.5L5.5 10.5L1.5 7H6.5L9 2Z"
              fill="white"
            />
          </svg>
        </div>
        Luminary
      </a>

      {/* Desktop nav */}
      <nav aria-label="Primary navigation">
        <ul className="navbar__nav">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="navbar__link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Actions */}
      <div className="navbar__actions">
        <a href="#signin" className="navbar__signin">
          Sign in
        </a>
        <a href="#signup" className="btn btn-primary">
          Get started free
        </a>
        <button
          className="navbar__menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      <nav
        className={`navbar__mobile${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a href="#signin">Sign in</a>
        <a href="#signup" className="btn btn-primary" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          Get started free
        </a>
      </nav>
    </header>
  );
}
