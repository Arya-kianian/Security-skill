/**
 * Features
 * Six feature cards with glassmorphism, animated gradient icons,
 * and Framer Motion entrance animations.
 */
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/>
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
    glow: 'rgba(124,58,237,0.4)',
    title: 'Real-Time Analytics',
    description:
      'Monitor KPIs as they happen. Sub-second data pipelines surface actionable signals before your competitors even notice the trend.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)',
    glow: 'rgba(59,130,246,0.4)',
    title: 'AI-Powered Insights',
    description:
      'Our neural models automatically detect anomalies, forecast trends, and generate plain-English summaries — no data science degree needed.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
    glow: 'rgba(168,85,247,0.4)',
    title: 'Custom Dashboards',
    description:
      'Drag-and-drop widgets, 40+ chart types, and pixel-perfect layout controls. Build the exact view your team needs in minutes.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
    glow: 'rgba(34,211,238,0.4)',
    title: 'Team Collaboration',
    description:
      'Share live dashboards, annotate charts, and set role-based permissions. Everyone stays aligned without the email threads.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    glow: 'rgba(124,58,237,0.4)',
    title: 'Enterprise Security',
    description:
      'SOC 2 Type II certified, AES-256 encryption at rest and in transit, SSO/SAML support, and audit logs for every action.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)',
    glow: 'rgba(59,130,246,0.4)',
    title: 'Predictive Forecasting',
    description:
      'Time-series models trained on your historical data predict revenue, churn, and growth metrics weeks before they materialise.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: '2rem',
        cursor: 'default',
        overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onHoverStart={(e) => {
        e.target.style && (e.target.style.borderColor = 'rgba(124,58,237,0.35)')
      }}
    >
      {/* Corner shimmer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${feature.glow}, transparent)`,
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: feature.gradient,
          boxShadow: `0 0 20px ${feature.glow}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
          color: '#fff',
          flexShrink: 0,
          animation: `icon-pulse-${index % 3} 3s ease-in-out infinite`,
          animationDelay: `${index * 0.4}s`,
        }}
      >
        <div style={{ width: 26, height: 26 }}>{feature.icon}</div>
      </div>

      <h3
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: '#fff',
          marginBottom: '0.6rem',
          letterSpacing: '-0.01em',
        }}
      >
        {feature.title}
      </h3>

      <p
        style={{
          fontSize: '0.93rem',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.58)',
        }}
      >
        {feature.description}
      </p>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="features"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '7rem 1.5rem',
      }}
    >
      {/* Section glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '40%',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div className="section-label">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <circle cx="6" cy="6" r="4"/>
            </svg>
            Platform Features
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
            Everything you need to{' '}
            <span className="gradient-text">stay ahead</span>
          </h2>

          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.55)',
              maxWidth: 540,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Luminary packs enterprise-grade analytical power into an interface your
            whole team will actually use.
          </p>
        </motion.div>

        {/* Card grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </motion.div>
      </div>

      {/* Icon pulse keyframes */}
      <style>{`
        @keyframes icon-pulse-0 {
          0%, 100% { box-shadow: 0 0 18px rgba(124,58,237,0.4); }
          50%       { box-shadow: 0 0 32px rgba(124,58,237,0.7); }
        }
        @keyframes icon-pulse-1 {
          0%, 100% { box-shadow: 0 0 18px rgba(59,130,246,0.4); }
          50%       { box-shadow: 0 0 32px rgba(59,130,246,0.7); }
        }
        @keyframes icon-pulse-2 {
          0%, 100% { box-shadow: 0 0 18px rgba(34,211,238,0.4); }
          50%       { box-shadow: 0 0 32px rgba(34,211,238,0.7); }
        }
      `}</style>
    </section>
  )
}
