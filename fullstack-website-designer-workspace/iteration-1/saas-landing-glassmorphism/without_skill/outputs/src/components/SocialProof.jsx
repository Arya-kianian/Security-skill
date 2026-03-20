/**
 * SocialProof
 * Logo parade + three testimonial cards to build trust between
 * the Features and Pricing sections.
 */
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LOGOS = [
  'Acme Corp',
  'NovaTech',
  'Meridian',
  'Orbital Labs',
  'Prism AI',
  'Vertex Co.',
  'Zenith Systems',
]

const TESTIMONIALS = [
  {
    quote:
      '"Luminary cut our reporting cycle from days to minutes. The AI anomaly alerts alone saved us six figures in Q3."',
    name: 'Sarah Chen',
    title: 'VP of Data, Meridian',
    avatar: 'SC',
    accent: '#7c3aed',
  },
  {
    quote:
      '"I\'ve tried every analytics tool on the market. Nothing comes close to Luminary\'s predictive accuracy or its UI."',
    name: 'James Okafor',
    title: 'Founder, NovaTech',
    avatar: 'JO',
    accent: '#3b82f6',
  },
  {
    quote:
      '"Our analysts spend 80% less time on dashboards and 80% more time on strategy. That\'s the Luminary effect."',
    name: 'Priya Nair',
    title: 'Head of Analytics, Vertex Co.',
    avatar: 'PN',
    accent: '#22d3ee',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function SocialProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '5rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Logo row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            style={{
              textAlign: 'center',
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.3)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
            }}
          >
            Trusted by 1,200+ companies worldwide
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '5rem',
            }}
          >
            {LOGOS.map((logo) => (
              <div
                key={logo}
                style={{
                  padding: '0.6rem 1.25rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 10,
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                {logo}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2
            style={{
              fontFamily: 'Syne, Inter, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              letterSpacing: '-0.03em',
              color: '#fff',
              lineHeight: 1.2,
            }}
          >
            Loved by teams that{' '}
            <span className="gradient-text">ship fast</span>
          </h2>
        </motion.div>

        {/* Testimonial cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={itemVariants}
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
                }}
              />

              {/* Stars */}
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#f59e0b">
                    <path d="M7 1l1.5 4h4l-3.3 2.4 1.3 4L7 9l-3.5 2.4 1.3-4L1.5 5h4z"/>
                  </svg>
                ))}
              </div>

              <p
                style={{
                  fontSize: '0.96rem',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                }}
              >
                {t.quote}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${t.accent}, #1a0938)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)' }}>
                    {t.title}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
