/**
 * hero-scene.js
 * Three.js animated sphere setup for Luminary hero section.
 *
 * Exports: initHeroScene(canvas) → cleanup function
 *
 * Scene contents:
 *  - IcosahedronGeometry sphere with wireframe overlay
 *  - Inner distorted sphere with purple/indigo gradient material
 *  - Particle field orbiting the sphere
 *  - Mouse-reactive rotation
 *  - Point lights with accent colors
 */

import * as THREE from 'three';

export function initHeroScene(canvas) {
  if (!canvas) return () => {};

  // ── Renderer ─────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);

  // ── Scene & Camera ────────────────────────────────────────
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    55,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 4.5);

  // ── Lights ────────────────────────────────────────────────
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x6366f1, 4, 20);
  pointLight1.position.set(3, 3, 3);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x8b5cf6, 3, 20);
  pointLight2.position.set(-3, -2, 2);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0x818cf8, 2, 15);
  pointLight3.position.set(0, -3, -2);
  scene.add(pointLight3);

  // ── Main Sphere (inner solid) ─────────────────────────────
  const sphereGeo = new THREE.IcosahedronGeometry(1.2, 5);
  const sphereMat = new THREE.MeshPhongMaterial({
    color: 0x4f46e5,
    emissive: 0x1e1b4b,
    emissiveIntensity: 0.4,
    shininess: 120,
    specular: 0x818cf8,
    transparent: true,
    opacity: 0.85,
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  scene.add(sphere);

  // ── Wireframe overlay ─────────────────────────────────────
  const wireGeo = new THREE.IcosahedronGeometry(1.25, 3);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x818cf8,
    wireframe: true,
    transparent: true,
    opacity: 0.18,
  });
  const wireSphere = new THREE.Mesh(wireGeo, wireMat);
  scene.add(wireSphere);

  // ── Outer glow shell ──────────────────────────────────────
  const glowGeo = new THREE.SphereGeometry(1.55, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.06,
    side: THREE.BackSide,
  });
  const glowMesh = new THREE.Mesh(glowGeo, glowMat);
  scene.add(glowMesh);

  // ── Particle ring ─────────────────────────────────────────
  const PARTICLE_COUNT = 1800;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const particleColors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Distribute on sphere surface with some radius variation
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 1.8 + Math.random() * 1.2;

    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    // Blend between primary (#6366f1) and accent (#8b5cf6)
    const t = Math.random();
    particleColors[i * 3]     = 0.39 + t * 0.15;  // R
    particleColors[i * 3 + 1] = 0.40 + t * 0.04;  // G
    particleColors[i * 3 + 2] = 0.95;              // B

    sizes[i] = Math.random() * 2.5 + 0.5;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
  particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const particleMat = new THREE.PointsMaterial({
    size: 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ── Ring / torus accent ───────────────────────────────────
  const ringGeo = new THREE.TorusGeometry(2.0, 0.005, 8, 200);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.4,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 6;
  scene.add(ring);

  const ring2Geo = new THREE.TorusGeometry(2.4, 0.004, 8, 200);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.25,
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.x = -Math.PI / 4;
  ring2.rotation.y = Math.PI / 6;
  scene.add(ring2);

  // ── Mouse interaction ─────────────────────────────────────
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;

  function onMouseMove(e) {
    targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.6;
    targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.4;
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // ── Resize ────────────────────────────────────────────────
  function onResize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', onResize);

  // ── Animation Loop ────────────────────────────────────────
  let animId;
  const clock = new THREE.Clock();

  function animate() {
    animId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth mouse follow
    currentRotX += (targetRotX - currentRotX) * 0.04;
    currentRotY += (targetRotY - currentRotY) * 0.04;

    // Sphere rotation
    sphere.rotation.y = t * 0.12 + currentRotY;
    sphere.rotation.x = t * 0.07 + currentRotX;

    wireSphere.rotation.y = -t * 0.1 + currentRotY;
    wireSphere.rotation.x = t * 0.05 + currentRotX;

    // Particles orbit slowly
    particles.rotation.y = t * 0.06;
    particles.rotation.x = currentRotX * 0.3;

    // Rings spin on different axes
    ring.rotation.z = t * 0.08;
    ring2.rotation.z = -t * 0.05;

    // Glow pulse
    glowMesh.material.opacity = 0.04 + Math.sin(t * 1.5) * 0.02;

    // Light orbit
    pointLight1.position.x = Math.sin(t * 0.4) * 4;
    pointLight1.position.z = Math.cos(t * 0.4) * 4;
    pointLight2.position.x = Math.sin(t * 0.3 + Math.PI) * 4;
    pointLight2.position.z = Math.cos(t * 0.3 + Math.PI) * 3;

    renderer.render(scene, camera);
  }

  animate();

  // ── Cleanup ───────────────────────────────────────────────
  return function cleanup() {
    cancelAnimationFrame(animId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    sphereGeo.dispose();
    sphereMat.dispose();
    wireGeo.dispose();
    wireMat.dispose();
    glowGeo.dispose();
    glowMat.dispose();
    particleGeo.dispose();
    particleMat.dispose();
    ringGeo.dispose();
    ringMat.dispose();
    ring2Geo.dispose();
    ring2Mat.dispose();
  };
}
