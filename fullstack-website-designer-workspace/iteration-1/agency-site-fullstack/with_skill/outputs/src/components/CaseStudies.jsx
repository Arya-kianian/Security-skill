'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CASE_STUDIES = [
  {
    id: '01',
    client: 'Voltex EV',
    category: 'Brand Identity / Web',
    title: 'Charging the Future of Mobility',
    year: '2024',
    tags: ['Branding', 'Motion', 'Web'],
    color: '#ef4444',
    description:
      'A full brand overhaul for a Series-B EV startup. We built a design language that communicates raw electric energy through bold contrast and kinetic type.',
    stat1: { value: '+340%', label: 'Site conversions' },
    stat2: { value: '4.8s',  label: 'Avg. dwell time' },
  },
  {
    id: '02',
    client: 'Noir Finance',
    category: 'Product Design / Dev',
    title: 'Banking Reimagined in Dark Mode',
    year: '2024',
    tags: ['Product', 'UI/UX', 'React'],
    color: '#ffffff',
    description:
      'We redesigned Noir Finance's core dashboard from the ground up — a zero-distraction interface for high-net-worth individuals that feels like a Bloomberg terminal, minus the chaos.',
    stat1: { value: '62%',   label: 'Task completion' },
    stat2: { value: '98',    label: 'NPS score' },
  },
  {
    id: '03',
    client: 'Mirage Hotels',
    category: 'Campaign / Motion',
    title: 'Luxury Has a New Visual Language',
    year: '2023',
    tags: ['Campaigns', 'Video', '3D'],
    color: '#ef4444',
    description:
      'A global campaign for Mirage's flagship resort launch. Four :30 spots and a parallax-driven microsite that drove 28,000 pre-bookings in the first 72 hours.',
    stat1: { value: '28K',   label: 'Pre-bookings' },
    stat2: { value: '4.2M',  label: 'Impressions' },
  },
  {
    id: '04',
    client: 'Orion Health',
    category: 'Strategy / Brand',
    title: 'Making Complex Science Feel Human',
    year: '2023',
    tags: ['Strategy', 'Brand', 'Print'],
    color: '#ffffff',
    description:
      'Orion needed to bridge the gap between clinical credibility and consumer trust. We built a dual-audience brand system that speaks fluently to both doctors and patients.',
    stat1: { value: '+190%', label: 'Brand recall' },
    stat2: { value: '3',     label: 'Cannes shortlists' },
  },
  {
    id: '05',
    client: 'Prism Records',
    category: 'Web / Interactive',
    title: 'An Album Drop That Broke the Internet',
    year: '2023',
    tags: ['WebGL', 'Audio', 'Creative Dev'],
    color: '#ef4444',
    description:
      'A WebGL-powered interactive album experience where every track unlocked a new visual world. 1.2 million unique visitors in week one, zero paid promotion.',
    stat1: { value: '1.2M',  label: 'Week-1 visitors' },
    stat2: { value: '#1',    label: 'FWA Site of the Day' },
  },
];

export default function CaseStudies() {
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);
  const headerRef   = useRef(null);

  /* ─── GSAP horizontal scroll ─────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    // Wait for layout
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const totalScroll = track.scrollWidth - section.offsetWidth;

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${totalScroll + window.innerHeight * 0.5}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          gsap.set(track, { x: -self.progress * totalScroll });
        },
      });

      return () => st.kill();
    });

    // Section header reveal
    gsap.from(headerRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      style={{
        background: '#000',
        borderTop: '3px solid #ffffff',
        overflow: 'hidden',
        position: 'relative',
      }}
      aria-labelledby="case-studies-title"
    >
      {/* Section header */}
      <div
        ref={headerRef}
        style={{
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem) 2rem',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          borderBottom: '3px solid #333',
        }}
      >
        <div>
          <span className="section-label">Selected Work</span>
          <h2
            id="case-studies-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 1.0,
              color: '#fff',
            }}
          >
            Case Studies
          </h2>
        </div>
        <p
          style={{
            maxWidth: '360px',
            color: 'rgba(255,255,255,0.55)',
            fontSize: 'var(--text-sm)',
          }}
        >
          Five projects. Five industries. One uncompromising standard.
          Scroll horizontally through our selected work.
        </p>
      </div>

      {/* Horizontal scroll track */}
      <div
        style={{ padding: '2.5rem clamp(1.5rem, 4vw, 4rem)', overflow: 'hidden' }}
      >
        <div
          ref={trackRef}
          className="h-scroll-track"
          style={{ padding: '1rem 0 2rem', alignItems: 'stretch' }}
        >
          {CASE_STUDIES.map((cs) => (
            <CaseStudyCard key={cs.id} {...cs} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({ id, client, category, title, year, tags, color, description, stat1, stat2 }) {
  const cardRef = useRef(null);

  /* Per-card GSAP entrance from right */
  useEffect(() => {
    gsap.from(cardRef.current, {
      x: 80,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'left 90%',
        horizontal: true,
        toggleActions: 'play none none none',
      },
    });
  }, []);

  return (
    <article
      ref={cardRef}
      tabIndex={0}
      aria-label={`Case study: ${client} — ${title}`}
      style={{
        minWidth: 'clamp(300px, 38vw, 520px)',
        height: 'clamp(420px, 55vh, 580px)',
        border: '3px solid #333',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        cursor: 'pointer',
        transition: 'border-color 0.25s ease, transform 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.transform   = 'translateY(-6px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#333';
        e.currentTarget.style.transform   = 'translateY(0)';
      }}
    >
      {/* Number watermark */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-0.5rem',
          right: '1.5rem',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 12vw, 9rem)',
          fontWeight: 900,
          color: color === '#ef4444' ? 'rgba(239,68,68,0.07)' : 'rgba(255,255,255,0.04)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {id}
      </span>

      {/* Top: meta */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1.25rem',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: color,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.25rem',
              }}
            >
              {category}
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                fontWeight: 700,
                textTransform: 'uppercase',
                lineHeight: 1.1,
                color: '#fff',
              }}
            >
              {client}
            </h3>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.1em',
            }}
          >
            {year}
          </span>
        </div>

        {/* Title */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.2,
            marginBottom: '1.25rem',
          }}
        >
          {title}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.65,
          }}
        >
          {description}
        </p>
      </div>

      {/* Bottom: stats + tags */}
      <div>
        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            borderTop: '2px solid #222',
            borderBottom: '2px solid #222',
            padding: '1rem 0',
            margin: '1.5rem 0',
          }}
        >
          {[stat1, stat2].map((s) => (
            <div key={s.label}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 900,
                  color: color,
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.1em',
                  marginTop: '0.2rem',
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: `1.5px solid ${color === '#ef4444' ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.2)'}`,
                color: 'rgba(255,255,255,0.5)',
                padding: '0.2rem 0.6rem',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
