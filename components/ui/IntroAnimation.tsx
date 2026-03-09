'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const NAME = 'EMILIANO'
const SURNAME = 'ARCOS'

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'assembling' | 'hold' | 'exit'>('assembling')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Phase 1: letters assemble (1.8s)
    const t1 = setTimeout(() => setPhase('hold'), 1800)
    // Phase 2: hold briefly (0.6s)
    const t2 = setTimeout(() => setPhase('exit'), 2400)
    // Phase 3: exit anim finishes (0.8s)
    const t3 = setTimeout(() => {
      setVisible(false)
      onComplete()
    }, 3200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  const letterVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -90, filter: 'blur(8px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
  }

  const subtitleVariants = {
    hidden: { opacity: 0, letterSpacing: '0.6em' },
    visible: {
      opacity: 1,
      letterSpacing: '0.35em',
      transition: { duration: 0.8, delay: 1.2, ease: 'easeOut' as const },
    },
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-overlay flex-col gap-4"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background radial glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(109,40,217,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Name */}
          <div style={{ display: 'flex', gap: '0.05em', perspective: '600px' }}>
            {NAME.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate={phase === 'assembling' || phase === 'hold' ? 'visible' : 'hidden'}
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(3rem, 10vw, 7rem)',
                  fontWeight: 800,
                  color: '#e8e8f0',
                  letterSpacing: '-0.02em',
                  display: 'inline-block',
                  lineHeight: 1,
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Surname with gradient */}
          <div style={{ display: 'flex', gap: '0.05em', perspective: '600px' }}>
            {SURNAME.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={NAME.length + i}
                variants={letterVariants}
                initial="hidden"
                animate={phase === 'assembling' || phase === 'hold' ? 'visible' : 'hidden'}
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(3rem, 10vw, 7rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #c4b5fd 0%, #818cf8 50%, #67e8f9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.02em',
                  display: 'inline-block',
                  lineHeight: 1,
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate={phase === 'assembling' || phase === 'hold' ? 'visible' : 'hidden'}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)',
              fontWeight: 500,
              color: 'rgba(167,139,250,0.8)',
              textTransform: 'uppercase',
              marginTop: '0.75rem',
            }}
          >
            Industrial &amp; Systems Engineering · Developer
          </motion.p>

          {/* Bottom progress line */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.2, delay: 0.2, ease: 'linear' }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, #6d28d9, #0891b2)',
              transformOrigin: 'left',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
