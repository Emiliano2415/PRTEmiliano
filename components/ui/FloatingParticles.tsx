'use client'
import React, { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number       // vw
  y: number       // vh
  size: number    // px
  color: string
  duration: number // animation duration in seconds
  delay: number    // animation delay in seconds
  shape: 'circle' | 'diamond' | 'cross'
}

const COLORS = [
  'rgba(109,40,217,0.55)',   // purple
  'rgba(196,181,253,0.45)',  // lavender
  'rgba(103,232,249,0.45)',  // cyan
  'rgba(129,140,248,0.4)',   // indigo
]

function seededRandom(seed: number): number {
  // Simple deterministic pseudo-random using a seed to avoid hydration mismatch
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const r = (offset: number) => seededRandom(i * 7 + offset)
    const shape = (['circle', 'diamond', 'cross'] as const)[Math.floor(r(0) * 3)]
    return {
      id: i,
      x: r(1) * 100,
      y: r(2) * 100,
      size: 2 + r(3) * 4,
      color: COLORS[Math.floor(r(4) * COLORS.length)],
      duration: 8 + r(5) * 16,
      delay: -(r(6) * 20), // negative delay = start mid-animation
      shape,
    }
  })
}

const PARTICLE_COUNT = 18
const PARTICLES = buildParticles(PARTICLE_COUNT)

// CSS keyframes injected once
const STYLES = `
@keyframes fp-drift {
  0%   { transform: translateY(0px) translateX(0px) scale(1); opacity: 0; }
  10%  { opacity: 1; }
  50%  { transform: translateY(-35px) translateX(12px) scale(1.15); opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(-70px) translateX(-8px) scale(0.8); opacity: 0; }
}
@keyframes fp-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
`

function ParticleShape({ p }: { p: Particle }) {
  const base: React.CSSProperties = {
    position: 'absolute',
    left: `${p.x}vw`,
    top: `${p.y}vh`,
    animation: `fp-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
    pointerEvents: 'none',
    willChange: 'transform, opacity',
  }

  if (p.shape === 'circle') {
    return (
      <span
        style={{
          ...base,
          width: p.size,
          height: p.size,
          borderRadius: '50%',
          background: p.color,
          boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
        }}
      />
    )
  }

  if (p.shape === 'diamond') {
    return (
      <span
        style={{
          ...base,
          width: p.size,
          height: p.size,
          background: p.color,
          transform: 'rotate(45deg)',
          boxShadow: `0 0 ${p.size * 1.5}px ${p.color}`,
        }}
      />
    )
  }

  // cross / plus
  const arm = p.size * 0.28
  return (
    <span style={{ ...base, width: p.size, height: p.size, position: 'absolute' }}>
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: arm,
          marginTop: -arm / 2,
          background: p.color,
          borderRadius: arm,
        }}
      />
      <span
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: arm,
          marginLeft: -arm / 2,
          background: p.color,
          borderRadius: arm,
        }}
      />
    </span>
  )
}

export default function FloatingParticles() {
  // Render only on client to guarantee consistent output
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <>
      <style>{STYLES}</style>
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {PARTICLES.map((p) => (
          <ParticleShape key={p.id} p={p} />
        ))}
      </div>
    </>
  )
}
