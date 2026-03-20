'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Hero — Full-screen canvas with Three.js particle field + brutalist text overlay.
 *
 * Three.js is dynamically imported to avoid Next.js SSR issues.
 * The canvas sits behind all content (z-index: 0); text is z-index: 1.
 */
export default function Hero() {
  const canvasRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const tagRef = useRef(null);

  /* ─── Three.js scene ────────────────────────────────────────── */
  useEffect(() => {
    let renderer, animId;

    async function initScene() {
      const THREE = await import('three');
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Renderer
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      renderer.setClearColor(0x000000, 0);

      // Scene + Camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
      camera.position.z = 6;

      /* ── Particle field ── */
      const COUNT = 2800;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(COUNT * 3);
      const colors    = new Float32Array(COUNT * 3);

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 22;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 22;

        // White-to-red gradient particles
        const t = Math.random();
        colors[i * 3]     = 1;                    // R: full
        colors[i * 3 + 1] = t < 0.2 ? 0.27 : 1;  // G: low for red particles
        colors[i * 3 + 2] = t < 0.2 ? 0.27 : 1;  // B: low for red particles
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      /* ── Wireframe icosahedron (centre piece) ── */
      const icoGeo = new THREE.IcosahedronGeometry(1.4, 1);
      const icoMat = new THREE.MeshBasicMaterial({
        color: 0xef4444,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const icosahedron = new THREE.Mesh(icoGeo, icoMat);
      scene.add(icosahedron);

      /* ── Mouse parallax ── */
      let mouseX = 0, mouseY = 0;
      const onMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.6;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.6;
      };
      window.addEventListener('mousemove', onMouseMove);

      /* ── Resize ── */
      const onResize = () => {
        if (!canvas) return;
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      };
      window.addEventListener('resize', onResize);

      /* ── Animation loop ── */
      const clock = new THREE.Clock();
      function animate() {
        animId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        points.rotation.y = t * 0.04 + mouseX * 0.5;
        points.rotation.x = t * 0.02 + mouseY * 0.5;

        icosahedron.rotation.x = t * 0.25;
        icosahedron.rotation.y = t * 0.18;

        renderer.render(scene, camera);
      }
      animate();

      // Cleanup
      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        geometry.dispose();
        material.dispose();
        icoGeo.dispose();
        icoMat.dispose();
        renderer.dispose();
      };
    }

    let cleanupFn;
    initScene().then((fn) => { cleanupFn = fn; });
    return () => { if (cleanupFn) cleanupFn(); };
  }, []);

  /* ─── GSAP text entrance ─────────────────────────────────────── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from(tagRef.current,      { y: 30,  opacity: 0, duration: 0.7, delay: 0.5 })
      .from(headlineRef.current, { y: 80,  opacity: 0, duration: 1.1 }, '-=0.4')
      .from(subRef.current,      { y: 40,  opacity: 0, duration: 0.8 }, '-=0.7')
      .from(ctaRef.current,      { y: 30,  opacity: 0, duration: 0.7 }, '-=0.5');
  }, []);

  /* ─── JSX ─────────────────────────────────────────────────────── */
  return (
    <section
      id="hero"
      role="banner"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000',
        borderBottom: '5px solid #ffffff',
      }}
    >
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      {/* Noise grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Red bottom-left corner accent */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 'clamp(120px, 18vw, 260px)',
          height: 'clamp(120px, 18vw, 260px)',
          background: '#ef4444',
          opacity: 0.12,
          filter: 'blur(60px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        {/* Tag pill */}
        <div
          ref={tagRef}
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#ef4444',
            border: '2px solid #ef4444',
            padding: '0.3rem 0.9rem',
            marginBottom: '2rem',
          }}
        >
          Creative Agency — Est. 2015
        </div>

        {/* Hero headline */}
        <h1
          ref={headlineRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-hero)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: '#ffffff',
            marginBottom: '2.5rem',
          }}
        >
          WE BUILD{' '}
          <span
            style={{
              display: 'inline-block',
              color: '#ef4444',
              WebkitTextStroke: '0px',
            }}
          >
            BOLD
          </span>
          <br />
          DIGITAL
          <br />
          <span
            style={{
              WebkitTextStroke: '2px #ffffff',
              color: 'transparent',
            }}
          >
            EXPERIENCES
          </span>
        </h1>

        {/* Sub-text */}
        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.35rem)',
            color: 'rgba(255,255,255,0.65)',
            maxWidth: '640px',
            margin: '0 auto 3rem',
            lineHeight: 1.6,
          }}
        >
          Apex Studio crafts brands, web experiences and motion that stop scrolls
          and start conversations. Strategy-led. Craft-obsessed.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="#case-studies" className="btn btn-primary">
            View Our Work
          </a>
          <a href="#contact" className="btn btn-outline">
            Start a Project
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1.5px',
            height: '50px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(239,68,68,0.8))',
            animation: 'scrollPulse 1.8s ease-in-out infinite',
          }}
        />
        <style>{`
          @keyframes scrollPulse {
            0%, 100% { transform: scaleY(1); opacity: 0.5; }
            50%        { transform: scaleY(0.5); opacity: 1; }
          }
        `}</style>
      </div>
    </section>
  );
}
