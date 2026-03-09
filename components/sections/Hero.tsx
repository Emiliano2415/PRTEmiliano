'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowDownRight, FileText } from 'lucide-react'
import AvatarSVG from '@/components/ui/AvatarSVG'

const DELAY_BASE = 3.5 // after intro finishes

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: DELAY_BASE + delay, ease: 'easeOut' as const },
})

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-16 section-padding pt-32 overflow-hidden">
      {/* Large decorative background name — watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(5rem, 18vw, 18rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.025)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          zIndex: 0,
        }}
      >
        EMILIANO
      </div>

      {/* Vertical line left */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: DELAY_BASE, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          left: '1.5rem',
          top: '25%',
          bottom: '15%',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(167,139,250,0.3) 20%, rgba(103,232,249,0.2) 80%, transparent)',
          transformOrigin: 'top',
          zIndex: 1,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">

          {/* Left: text */}
          <div>
            {/* Label */}
            <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-6">
              <span className="section-label">Portfolio · 2025</span>
              <span className="w-8 h-px bg-purple-400/40" />
              <span className="section-label">{t('greeting')}</span>
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: DELAY_BASE + 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.03em',
                  color: '#e8e8f0',
                }}
              >
                {t('name').split(' ')[0]}
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: DELAY_BASE + 0.22, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.03em',
                  background: 'linear-gradient(135deg, #c4b5fd 0%, #818cf8 40%, #67e8f9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('name').split(' ').slice(1).join(' ')}
              </motion.h1>
            </div>

            {/* Role */}
            <motion.p
              {...fadeUp(0.35)}
              style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.05rem', color: 'rgba(232,232,240,0.55)', maxWidth: '460px', lineHeight: 1.6 }}
            >
              {t('title')} — {t('subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-4 mt-8">
              <a
                href="#projects"
                data-hover
                className="flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm transition-all group"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  background: 'linear-gradient(135deg, #6d28d9, #4f46e5)',
                  color: 'white',
                  boxShadow: '0 0 30px rgba(109,40,217,0.3)',
                }}
              >
                {t('cta_projects')}
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <a
                href="/cv_emiliano_arcos.pdf"
                download
                data-hover
                className="flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm transition-all border"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  borderColor: 'rgba(167,139,250,0.25)',
                  color: 'rgba(232,232,240,0.6)',
                  background: 'rgba(109,40,217,0.05)',
                }}
              >
                <FileText className="w-4 h-4" />
                {t('cta_cv')}
              </a>
            </motion.div>
          </div>

          {/* Right: avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: DELAY_BASE + 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow behind avatar */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-20px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(109,40,217,0.25) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              {/* Orbit ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-12px',
                  borderRadius: '50%',
                  border: '1px solid rgba(167,139,250,0.15)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '-24px',
                  borderRadius: '50%',
                  border: '1px dashed rgba(103,232,249,0.1)',
                }}
              />
              <AvatarSVG />
            </div>
          </motion.div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          {...fadeUp(0.7)}
          className="flex items-center gap-3 mt-14"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(167,139,250,0.5), transparent)' }}
          />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', color: 'rgba(167,139,250,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  )
}
