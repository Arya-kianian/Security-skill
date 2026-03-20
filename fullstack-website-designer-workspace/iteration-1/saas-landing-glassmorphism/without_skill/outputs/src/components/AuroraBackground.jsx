/**
 * AuroraBackground
 * Animated multi-layer aurora gradient that fills the viewport.
 * Pure CSS + canvas noise — no heavy dependencies.
 */
import { useEffect, useRef } from 'react'

const AURORA_STYLE = {
  position: 'fixed',
  inset: 0,
  zIndex: 0,
  pointerEvents: 'none',
  overflow: 'hidden',
}

export default function AuroraBackground() {
  const canvasRef = useRef(null)

  // Subtle noise overlay via canvas for depth
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawNoise()
    }

    const drawNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 15 // very subtle
        data[i]     = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = 18 // low alpha
      }
      ctx.putImageData(imageData, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <div style={AURORA_STYLE} aria-hidden="true">
      {/* Deep background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 120% 80% at 50% -10%, #1a0938 0%, #05040f 60%)',
      }} />

      {/* Aurora blob 1 — top-left purple */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '70%',
        height: '70%',
        background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.35) 0%, transparent 70%)',
        animation: 'aurora-move-1 12s ease-in-out infinite',
        filter: 'blur(60px)',
      }} />

      {/* Aurora blob 2 — top-right blue */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        right: '-15%',
        width: '65%',
        height: '65%',
        background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.30) 0%, transparent 70%)',
        animation: 'aurora-move-2 15s ease-in-out infinite',
        filter: 'blur(60px)',
      }} />

      {/* Aurora blob 3 — mid cyan accent */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '30%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.12) 0%, transparent 70%)',
        animation: 'aurora-move-3 18s ease-in-out infinite',
        filter: 'blur(80px)',
      }} />

      {/* Aurora blob 4 — bottom purple pool */}
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '10%',
        width: '80%',
        height: '60%',
        background: 'radial-gradient(ellipse at center, rgba(76,29,149,0.25) 0%, transparent 70%)',
        animation: 'aurora-move-4 20s ease-in-out infinite',
        filter: 'blur(80px)',
      }} />

      {/* Noise canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          mixBlendMode: 'screen',
        }}
      />

      {/* Vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(5,4,15,0.7) 100%)',
      }} />

      <style>{`
        @keyframes aurora-move-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(8%, 12%) scale(1.08); }
          66%       { transform: translate(-5%, 6%) scale(0.95); }
        }
        @keyframes aurora-move-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-10%, 8%) scale(1.05); }
          66%       { transform: translate(5%, 15%) scale(1.1); }
        }
        @keyframes aurora-move-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-15%, -10%) scale(1.2); }
        }
        @keyframes aurora-move-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(10%, -8%) scale(1.1); }
          80%       { transform: translate(-8%, 5%) scale(0.9); }
        }
      `}</style>
    </div>
  )
}
