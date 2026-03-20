/**
 * Hero
 * Full-viewport hero with a Three.js 3D sphere on the right,
 * headline + CTAs on the left, floating stat cards, and
 * entrance animations via Framer Motion.
 */
import { motion } from 'framer-motion'
import HeroSphere from './HeroSphere'

const STATS = [
  { value: '10×', label: 'faster insights' },
  { value: '99.9%', label: 'uptime SLA' },
  { value: '500+', label: 'integrations' },
]

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '6rem 1.5rem 4rem',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* ── Left: copy ── */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="section-label" style={{ marginBottom: '1.5rem' }}>
              <svg width="8" height="8" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="4" fill="currentColor"/>
              </svg>
              AI-Powered Analytics Platform
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'Syne, Inter, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
              marginBottom: '1.5rem',
              color: '#fff',
            }}
          >
            Illuminate every{' '}
            <span className="gradient-text">business insight</span>
            {' '}instantly
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              fontSize: '1.15rem',
              color: 'rgba(255,255,255,0.58)',
              lineHeight: 1.75,
              maxWidth: 500,
              marginBottom: '2.5rem',
            }}
          >
            Luminary connects your data sources, applies AI-driven analysis, and
            surfaces the insights that move the needle — in real time, in one
            beautiful dashboard.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}
          >
            <a href="#pricing" className="btn-primary">
              <span>Start free trial</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </a>
            <a href="#features" className="btn-ghost">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="8" r="7"/>
                <path d="M6 8l2 2 2-2M8 5v5"/>
              </svg>
              <span>Watch demo</span>
            </a>
          </motion.div>

          {/* Stat chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.15rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Syne, Inter, sans-serif',
                    fontWeight: 800,
                    fontSize: '1.6rem',
                    letterSpacing: '-0.03em',
                    background: 'linear-gradient(135deg, #c084fc, #60a5fa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.45)',
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: 3D Sphere ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            height: 520,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Glow halo behind sphere */}
          <div
            style={{
              position: 'absolute',
              inset: '10%',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(124,58,237,0.3) 0%, transparent 70%)',
              filter: 'blur(40px)',
              animation: 'pulse-glow 4s ease-in-out infinite',
            }}
          />

          <HeroSphere />

          {/* Floating glassmorphism stat card — top right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="glass-card"
            style={{
              position: 'absolute',
              top: '8%',
              right: '-5%',
              padding: '1rem 1.25rem',
              minWidth: 160,
              animation: 'float 6s ease-in-out infinite',
              animationDelay: '0s',
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.25rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Revenue MoM</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Syne, sans-serif', color: '#fff', lineHeight: 1 }}>+34.2%</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                marginTop: '0.4rem',
                fontSize: '0.78rem',
                color: '#22d3ee',
                fontWeight: 600,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 10V2M2 6l4-4 4 4"/>
              </svg>
              vs last month
            </div>
          </motion.div>

          {/* Floating glassmorphism card — bottom left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="glass-card"
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '-5%',
              padding: '1rem 1.25rem',
              minWidth: 170,
              animation: 'float 7s ease-in-out infinite',
              animationDelay: '1.5s',
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>AI Insight</div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.45 }}>
              Churn risk spike detected in <strong style={{ color: '#c084fc' }}>APAC segment</strong>
            </div>
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.4rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c3aed', display: 'inline-block', marginTop: 2 }} />
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>2 minutes ago</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'rgba(255,255,255,0.3)',
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        <span>Scroll</span>
        <div
          style={{
            width: 24,
            height: 36,
            borderRadius: 12,
            border: '1.5px solid rgba(255,255,255,0.15)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 6,
          }}
        >
          <div
            style={{
              width: 4,
              height: 8,
              borderRadius: 2,
              background: 'rgba(124,58,237,0.7)',
              animation: 'scroll-dot 1.8s ease-in-out infinite',
            }}
          />
        </div>
      </motion.div>

      <style>{`
        @keyframes scroll-dot {
          0%   { transform: translateY(0); opacity: 1; }
          80%  { transform: translateY(12px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
