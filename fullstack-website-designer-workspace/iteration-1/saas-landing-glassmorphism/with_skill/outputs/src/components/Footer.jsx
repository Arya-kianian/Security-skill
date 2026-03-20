const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Changelog', href: '#changelog' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Status', href: '#status' },
  ],
  Developers: [
    { label: 'Documentation', href: '#docs' },
    { label: 'API Reference', href: '#api' },
    { label: 'SDKs', href: '#sdks' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'Open source', href: '#oss' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Careers', href: '#careers' },
    { label: 'Press kit', href: '#press' },
    { label: 'Contact', href: '#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Cookie Policy', href: '#cookies' },
    { label: 'DPA', href: '#dpa' },
  ],
};

const SOCIAL = [
  {
    label: 'X (Twitter)',
    href: '#twitter',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M14 3H16.5L11.25 9L17 15H12.5L8.5 10.5L4 15H1.5L7 8.7L1.5 3H6.1L9.75 7.1L14 3Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: '#github',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 1.5C4.858 1.5 1.5 4.858 1.5 9c0 3.315 2.152 6.126 5.137 7.116.375.069.512-.163.512-.361 0-.178-.007-.651-.01-1.278-2.088.453-2.529-.995-2.529-.995-.341-.868-.833-1.1-.833-1.1-.681-.465.051-.456.051-.456.753.053 1.149.773 1.149.773.669 1.146 1.755.815 2.183.623.068-.484.262-.815.477-.1002-1.667-.189-3.419-.833-3.419-3.707 0-.819.293-1.489.773-2.013-.078-.19-.335-.952.073-1.985 0 0 .63-.201 2.063.769A7.19 7.19 0 019 5.5c.638.003 1.28.086 1.879.253 1.432-.97 2.061-.769 2.061-.769.41 1.033.153 1.795.075 1.985.481.524.772 1.194.772 2.013 0 2.882-1.755 3.516-3.428 3.701.27.232.51.69.51 1.391 0 1.004-.009 1.814-.009 2.06 0 .2.135.434.516.36C15.35 15.122 17.5 12.313 17.5 9c0-4.142-3.358-7.5-7.5-7.5H9z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#linkedin',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M5.5 7.5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="5.5" cy="5.5" r="0.75" fill="currentColor"/>
        <path d="M8.5 12.5V9.75C8.5 8.5 9.25 7.5 10.5 7.5s2 1 2 2.25v2.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <style>{`
        .footer {
          background: var(--color-bg);
          border-top: 1px solid rgba(99,102,241,0.1);
          padding: var(--space-3xl) 0 var(--space-xl);
        }
        .footer__inner {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--space-2xl);
          margin-bottom: var(--space-2xl);
        }
        .footer__brand {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .footer__logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--color-text);
        }
        .footer__logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .footer__tagline {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          line-height: 1.6;
          max-width: 260px;
        }
        .footer__social {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
        .footer__social-link {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: var(--color-text-faint);
          transition: all 0.2s;
        }
        .footer__social-link:hover {
          color: var(--color-primary-h);
          border-color: rgba(99,102,241,0.3);
          background: rgba(99,102,241,0.08);
        }
        .footer__social-link:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }
        .footer__links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        .footer__col-title {
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text);
          margin-bottom: 1rem;
        }
        .footer__col-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer__link {
          font-size: var(--text-sm);
          color: var(--color-text-faint);
          transition: color 0.15s;
        }
        .footer__link:hover { color: var(--color-text-muted); }
        .footer__link:focus-visible {
          outline: 2px solid var(--color-primary);
          border-radius: 2px;
        }
        .footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--space-lg);
          border-top: 1px solid rgba(255,255,255,0.05);
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer__copy {
          font-size: var(--text-xs);
          color: var(--color-text-faint);
        }
        .footer__badges {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .footer__badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-text-faint);
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
        }
        .footer__newsletter {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        .footer__newsletter-input {
          flex: 1;
          min-width: 0;
          padding: 0.6rem 0.875rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-full);
          color: var(--color-text);
          font-size: var(--text-sm);
          font-family: var(--font-body);
          outline: none;
          transition: border-color 0.2s;
        }
        .footer__newsletter-input::placeholder { color: var(--color-text-faint); }
        .footer__newsletter-input:focus { border-color: rgba(99,102,241,0.4); }
        .footer__newsletter-btn {
          padding: 0.6rem 1.1rem;
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          color: #fff;
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: opacity 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .footer__newsletter-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .footer__newsletter-btn:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }
        @media (max-width: 1024px) {
          .footer__inner { grid-template-columns: 1fr; }
          .footer__links { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .footer__links { grid-template-columns: 1fr 1fr; }
          .footer__bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="container">
        <div className="footer__inner">
          {/* Brand col */}
          <div className="footer__brand">
            <a href="#" className="footer__logo" aria-label="Luminary home">
              <div className="footer__logo-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 2L11.5 7H16.5L12.5 10.5L14 15.5L9 12.5L4 15.5L5.5 10.5L1.5 7H6.5L9 2Z"
                    fill="white"
                  />
                </svg>
              </div>
              Luminary
            </a>

            <p className="footer__tagline">
              AI-powered analytics that illuminate every decision. Real-time insights
              for modern data teams.
            </p>

            {/* Newsletter */}
            <form
              className="footer__newsletter"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                className="footer__newsletter-input"
                placeholder="Enter your email"
                aria-label="Email address for newsletter"
                required
              />
              <button type="submit" className="footer__newsletter-btn">
                Subscribe
              </button>
            </form>

            {/* Social */}
            <nav className="footer__social" aria-label="Social media links">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer__social-link"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </nav>
          </div>

          {/* Links grid */}
          <nav aria-label="Footer navigation">
            <div className="footer__links">
              {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                <div key={category}>
                  <h3 className="footer__col-title">{category}</h3>
                  <ul className="footer__col-list">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className="footer__link">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {year} Luminary, Inc. All rights reserved.
          </p>
          <div className="footer__badges" aria-label="Compliance certifications">
            {['SOC 2 Type II', 'GDPR', 'HIPAA Ready', 'ISO 27001'].map((b) => (
              <span key={b} className="footer__badge">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                  <circle cx="4" cy="4" r="3" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M2.5 4l1 1 2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
