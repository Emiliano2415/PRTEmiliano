'use client'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: '3+', key: 'projects' },
  { value: '10+', key: 'technologies' },
  { value: 'UAT', key: 'university' },
]

export default function About() {
  const t = useTranslations('about')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      {/* Section divider line */}
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
        {/* Header row */}
        <div className="flex items-start justify-between gap-8 mb-16 flex-wrap">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label mb-2">01 — About</p>
            <h2
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
              className="text-white"
            >
              {t('title')}
            </h2>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.key} className="text-right">
                <p
                  style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.04em' }}
                  className="gradient-text"
                >
                  {stat.value}
                </p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', color: 'rgba(232,232,240,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {t(`stats.${stat.key}`)}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Main content: two-column asymmetric */}
        <div className="grid lg:grid-cols-[5fr_3fr] gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: 'rgba(232,232,240,0.65)',
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              {t('description')}
            </p>
          </motion.div>

          {/* Right: quick facts */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="glass-card p-6 space-y-4"
          >
            {[
              { label: 'Location', value: 'Tampico, México' },
              { label: 'Status', value: 'Open to work' },
              { label: 'Focus', value: 'Web · Data · Automation' },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center py-3 border-b border-white/[0.04] last:border-0">
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: 'rgba(167,139,250,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {item.label}
                </span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(232,232,240,0.75)', fontWeight: 500 }}>
                  {item.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
