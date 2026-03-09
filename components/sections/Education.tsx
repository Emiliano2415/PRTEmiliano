'use client'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, MapPin, Calendar } from 'lucide-react'

export default function Education() {
  const t = useTranslations('education')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="section-padding relative" ref={ref}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0, left: '6rem', right: '6rem',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-2">05 — Education</p>
          <h2
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
            className="text-white"
          >
            {t('title')}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card p-8 max-w-3xl group"
        >
          <div className="flex items-start gap-6">
            {/* Icon */}
            <div
              className="w-14 h-14 flex items-center justify-center rounded-2xl flex-shrink-0"
              style={{ background: 'rgba(109,40,217,0.1)', border: '1px solid rgba(109,40,217,0.2)' }}
            >
              <GraduationCap className="w-7 h-7" style={{ color: '#c4b5fd' }} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#e8e8f0', letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: '0.5rem' }}
              >
                Ingeniería Industrial y de Sistemas
              </h3>
              <p
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(167,139,250,0.8)', fontWeight: 500, marginBottom: '0.75rem' }}
              >
                Universidad Autónoma de Tamaulipas (UAT)
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-1.5" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: 'rgba(232,232,240,0.4)' }}>
                  <MapPin className="w-3 h-3" />
                  Tampico, Tamaulipas
                </span>
                <span className="flex items-center gap-1.5" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: 'rgba(232,232,240,0.4)' }}>
                  <Calendar className="w-3 h-3" />
                  2022 — 2028 ({t('expected')})
                </span>
              </div>
            </div>
          </div>

          <div
            className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500"
            style={{ background: 'linear-gradient(90deg, #6d28d9, #0891b2)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
