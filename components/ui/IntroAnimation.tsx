'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Phase 1: logo assembles (1.2s)
    const t1 = setTimeout(() => setPhase('hold'), 1200)
    // Phase 2: hold with pulse (1.0s)
    const t2 = setTimeout(() => setPhase('exit'), 2200)
    // Phase 3: exit slides up (0.7s)
    const t3 = setTimeout(() => {
      setVisible(false)
      onComplete()
    }, 2900)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-overlay"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {/* Radial glow bg */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(109,40,217,0.18) 0%, rgba(79,70,229,0.08) 40%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />

          {/* SVG ring that draws itself */}
          <motion.svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            style={{ position: 'absolute' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Outer dashed orbit */}
            <motion.circle
              cx="90" cy="90" r="82"
              fill="none"
              stroke="rgba(103,232,249,0.1)"
              strokeWidth="1"
              strokeDasharray="4 6"
              initial={{ pathLength: 0, rotate: 0 }}
              animate={{ pathLength: 1, rotate: 360 }}
              transition={{ pathLength: { duration: 1.2, delay: 0.3, ease: 'easeOut' }, rotate: { duration: 12, repeat: Infinity, ease: 'linear' } }}
              style={{ transformOrigin: '90px 90px' }}
            />
            {/* Inner solid ring */}
            <motion.circle
              cx="90" cy="90" r="68"
              fill="none"
              stroke="rgba(167,139,250,0.15)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.0, delay: 0.4, ease: 'easeOut' }}
            />
            {/* Small glowing dot on orbit */}
            <motion.circle
              cx="90" cy="8"
              r="3"
              fill="#c4b5fd"
              style={{ transformOrigin: '90px 90px', filter: 'drop-shadow(0 0 4px #c4b5fd)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </motion.svg>

          {/* EA.dev logo — centered */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0', position: 'relative', zIndex: 2 }}>
            {/* EA */}
            <motion.span
              initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                color: '#e8e8f0',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              EA
            </motion.span>

            {/* .dev */}
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(0.9rem, 2.5vw, 1.4rem)',
                color: 'rgba(167,139,250,0.6)',
                letterSpacing: '0.08em',
                marginLeft: '0.15em',
                marginBottom: '0.1em',
                alignSelf: 'flex-end',
              }}
            >
              .dev
            </motion.span>
          </div>

          {/* Glowing underline that draws after logo appears */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              bottom: 'calc(50% - 2.2rem)',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'clamp(80px, 12vw, 140px)',
              height: '1.5px',
              background: 'linear-gradient(90deg, transparent, #7c3aed, #67e8f9, transparent)',
              transformOrigin: 'center',
              boxShadow: '0 0 8px rgba(124,58,237,0.5)',
            }}
          />

          {/* Tagline below */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: 'calc(50% - 4rem)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(0.55rem, 1.2vw, 0.7rem)',
              fontWeight: 400,
              color: 'rgba(167,139,250,0.45)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Emiliano Arcos · Portfolio
          </motion.p>

          {/* Corner accents */}
          {[
            { top: '10%', left: '8%' },
            { top: '10%', right: '8%' },
            { bottom: '10%', left: '8%' },
            { bottom: '10%', right: '8%' },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.07 }}
              style={{
                position: 'absolute',
                width: '20px',
                height: '20px',
                ...pos,
                borderTop: i < 2 ? '1px solid rgba(167,139,250,0.2)' : undefined,
                borderBottom: i >= 2 ? '1px solid rgba(167,139,250,0.2)' : undefined,
                borderLeft: i % 2 === 0 ? '1px solid rgba(167,139,250,0.2)' : undefined,
                borderRight: i % 2 === 1 ? '1px solid rgba(167,139,250,0.2)' : undefined,
              }}
            />
          ))}

          {/* Bottom progress line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, delay: 0.1, ease: 'linear' }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, #6d28d9, #4f46e5, #0891b2)',
              transformOrigin: 'left',
              boxShadow: '0 0 10px rgba(109,40,217,0.4)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
