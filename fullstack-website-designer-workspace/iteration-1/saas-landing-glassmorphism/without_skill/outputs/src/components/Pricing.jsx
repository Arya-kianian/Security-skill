/**
 * Pricing
 * Three-tier pricing section: Starter, Pro (featured), Enterprise.
 * Glassmorphism cards, animated highlight ring on featured tier,
 * toggle between monthly / annual billing.
 */
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Perfect for solo founders',
    monthlyPrice: 29,
    annualPrice: 19,
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.3)',
    border: 'rgba(59,130,246,0.2)',
    featured: false,
    cta: 'Start free trial',
    features: [
      '5 connected data sources',
      '3 custom dashboards',
      '30-day data history',
      'AI anomaly detection',
      'Email alerts',
      'Community support',
    ],
    unavailable: ['Predictive forecasting', 'SSO / SAML', 'Audit logs', 'SLA guarantee'],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Built for growing teams',
    monthlyPrice: 89,
    annualPrice: 59,
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.45)',
    border: 'rgba(124,58,237,0.5)',
    featured: true,
    badge: 'Most Popular',
    cta: 'Get started',
    features: [
      'Unlimited data sources',
      'Unlimited dashboards',
      '2-year data history',
      'AI anomaly detection',
      'Predictive forecasting',
      'Slack & webhook alerts',
      'Team collaboration (20 seats)',
      'Priority email support',
    ],
    unavailable: ['SSO / SAML', 'Audit logs', 'SLA guarantee'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For mission-critical scale',
    monthlyPrice: null,
    annualPrice: null,
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.3)',
    border: 'rgba(168,85,247,0.2)',
    featured: false,
    cta: 'Contact sales',
    features: [
      'Everything in Pro',
      'Unlimited seats',
      'Unlimited data history',
      'SSO / SAML',
      'Audit logs',
      'Custom SLA (99.99%)',
      'Dedicated success manager',
      'On-prem / private cloud option',
    ],
    unavailable: [],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

function CheckIcon({ available }) {
  return available ? (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      <circle cx="8" cy="8" r="8" fill="rgba(124,58,237,0.2)"/>
      <path
        d="M5 8l2 2 4-4"
        stroke="#a855f7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.04)"/>
      <path
        d="M5.5 10.5l5-5M10.5 10.5l-5-5"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PricingCard({ tier, annual }) {
  const price = annual ? tier.annualPrice : tier.monthlyPrice

  return (
    <motion.div
      variants={cardVariants}
      whileHover={!tier.featured ? { y: -6, transition: { duration: 0.2 } } : {}}
      style={{
        position: 'relative',
        borderRadius: 24,
        padding: tier.featured ? '2.5rem 2rem' : '2rem',
        background: tier.featured
          ? 'rgba(124,58,237,0.12)'
          : 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${tier.border}`,
        boxShadow: tier.featured
          ? `0 0 60px ${tier.glow}, 0 8px 32px rgba(0,0,0,0.4)`
          : '0 8px 32px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        zIndex: tier.featured ? 2 : 1,
        transform: tier.featured ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      {/* Animated border ring for featured */}
      {tier.featured && (
        <div
          style={{
            position: 'absolute',
            inset: -1,
            borderRadius: 25,
            background: `linear-gradient(135deg, ${tier.color}, #3b82f6, ${tier.color})`,
            backgroundSize: '200% 200%',
            animation: 'gradient-border 4s ease infinite',
            zIndex: -1,
            opacity: 0.6,
          }}
        />
      )}

      {/* Badge */}
      {tier.badge && (
        <div
          style={{
            position: 'absolute',
            top: -14,
            left: '50%',
            transform: 'translateX(-50%)',
            background: `linear-gradient(135deg, ${tier.color}, #3b82f6)`,
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: '0.3rem 1rem',
            borderRadius: 999,
            whiteSpace: 'nowrap',
            boxShadow: `0 4px 20px ${tier.glow}`,
          }}
        >
          {tier.badge}
        </div>
      )}

      {/* Tier header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: tier.color,
              boxShadow: `0 0 8px ${tier.glow}`,
            }}
          />
          <span
            style={{
              fontFamily: 'Syne, Inter, sans-serif',
              fontWeight: 800,
              fontSize: '1.15rem',
              color: '#fff',
            }}
          >
            {tier.name}
          </span>
        </div>
        <p
          style={{
            fontSize: '0.88rem',
            color: 'rgba(255,255,255,0.5)',
            margin: 0,
          }}
        >
          {tier.tagline}
        </p>
      </div>

      {/* Price */}
      <div style={{ marginBottom: '2rem' }}>
        {price !== null ? (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
            <span
              style={{
                fontFamily: 'Syne, Inter, sans-serif',
                fontWeight: 800,
                fontSize: '3rem',
                letterSpacing: '-0.04em',
                color: '#fff',
                lineHeight: 1,
              }}
            >
              ${price}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}>
              / mo{annual ? ' (billed annually)' : ''}
            </span>
          </div>
        ) : (
          <div
            style={{
              fontFamily: 'Syne, Inter, sans-serif',
              fontWeight: 800,
              fontSize: '2rem',
              color: '#fff',
              lineHeight: 1,
            }}
          >
            Custom pricing
          </div>
        )}
      </div>

      {/* CTA */}
      <a
        href="#"
        className={tier.featured ? 'btn-primary' : 'btn-ghost'}
        style={{
          textAlign: 'center',
          justifyContent: 'center',
          marginBottom: '2rem',
          ...(tier.featured
            ? { background: `linear-gradient(135deg, ${tier.color} 0%, #3b82f6 100%)` }
            : {}),
        }}
      >
        <span>{tier.cta}</span>
      </a>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: 'rgba(255,255,255,0.07)',
          marginBottom: '1.5rem',
        }}
      />

      {/* Feature list */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {tier.features.map((f) => (
          <li
            key={f}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.6rem',
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            <CheckIcon available={true} />
            {f}
          </li>
        ))}
        {tier.unavailable.map((f) => (
          <li
            key={f}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.6rem',
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.28)',
              textDecoration: 'line-through',
            }}
          >
            <CheckIcon available={false} />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="pricing"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '7rem 1.5rem 8rem',
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          height: '50%',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div className="section-label">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <circle cx="6" cy="6" r="4"/>
            </svg>
            Pricing
          </div>

          <h2
            style={{
              fontFamily: 'Syne, Inter, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: '#fff',
              marginBottom: '1rem',
            }}
          >
            Transparent pricing,{' '}
            <span className="gradient-text">zero surprises</span>
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.55)',
              maxWidth: 480,
              margin: '0 auto 2rem',
              lineHeight: 1.7,
            }}
          >
            Start free for 14 days — no credit card required. Upgrade or downgrade
            any time.
          </p>

          {/* Billing toggle */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 999,
              padding: '0.35rem 0.35rem 0.35rem 1rem',
            }}
          >
            <span
              style={{
                fontSize: '0.88rem',
                fontWeight: 500,
                color: !annual ? '#fff' : 'rgba(255,255,255,0.45)',
              }}
            >
              Monthly
            </span>
            <button
              onClick={() => setAnnual((v) => !v)}
              aria-label="Toggle billing period"
              style={{
                position: 'relative',
                width: 44,
                height: 24,
                borderRadius: 999,
                border: 'none',
                background: annual
                  ? 'linear-gradient(135deg, #7c3aed, #3b82f6)'
                  : 'rgba(255,255,255,0.15)',
                cursor: 'pointer',
                transition: 'background 0.3s',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 3,
                  left: annual ? 23 : 3,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: '#fff',
                  transition: 'left 0.25s cubic-bezier(0.4,0,0.2,1)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                }}
              />
            </button>
            <span
              style={{
                fontSize: '0.88rem',
                fontWeight: 500,
                color: annual ? '#fff' : 'rgba(255,255,255,0.45)',
              }}
            >
              Annual
            </span>
            {/* Savings badge */}
            <AnimatePresence>
              {annual && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                    color: '#fff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: 999,
                    letterSpacing: '0.04em',
                  }}
                >
                  SAVE 34%
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}
        >
          {TIERS.map((tier) => (
            <PricingCard key={tier.id} tier={tier} annual={annual} />
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            textAlign: 'center',
            marginTop: '3rem',
            fontSize: '0.88rem',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          All plans include a 14-day free trial. No credit card required.
          Prices in USD. &nbsp;
          <a href="#" style={{ color: 'rgba(168,85,247,0.8)', textDecoration: 'none' }}>
            See full feature comparison →
          </a>
        </motion.p>
      </div>

      <style>{`
        @keyframes gradient-border {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}
