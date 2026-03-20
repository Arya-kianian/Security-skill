'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  {
    name: 'Sofia Reyes',
    role: 'Founder & Creative Director',
    bio: 'Former BBDO VP with 15 years building campaigns for Fortune 500 brands. Sofia founded Apex in 2015 with a single belief: that great design is an unfair competitive advantage.',
    skills: ['Brand Strategy', 'Art Direction', 'Client Leadership'],
    initials: 'SR',
    accent: '#ef4444',
    quote: '"Comfortable work is forgettable work."',
  },
  {
    name: 'Marcus Chen',
    role: 'Head of Technology',
    bio: 'Ex-Google engineer who decided shipping beautiful code was more interesting than shipping infrastructure. Marcus leads all interactive, WebGL, and 3D development at Apex.',
    skills: ['React / Next.js', 'WebGL / Three.js', 'Performance'],
    initials: 'MC',
    accent: '#ffffff',
    quote: '"The best animation is the one you almost miss."',
  },
  {
    name: 'Naomi Torres',
    role: 'Motion & 3D Lead',
    bio: 'Award-winning motion designer with credits at Hulu, Spotify, and Nike. Naomi\'s work has appeared at SIGGRAPH and won two Communication Arts awards.',
    skills: ['Cinema 4D', 'After Effects', 'GSAP / WebGL'],
    initials: 'NT',
    accent: '#ef4444',
    quote: '"Every pixel deserves intention."',
  },
  {
    name: 'James Okafor',
    role: 'Strategy & Brand',
    bio: 'Strategist who spent a decade at Interbrand naming and positioning billion-dollar brands. James turns business problems into sharp creative briefs that excite rather than constrain.',
    skills: ['Brand Positioning', 'Naming', 'Research'],
    initials: 'JO',
    accent: '#ffffff',
    quote: '"The brief is half the idea."',
  },
];

export default function Team() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const gridRef    = useRef(null);

  useEffect(() => {
    // Header reveal
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

    // Stagger grid children
    if (gridRef.current) {
      gsap.from(Array.from(gridRef.current.children), {
        y: 70,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      style={{
        background: '#0a0a0a',
        borderTop: '3px solid #ffffff',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      }}
      aria-labelledby="team-title"
    >
      {/* Header */}
      <div
        ref={headerRef}
        style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
      >
        <span className="section-label">The People</span>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <h2
            id="team-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 1.0,
              color: '#fff',
            }}
          >
            Meet The<br />
            <span style={{ color: '#ef4444' }}>Studio</span>
          </h2>
          <p
            style={{
              maxWidth: '380px',
              color: 'rgba(255,255,255,0.55)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.65,
            }}
          >
            Small enough to give a damn. Big enough to deliver.
            Every project benefits from every person here.
          </p>
        </div>
      </div>

      {/* Team grid */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          gap: '0',
        }}
        role="list"
      >
        {TEAM.map((member) => (
          <TeamCard key={member.name} {...member} />
        ))}
      </div>
    </section>
  );
}

function TeamCard({ name, role, bio, skills, initials, accent, quote }) {
  const cardRef  = useRef(null);
  const shineRef = useRef(null);

  /* ─── 3D tilt effect ─────────────────────────────────────────── */
  useEffect(() => {
    const card  = cardRef.current;
    const shine = shineRef.current;
    if (!card || !shine) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top)  / rect.height;

      const rotY =  (x - 0.5) * 18;
      const rotX = -(y - 0.5) * 18;

      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
      shine.style.setProperty('--shine-x', `${x * 100}%`);
      shine.style.setProperty('--shine-y', `${y * 100}%`);
      shine.style.opacity = '1';
    };

    const handleLeave = () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
      shine.style.opacity  = '0';
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);

    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <article
      role="listitem"
      aria-label={`${name}, ${role}`}
      style={{
        border: '3px solid #222',
        background: '#0d0d0d',
        padding: 'clamp(1.75rem, 3vw, 2.5rem)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.12s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s ease',
        willChange: 'transform',
      }}
      ref={cardRef}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#222';
      }}
    >
      {/* Shine overlay */}
      <div
        ref={shineRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(255,255,255,0.1) 0%, transparent 60%)',
          opacity: 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Content above shine */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Avatar */}
        <div
          style={{
            width: 'clamp(64px, 8vw, 80px)',
            height: 'clamp(64px, 8vw, 80px)',
            border: `3px solid ${accent}`,
            background: accent === '#ef4444' ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              fontWeight: 900,
              color: accent,
              letterSpacing: '0.05em',
            }}
          >
            {initials}
          </span>
        </div>

        {/* Name + role */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#fff',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              marginBottom: '0.35rem',
            }}
          >
            {name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: accent,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {role}
          </p>
        </div>

        {/* Bio */}
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
          }}
        >
          {bio}
        </p>

        {/* Quote */}
        <blockquote
          style={{
            borderLeft: `3px solid ${accent}`,
            paddingLeft: '1rem',
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: 'var(--text-sm)',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '1.5rem',
          }}
        >
          {quote}
        </blockquote>

        {/* Skill chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {skills.map((skill) => (
            <span
              key={skill}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.63rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: `1.5px solid ${accent === '#ef4444' ? 'rgba(239,68,68,0.35)' : 'rgba(255,255,255,0.18)'}`,
                color: 'rgba(255,255,255,0.5)',
                padding: '0.2rem 0.6rem',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
