'use client';

import { useEffect, useRef } from 'react';

const TEAM = [
  {
    name: 'Sasha Reyes',
    role: 'Creative Director',
    bio: 'Fifteen years shaping brand voices for global companies. Believes every pixel carries an opinion.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    socials: { tw: '#', li: '#', drib: '#' },
  },
  {
    name: 'Marcus Wren',
    role: 'Lead Developer',
    bio: 'Full-stack engineer obsessed with performance and interaction design. Ships fast, breaks nothing.',
    image: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=600&q=80',
    socials: { gh: '#', li: '#', tw: '#' },
  },
  {
    name: 'Yuki Tanaka',
    role: 'Motion & 3D',
    bio: 'Animation director with roots in film. Brings cinematic language to web and brand storytelling.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    socials: { ig: '#', li: '#', be: '#' },
  },
];

const STATS = [
  { num: '120', suffix: '+', label: 'Projects Shipped' },
  { num: '8', suffix: 'yr', label: 'In Business' },
  { num: '40', suffix: '+', label: 'Awards Won' },
  { num: '3', suffix: 'x', label: 'Avg. ROI Lift' },
];

function TiltCard({ member }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (-mouseY / (rect.height / 2)) * 8;
    const rotateY = (mouseX / (rect.width / 2)) * 8;

    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    card.style.setProperty('--mx', `${mx}%`);
    card.style.setProperty('--my', `${my}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.1s ease';
  };

  return (
    <div
      ref={cardRef}
      className="tilt-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      role="article"
    >
      <div className="tilt-card__shine" aria-hidden="true" />
      <div className="tilt-card__photo">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          width={600}
          height={800}
        />
      </div>
      <div className="tilt-card__info">
        <h3 className="tilt-card__name">{member.name}</h3>
        <p className="tilt-card__role">{member.role}</p>
        <p className="tilt-card__bio">{member.bio}</p>
        <div className="tilt-card__socials">
          {Object.entries(member.socials).map(([platform, href]) => (
            <a key={platform} href={href} aria-label={`${member.name} on ${platform}`}>
              {platform}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    async function init() {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Header reveal
        gsap.fromTo(
          '.team-section__header',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.team-section__header',
              start: 'top 85%',
              once: true,
            },
          }
        );

        // Cards stagger
        gsap.fromTo(
          '.tilt-card',
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.team-grid',
              start: 'top 85%',
              once: true,
            },
          }
        );

        // Stats counter animation
        STATS.forEach((stat, i) => {
          const el = document.querySelector(`.stat-num-${i}`);
          if (!el) return;

          const endVal = parseFloat(stat.num);
          ScrollTrigger.create({
            trigger: '.stats-bar',
            start: 'top 80%',
            once: true,
            onEnter: () => {
              gsap.fromTo(
                { val: 0 },
                {
                  val: endVal,
                  duration: 1.5,
                  ease: 'power2.out',
                  onUpdate: function () {
                    el.textContent = Math.round(this.targets()[0].val);
                  },
                }
              );
            },
          });
        });
      }, sectionRef.current);

      return () => ctx.revert();
    }

    init();
  }, []);

  return (
    <section className="team-section" id="team" ref={sectionRef}>
      <div className="team-section__header">
        <div>
          <p className="section-label" data-index="03">
            The Team
          </p>
          <h2>
            People behind
            <br />
            the craft.
          </h2>
        </div>
        <p className="team-section__subtitle">
          A tight crew of strategists, designers, and engineers
          who believe that the best work happens at the intersection
          of ideas and obsessive attention to detail.
        </p>
      </div>

      <div className="team-grid">
        {TEAM.map((member) => (
          <TiltCard key={member.name} member={member} />
        ))}
      </div>

      {/* Stats bar */}
      <div className="stats-bar" aria-label="Agency statistics">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="stats-bar__item">
            <div className="stats-bar__num">
              <span className={`stat-num-${i}`}>{stat.num}</span>
              <span style={{ color: 'var(--color-accent)' }}>{stat.suffix}</span>
            </div>
            <p className="stats-bar__label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
