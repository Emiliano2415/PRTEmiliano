'use client'
import { useState } from 'react'
import IntroAnimation from './IntroAnimation'
import CustomCursor from './CustomCursor'
import FloatingParticles from './FloatingParticles'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      <CustomCursor />
      <FloatingParticles />
      <div className="mesh-bg" />
      <IntroAnimation onComplete={() => setIntroDone(true)} />
      <div
        style={{
          opacity: introDone ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        {children}
      </div>
    </>
  )
}
