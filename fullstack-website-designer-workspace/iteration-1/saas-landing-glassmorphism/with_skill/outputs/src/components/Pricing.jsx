import { useEffect, useRef, useState } from 'react';

const TIERS = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    description: 'For individuals and small projects exploring analytics.',
    cta: 'Start for free',
    ctaHref: '#signup-free',
    featured: false,
    features: [
      '5M events / month',
      '3 dashboards',
      '7-day data retention',
      '2 team members',
      'Standard integrations (10)',
      'Community support',
      'REST API access',
    ],
    missing: [
      'AI anomaly detection',
      'Custom alerts',
      'SSO / SAML',
      'SLA guarantee',
    ],
  },
  {
    name: 'Pro',
    price: { monthly: 79, annual: 63 },
    description: 'For growing teams who need real-time analytics at scale.',
    cta: 'Start 14-day trial',
    ctaHref: '#signup-pro',
    featured: true,
    badge: 'Most popular',
    features: [
      '500M events / month',
      'Unlimited dashboards',
      '90-day data retention',
      'Up to 25 team members',
      'All 200+ integrations',
      'AI anomaly detection',
      'Custom alerting (Slack, PagerDuty)',
      'Priority email support',
      'REST + GraphQL API',
    ],
    missing: ['SSO / SAML', 'Dedicated infrastructure'],
  },
  {
    name: 'Enterprise',
    price: { monthly: null, annual: null },
    description: 'For large organisations with advanced compliance and scale requirements.',
    cta: 'Talk to sales',
    ctaHref: '#contact-sales',
    featured: false,
    features: [
      'Unlimited events',
      'Unlimited dashboards',
      'Custom data retention',
      'Unlimited team members',
      'All 200+ integrations',
      'AI anomaly detection + forecasting',
      'Custom alerting & runbooks',
      'SSO / SAML / SCIM',
      '99.9% uptime SLA',
      'Dedicated infrastructure',
      'Dedicated customer success manager',
      'Custom contract & invoicing',
    ],
    missing: [],
  },
];

function CheckIcon({ color = 'var(--color-primary)' }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="8" cy="8" r="7" fill={color} fillOpacity="0.15" />
      <path
        d="M5 8l2.5 2.5L11 5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="8" cy="8" r="7" fill="rgba(255,255,255,0.04)" />
      <path
        d="M6 6l4 4M10 6l-4 4"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      className="section pricing aurora-container"
      ref={sectionRef}
      aria-labelledby="pricing-title"
    >
      <style>{`
        .pricing {
          background: var(--color-bg);
        }
        .pricing .aurora-bg { opacity: 0.4; }
        .pricing__header {
          text-align: center;
          margin-bottom: var(--space-2xl);
          position: relative;
          z-index: 1;
        }
        .pricing__toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.35rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-full);
          margin-bottom: 2rem;
        }
        .pricing__toggle-label {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all 0.2s;
          user-select: none;
        }
        .pricing__toggle-label.active {
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          color: #fff;
          font-weight: 600;
        }
        .pricing__save-badge {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--color-primary-h);
          letter-spacing: 0.04em;
        }
        .pricing__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          align-items: start;
          position: relative;
          z-index: 1;
        }
        .pricing-card {
          padding: 2rem;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .pricing-card--featured {
          border-color: rgba(99, 102, 241, 0.5) !important;
          box-shadow:
            0 0 0 1px rgba(99,102,241,0.2),
            0 20px 60px rgba(99,102,241,0.15),
            0 8px 32px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.1) !important;
          background: rgba(99, 102, 241, 0.06) !important;
        }
        .pricing-card--featured::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.4));
          z-index: -1;
        }
        .pricing-card__badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.75rem;
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 1.25rem;
          align-self: flex-start;
        }
        .pricing-card__name {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 800;
          color: var(--color-text);
          margin-bottom: 0.5rem;
        }
        .pricing-card__desc {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }
        .pricing-card__price {
          margin-bottom: 1.75rem;
        }
        .pricing-card__amount {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--color-text);
          line-height: 1;
        }
        .pricing-card__amount .currency {
          font-size: var(--text-xl);
          font-weight: 600;
          vertical-align: super;
          margin-right: 2px;
          color: var(--color-text-muted);
        }
        .pricing-card__per {
          font-size: var(--text-sm);
          color: var(--color-text-faint);
          margin-top: 0.25rem;
        }
        .pricing-card__custom {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--color-text);
        }
        .pricing-card__cta {
          display: block;
          text-align: center;
          padding: 0.875rem 1.5rem;
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 600;
          margin-bottom: 1.75rem;
          transition: all 0.25s var(--ease-out);
        }
        .pricing-card__cta--primary {
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          color: #fff;
          box-shadow: 0 4px 20px rgba(99,102,241,0.4);
        }
        .pricing-card__cta--primary:hover {
          box-shadow: 0 6px 30px rgba(99,102,241,0.6);
          transform: translateY(-1px);
        }
        .pricing-card__cta--ghost {
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--color-text-muted);
          background: rgba(255,255,255,0.03);
        }
        .pricing-card__cta--ghost:hover {
          border-color: rgba(99,102,241,0.4);
          color: var(--color-text);
          background: rgba(99,102,241,0.06);
        }
        .pricing-card__divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 1.5rem;
        }
        .pricing-card__feature-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .pricing-card__feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          line-height: 1.5;
        }
        .pricing-card__feature-item--missing {
          opacity: 0.35;
        }
        @media (max-width: 1024px) {
          .pricing__grid { grid-template-columns: 1fr; max-width: 460px; margin: 0 auto; }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .pricing__grid { grid-template-columns: repeat(2, 1fr); max-width: 860px; }
          .pricing__grid > :last-child { grid-column: span 2; }
        }
      `}</style>

      {/* Aurora background */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-conic" />
        <div className="aurora-orb aurora-orb-2" style={{ top: '20%', right: '10%' }} />
      </div>

      <div className="container">
        <div className="pricing__header">
          <div className="section-tag reveal">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M6 2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Pricing
          </div>
          <h2 id="pricing-title" className="section-title reveal reveal-delay-1">
            Simple, <span className="gradient-text">transparent</span> pricing
          </h2>
          <p className="section-subtitle reveal reveal-delay-2" style={{ margin: '0 auto 2rem' }}>
            Start free. Scale as you grow. No surprise bills, no per-seat pricing gotchas.
          </p>

          {/* Billing toggle */}
          <div className="pricing__toggle reveal reveal-delay-3" role="group" aria-label="Billing period">
            <button
              className={`pricing__toggle-label${!annual ? ' active' : ''}`}
              onClick={() => setAnnual(false)}
              aria-pressed={!annual}
            >
              Monthly
            </button>
            <button
              className={`pricing__toggle-label${annual ? ' active' : ''}`}
              onClick={() => setAnnual(true)}
              aria-pressed={annual}
            >
              Annual
            </button>
            <span className="pricing__save-badge" aria-live="polite">
              {annual ? 'Save 20%' : ''}
            </span>
          </div>
        </div>

        <div className="pricing__grid">
          {TIERS.map((tier, i) => (
            <div
              key={tier.name}
              className={`pricing-card glass-card reveal reveal-delay-${i + 1}${
                tier.featured ? ' pricing-card--featured' : ''
              }`}
            >
              {tier.badge && (
                <div className="pricing-card__badge" aria-label="Most popular plan">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M5 1l1.2 2.5 2.8.4-2 2 .5 2.8L5 7.5 2.5 8.7l.5-2.8-2-2 2.8-.4L5 1z" fill="currentColor"/>
                  </svg>
                  {tier.badge}
                </div>
              )}

              <div className="pricing-card__name">{tier.name}</div>
              <div className="pricing-card__desc">{tier.description}</div>

              <div className="pricing-card__price">
                {tier.price.monthly === null ? (
                  <div className="pricing-card__custom">Custom</div>
                ) : tier.price.monthly === 0 ? (
                  <div>
                    <span className="pricing-card__amount">Free</span>
                    <p className="pricing-card__per">forever</p>
                  </div>
                ) : (
                  <div>
                    <span className="pricing-card__amount">
                      <span className="currency">$</span>
                      {annual ? tier.price.annual : tier.price.monthly}
                    </span>
                    <p className="pricing-card__per">/ month, billed {annual ? 'annually' : 'monthly'}</p>
                  </div>
                )}
              </div>

              <a
                href={tier.ctaHref}
                className={`pricing-card__cta ${
                  tier.featured ? 'pricing-card__cta--primary' : 'pricing-card__cta--ghost'
                }`}
              >
                {tier.cta}
              </a>

              <div className="pricing-card__divider" />

              <ul className="pricing-card__feature-list" aria-label={`${tier.name} plan features`}>
                {tier.features.map((feat) => (
                  <li key={feat} className="pricing-card__feature-item">
                    <CheckIcon color={tier.featured ? '#818cf8' : '#6366f1'} />
                    {feat}
                  </li>
                ))}
                {tier.missing.map((feat) => (
                  <li
                    key={feat}
                    className="pricing-card__feature-item pricing-card__feature-item--missing"
                    aria-label={`${feat} — not included`}
                  >
                    <CrossIcon />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Enterprise CTA note */}
        <p
          className="reveal"
          style={{
            textAlign: 'center',
            marginTop: '2.5rem',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-faint)',
          }}
        >
          All plans include a 30-day money-back guarantee.{' '}
          <a
            href="#faq"
            style={{ color: 'var(--color-primary-h)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            See FAQ
          </a>
        </p>
      </div>
    </section>
  );
}
