'use client';

import { useEffect, useRef } from 'react';

const MARQUEE_ITEMS = [
  'Brand Identity',
  'Web Design',
  'Motion Design',
  'UX Strategy',
  'Creative Direction',
  '3D & Immersive',
];

export default function Marquee({ direction = 1, speed = 0.5 }) {
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const posRef = useRef(0);
  const animRef = useRef(null);

  useEffect(() => {
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    if (!track1 || !track2) return;

    function animate() {
      posRef.current -= speed * direction;
      const w = track1.offsetWidth;

      if (Math.abs(posRef.current) >= w) {
        posRef.current = 0;
      }

      track1.style.transform = `translateX(${posRef.current}px)`;
      track2.style.transform = `translateX(${posRef.current + (direction > 0 ? w : -w)}px)`;

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [direction, speed]);

  const items = (
    <>
      {MARQUEE_ITEMS.map((item) => (
        <span key={item} className="marquee-item">
          {item}
          <span className="marquee-dot" aria-hidden="true" />
        </span>
      ))}
    </>
  );

  return (
    <section className="about-section" id="about" aria-label="Services marquee">
      <div className="marquee-wrapper" aria-hidden="true">
        <div
          ref={track1Ref}
          className="marquee-track"
          style={{ position: 'absolute', whiteSpace: 'nowrap' }}
        >
          {items}
        </div>
        <div
          ref={track2Ref}
          className="marquee-track"
          style={{ position: 'absolute', whiteSpace: 'nowrap' }}
        >
          {items}
        </div>
        {/* Invisible spacer to give section height */}
        <div
          className="marquee-track"
          style={{ visibility: 'hidden', position: 'relative' }}
        >
          {items}
        </div>
      </div>
    </section>
  );
}
