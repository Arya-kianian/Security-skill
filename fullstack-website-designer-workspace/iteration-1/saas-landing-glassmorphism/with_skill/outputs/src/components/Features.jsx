import { useEffect, useRef } from 'react';

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 9v5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Real-Time Streaming',
    description:
      'Process millions of events per second with sub-50ms latency. Live dashboards that update the moment your data changes.',
    color: '#6366f1',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 20l6-8 5 6 3-4 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'AI-Powered Insights',
    description:
      'Our ML engine automatically surfaces anomalies, forecasts trends, and explains why your metrics are moving.',
    color: '#8b5cf6',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="9" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="19" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M13 14h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 8V6M9 6V4M13 6V4M19 6V4M23 6V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Visual Query Builder',
    description:
      'Drag, drop, filter. No SQL required. Build complex queries across joined datasets in minutes without writing code.',
    color: '#818cf8',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4l2.5 5 5.5.8-4 3.9.94 5.48L14 16.5l-4.94 2.68.94-5.48L6 9.8l5.5-.8L14 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Custom Dashboards',
    description:
      'Pixel-perfect drag-and-drop canvas. Build board-ready presentations, operational runbooks, and executive reports.',
    color: '#a78bfa',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 12h20M9 4l-1 4M19 4l1 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
        <circle cx="14" cy="16" r="1.5" fill="currentColor"/>
        <circle cx="18" cy="16" r="1.5" fill="currentColor"/>
      </svg>
    ),
    title: 'Smart Alerting',
    description:
      'Threshold-based and ML-driven alerts with context. Slack, PagerDuty, email, webhooks — route to the right team.',
    color: '#c4b5fd',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M8 14h12M14 8v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="4" y="4" width="20" height="20" rx="10" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: '200+ Integrations',
    description:
      'Connect Snowflake, BigQuery, Postgres, S3, Kafka, Stripe, Salesforce, and 190+ more data sources in one click.',
    color: '#7c3aed',
  },
];

export default function Features() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Scroll reveal
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));

    // Card 3D tilt effect
    cardRefs.current.forEach((card) => {
      if (!card) return;

      function onMove(e) {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotY = (x - 0.5) * 14;
        const rotX = (y - 0.5) * -14;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
        card.querySelector('.feature-card__shine').style.cssText =
          `--shine-x: ${x * 100}%; --shine-y: ${y * 100}%; opacity: 1;`;
      }

      function onLeave() {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
        card.querySelector('.feature-card__shine').style.opacity = '0';
      }

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);

      card._cleanup = () => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      };
    });

    // Animate feature icons on hover
    cardRefs.current.forEach((card) => {
      if (!card) return;
      const icon = card.querySelector('.feature-card__icon');

      function onEnter() {
        if (icon) {
          icon.style.transform = 'scale(1.15) rotate(-5deg)';
          icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
      }
      function onLeave() {
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      }

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);

      const prevCleanup = card._cleanup;
      card._cleanup = () => {
        prevCleanup?.();
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mouseleave', onLeave);
      };
    });

    return () => {
      obs.disconnect();
      cardRefs.current.forEach((card) => card?._cleanup?.());
    };
  }, []);

  return (
    <section
      id="features"
      className="section features"
      ref={sectionRef}
      aria-labelledby="features-title"
    >
      <style>{`
        .features {
          background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-2) 100%);
        }
        .features__header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }
        .features__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .feature-card {
          position: relative;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          cursor: default;
          will-change: transform;
          transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          transform: perspective(800px) rotateX(0deg) rotateY(0deg);
        }
        .feature-card__shine {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            circle at var(--shine-x, 50%) var(--shine-y, 50%),
            rgba(255,255,255,0.08) 0%,
            transparent 60%
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .feature-card__icon {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s;
          flex-shrink: 0;
        }
        .feature-card__title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--color-text);
          letter-spacing: -0.01em;
        }
        .feature-card__desc {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          line-height: 1.7;
        }
        .feature-card__arrow {
          margin-top: auto;
          align-self: flex-start;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-faint);
          font-size: 0.75rem;
          transition: all 0.2s;
          opacity: 0;
        }
        .feature-card:hover .feature-card__arrow {
          opacity: 1;
          color: var(--color-primary);
          border-color: rgba(99,102,241,0.4);
          transform: translateX(4px);
        }
        @media (max-width: 1024px) {
          .features__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .features__grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="container">
        <div className="features__header">
          <div className="section-tag reveal">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1l1.5 3 3 .5-2.2 2.1.5 3.1L6 8.3 3.2 9.7l.5-3.1L1.5 4.5l3-.5L6 1z" fill="currentColor"/>
            </svg>
            Features
          </div>
          <h2 id="features-title" className="section-title reveal reveal-delay-1">
            Everything you need to <span className="gradient-text">understand your data</span>
          </h2>
          <p className="section-subtitle reveal reveal-delay-2" style={{ margin: '0 auto' }}>
            From raw events to executive dashboards — Luminary covers the full analytics stack
            so your team can move from question to insight in minutes, not days.
          </p>
        </div>

        <div className="features__grid">
          {FEATURES.map((feat, i) => (
            <article
              key={feat.title}
              className={`feature-card glass-card reveal reveal-delay-${(i % 3) + 1}`}
              ref={(el) => (cardRefs.current[i] = el)}
              tabIndex={0}
              aria-label={`${feat.title}: ${feat.desc}`}
            >
              <div className="feature-card__shine" aria-hidden="true" />

              <div
                className="feature-card__icon"
                style={{
                  background: `${feat.color}18`,
                  border: `1px solid ${feat.color}30`,
                  color: feat.color,
                }}
              >
                {feat.icon}
              </div>

              <h3 className="feature-card__title">{feat.title}</h3>
              <p className="feature-card__desc">{feat.description}</p>

              <div className="feature-card__arrow" aria-hidden="true">→</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
