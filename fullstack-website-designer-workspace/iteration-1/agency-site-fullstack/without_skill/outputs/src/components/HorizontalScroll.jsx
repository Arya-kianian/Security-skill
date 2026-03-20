'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const CASE_STUDIES = [
  {
    id: '01',
    client: 'Vanta Foods',
    title: 'Redefining Healthy Indulgence',
    desc: 'A full brand overhaul — identity, packaging, and a motion-rich e-commerce experience that drove 3× conversion.',
    tags: ['Branding', 'Web', 'Motion'],
    color: '#1a0a00',
    image: 'https://images.unsplash.com/photo-1606914907999-71a4e1b61c10?w=800&q=80',
  },
  {
    id: '02',
    client: 'Meridian Capital',
    title: 'Trust Meets Boldness',
    desc: 'A fintech rebrand designed to attract a younger audience without losing credibility. Dark UI, sharp type, purposeful data-vis.',
    tags: ['Branding', 'UI/UX'],
    color: '#000d1a',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    id: '03',
    client: 'Forma Architecture',
    title: 'Space as Experience',
    desc: 'An award-winning portfolio site where architecture and web design share the same language. WebGL materials, scroll-driven reveals.',
    tags: ['Web', 'WebGL', '3D'],
    color: '#0a0a0a',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
  },
  {
    id: '04',
    client: 'Helix Labs',
    title: 'Science, Made Legible',
    desc: 'A biotech startup brand that transforms complex science into compelling visual storytelling. Raised $40M Series B post-launch.',
    tags: ['Branding', 'Motion', 'Strategy'],
    color: '#001a0d',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80',
  },
  {
    id: '05',
    client: 'Nova Music',
    title: 'Hear It Before You See It',
    desc: 'An immersive campaign microsite for a genre-defining album. Audio-reactive visuals, custom shaders, 200K visits in 72 hours.',
    tags: ['Web', 'Motion', 'Audio'],
    color: '#12001a',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
  },
];

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 13L13 3M13 3H5M13 3V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HorizontalScroll() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let ctx;

    async function init() {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Expose ScrollTrigger for Lenis integration
      window.ScrollTrigger = ScrollTrigger;

      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      ctx = gsap.context(() => {
        const totalWidth = track.scrollWidth - section.offsetWidth + 160;

        const tl = gsap.to(track, {
          x: () => -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: true,
            scrub: 1.2,
            start: 'top top',
            end: () => `+=${totalWidth + 200}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Card entrance stagger (only fires once)
        gsap.fromTo(
          '.case-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }, section);
    }

    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section className="work-section" id="work" ref={sectionRef}>
      <div className="work-section__header">
        <div>
          <p className="section-label" data-index="02">
            Selected Work
          </p>
          <h2 className="work-section__title">
            Case
            <br />
            Studies
          </h2>
        </div>
        <p className="work-section__count font-mono">
          Drag or scroll — {CASE_STUDIES.length} projects
        </p>
      </div>

      <div className="h-scroll-wrapper">
        <div className="h-scroll-track" ref={trackRef}>
          {CASE_STUDIES.map((study) => (
            <article key={study.id} className="case-card" role="article">
              <div className="case-card__media">
                <span className="case-card__number font-mono">{study.id}</span>
                <div className="case-card__tags">
                  {study.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Using a colored placeholder with fallback */}
                <img
                  src={study.image}
                  alt={`${study.client} — ${study.title}`}
                  loading="lazy"
                  width={800}
                  height={600}
                  style={{ display: 'block' }}
                />
              </div>
              <div className="case-card__body">
                <p className="case-card__client">{study.client}</p>
                <h3 className="case-card__title">{study.title}</h3>
                <p className="case-card__desc">{study.desc}</p>
              </div>
              <div className="case-card__arrow" aria-hidden="true">
                <ArrowIcon />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
