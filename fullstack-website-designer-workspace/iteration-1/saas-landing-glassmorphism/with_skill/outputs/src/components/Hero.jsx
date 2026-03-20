import { useEffect, useRef } from 'react';
import { initHeroScene } from '../lib/hero-scene.js';

const STATS = [
  { value: '10M+', label: 'Events processed daily' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '< 50ms', label: 'Query latency' },
];

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cleanup = initHeroScene(canvasRef.current);

    // Reveal animation via IntersectionObserver
    const reveals = document.querySelectorAll('.hero .reveal');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => obs.observe(el));

    // Stagger hero content in on mount
    setTimeout(() => {
      reveals.forEach((el) => el.classList.add('in-view'));
    }, 100);

    return () => {
      cleanup();
      obs.disconnect();
    };
  }, []);

  return (
    <section className="hero aurora-container" role="banner" aria-labelledby="hero-title">
      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 5rem;
          position: relative;
        }
        .hero__canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .hero__content {
          position: relative;
          z-index: 2;
          max-width: 700px;
        }
        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-primary-h);
          margin-bottom: 1.5rem;
        }
        .hero__badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-primary);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .hero__title {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: var(--color-text);
          margin-bottom: 1.5rem;
        }
        .hero__title .highlight {
          display: block;
        }
        .hero__description {
          font-size: var(--text-lg);
          color: var(--color-text-muted);
          line-height: 1.75;
          max-width: 560px;
          margin-bottom: 2.5rem;
        }
        .hero__cta {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }
        .hero__cta-note {
          font-size: var(--text-xs);
          color: var(--color-text-faint);
          margin-top: 0.75rem;
        }
        .hero__stats {
          display: flex;
          gap: 2.5rem;
          flex-wrap: wrap;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .hero__stat-value {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 800;
          background: linear-gradient(135deg, #818cf8, #c4b5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
          line-height: 1.2;
        }
        .hero__stat-label {
          font-size: var(--text-xs);
          color: var(--color-text-faint);
          margin-top: 0.2rem;
        }
        .hero__scroll {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          opacity: 0.4;
          animation: scroll-bob 2.5s ease-in-out infinite;
        }
        .hero__scroll-label {
          font-size: 0.625rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text-faint);
        }
        .hero__scroll-track {
          width: 24px;
          height: 38px;
          border: 1.5px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
        }
        .hero__scroll-dot {
          width: 4px;
          height: 8px;
          background: var(--color-primary);
          border-radius: 2px;
          animation: scroll-dot 2.5s ease-in-out infinite;
        }
        @keyframes scroll-dot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(12px); opacity: 0.3; }
        }
        @keyframes scroll-bob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(4px); }
        }
        /* 3D sphere canvas side positioning */
        .hero__scene-wrap {
          position: absolute;
          right: -4%;
          top: 50%;
          transform: translateY(-50%);
          width: 520px;
          height: 520px;
          z-index: 1;
          pointer-events: none;
        }
        @media (max-width: 1024px) {
          .hero__scene-wrap {
            width: 380px;
            height: 380px;
            right: -8%;
            opacity: 0.6;
          }
        }
        @media (max-width: 768px) {
          .hero__scene-wrap { display: none; }
          .hero__content { max-width: 100%; }
        }
      `}</style>

      {/* Aurora background layers */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-conic" />
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>

      {/* Three.js canvas */}
      <div className="hero__scene-wrap" aria-hidden="true">
        <canvas
          ref={canvasRef}
          className="hero__canvas"
          style={{ width: '100%', height: '100%' }}
          aria-hidden="true"
        />
      </div>

      <div className="container">
        <div className="hero__content">
          <div className="reveal hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            Now in public beta
          </div>

          <h1 id="hero-title" className="hero__title reveal reveal-delay-1">
            Analytics that
            <span className="highlight gradient-text">illuminate</span>
            every decision.
          </h1>

          <p className="hero__description reveal reveal-delay-2">
            Luminary transforms your raw data into stunning, real-time insights.
            AI-powered anomaly detection, predictive forecasting, and beautiful
            dashboards — all in one platform.
          </p>

          <div className="hero__cta reveal reveal-delay-3">
            <a href="#signup" className="btn btn-primary">
              Start for free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#demo" className="btn btn-ghost">
              Watch demo
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor"/>
              </svg>
            </a>
          </div>

          <p className="hero__cta-note reveal reveal-delay-3">
            No credit card required · Free tier always available
          </p>

          <dl className="hero__stats reveal reveal-delay-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="visually-hidden">{stat.label}</dt>
                <dd>
                  <span className="hero__stat-value">{stat.value}</span>
                  <p className="hero__stat-label">{stat.label}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-label">scroll</span>
        <div className="hero__scroll-track">
          <div className="hero__scroll-dot" />
        </div>
      </div>
    </section>
  );
}
