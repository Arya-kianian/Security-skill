'use client';

import { useEffect, useRef } from 'react';

/**
 * Hero
 * Full-screen canvas with a generative particle field that reacts
 * to the mouse position, plus a GSAP staggered title reveal.
 * The canvas replaces a video to keep dependencies zero-config.
 */
export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);

  /* ---- Canvas particle system ---- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W = 0;
    let H = 0;
    let mouse = { x: -9999, y: -9999 };
    const PARTICLE_COUNT = 120;
    const CONNECTION_DIST = 130;

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
        this.baseRadius = this.radius;
        this.alpha = Math.random() * 0.5 + 0.1;
      }
      update() {
        // Mouse repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          this.vx += (dx / dist) * force * 0.5;
          this.vy += (dy / dist) * force * 0.5;
        }

        // Dampen velocity
        this.vx *= 0.98;
        this.vy *= 0.98;

        this.x += this.vx;
        this.y += this.vy;

        // Wrap edges
        if (this.x < 0) this.x = W;
        if (this.x > W) this.x = 0;
        if (this.y < 0) this.y = H;
        if (this.y > H) this.y = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 60, 0, ${this.alpha})`;
        ctx.fill();
      }
    }

    let particles = [];

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 60, 0, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function render() {
      ctx.clearRect(0, 0, W, H);
      // Subtle gradient background
      const gradient = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.8);
      gradient.addColorStop(0, 'rgba(20, 10, 5, 1)');
      gradient.addColorStop(1, 'rgba(10, 10, 10, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);

      drawConnections();
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animFrameRef.current = requestAnimationFrame(render);
    }

    // Init
    resize();
    render();

    // Mouse tracking
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  /* ---- GSAP title reveal ---- */
  useEffect(() => {
    async function init() {
      const { default: gsap } = await import('gsap');

      const tl = gsap.timeline({ delay: 0.4 });

      // Animate each title line span
      tl.to('.hero__title .line span', {
        y: '0%',
        duration: 1.2,
        stagger: 0.12,
        ease: 'power4.out',
      });

      tl.fromTo(
        '.hero__eyebrow',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.8'
      );

      tl.fromTo(
        '.hero__bottom',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
    }
    init();
  }, []);

  return (
    <section className="hero" ref={containerRef} id="hero">
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow" aria-label="Welcome to Apex Studio">
          Est. 2018 — Creative Agency
        </p>

        <h1 className="hero__title" aria-label="We make work that cuts through">
          <span className="line">
            <span>We make</span>
          </span>
          <span className="line">
            <span className="outline">work that</span>
          </span>
          <span className="line">
            <span>cuts through.</span>
          </span>
        </h1>

        <div className="hero__bottom">
          <p className="hero__tagline">
            Brand identities, digital experiences, and motion design
            built for brands that refuse to be ignored.
          </p>
          <div className="hero__scroll-indicator" aria-hidden="true">
            <span className="hero__scroll-line" />
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
