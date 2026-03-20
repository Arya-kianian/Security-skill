/**
 * HeroSphere
 * Interactive 3D sphere rendered with Three.js via @react-three/fiber.
 * Features: wireframe overlay, emissive glow material, auto-rotate,
 * mouse-parallax tilt, particle field.
 */
import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

/* ── Inner animated sphere ── */
function GlowSphere() {
  const meshRef = useRef()
  const wireRef = useRef()

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime()

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.18
      meshRef.current.rotation.x = Math.sin(t * 0.12) * 0.15
      // Subtle mouse parallax
      meshRef.current.rotation.z = mouse.x * 0.08
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.10
      wireRef.current.rotation.x = t * 0.06
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.4}>
      {/* Main distorted sphere */}
      <Sphere ref={meshRef} args={[1.4, 128, 128]}>
        <MeshDistortMaterial
          color="#4c1d95"
          emissive="#7c3aed"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
          distort={0.35}
          speed={2.5}
          transparent
          opacity={0.92}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere ref={wireRef} args={[1.46, 32, 32]}>
        <meshBasicMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.12}
        />
      </Sphere>

      {/* Outer glow ring */}
      <Sphere args={[1.6, 32, 32]}>
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>
    </Float>
  )
}

/* ── Orbiting rings ── */
function OrbitalRing({ radius, speed, tilt, color, opacity = 0.5 }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * speed
    }
  })

  const curve = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      ))
    }
    return pts
  }, [radius])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(curve)
    return geo
  }, [curve])

  return (
    <group rotation={[tilt, 0, 0]}>
      <line ref={ref} geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={opacity} />
      </line>
    </group>
  )
}

/* ── Floating particles ── */
function Particles({ count = 200 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 12
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.04
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a855f7"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  )
}

/* ── Scene lighting ── */
function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]}  intensity={2}   color="#7c3aed" />
      <pointLight position={[-5, -3, 3]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[0, -5, -3]} intensity={1}   color="#22d3ee" />
    </>
  )
}

/* ── Public component ── */
export default function HeroSphere() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Lights />
        <Stars radius={60} depth={50} count={3000} factor={3} saturation={0.5} fade speed={0.5} />
        <GlowSphere />
        <OrbitalRing radius={2.0} speed={0.4}  tilt={0.5}  color="#7c3aed" opacity={0.45} />
        <OrbitalRing radius={2.4} speed={-0.25} tilt={1.1}  color="#3b82f6" opacity={0.30} />
        <OrbitalRing radius={2.8} speed={0.15}  tilt={-0.7} color="#22d3ee" opacity={0.20} />
        <Particles count={250} />
      </Canvas>
    </div>
  )
}
