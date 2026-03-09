'use client'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    role: { es: 'Desarrollador Freelance', en: 'Freelance Developer' },
    company: 'Cliente — Sector Geológico',
    period: '2024',
    description: {
      es: 'Diseño y desarrollo de portafolio digital personalizado para cliente del sector geológico.',
      en: 'Design and development of a custom digital portfolio for a geology sector client.',
    },
  },
  {
    role: { es: 'Automatización de Datos', en: 'Data Automation' },
    company: 'Proyecto Personal',
    period: '2023 — 2024',
    description: {
      es: 'Scripts Python con Pandas para automatizar reportes de asistencia, reduciendo el tiempo manual en 80%.',
      en: 'Python scripts with Pandas to automate attendance reports, reducing manual time by 80%.',
    },
  },
]

export default function Experience() {
  const t = useTranslations('experience')
  const locale = useLocale()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="section-padding relative" ref={ref}>
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
          <p className="section-label mb-2">04 — Experience</p>
          <h2
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
            className="text-white"
          >
            {t('title')}
          </h2>
        </motion.div>

        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-7 group transition-all duration-300"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3
                      style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#e8e8f0', letterSpacing: '-0.01em' }}
                    >
                      {exp.role[locale as 'es' | 'en']}
                    </h3>
                    <span
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.65rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '99px',
                        background: 'rgba(103,232,249,0.08)',
                        border: '1px solid rgba(103,232,249,0.2)',
                        color: '#67e8f9',
                        fontWeight: 500,
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'rgba(167,139,250,0.7)', marginBottom: '0.75rem', letterSpacing: '0.02em' }}>
                    {exp.company}
                  </p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', color: 'rgba(232,232,240,0.5)', lineHeight: 1.65 }}>
                    {exp.description[locale as 'es' | 'en']}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: '3rem',
                    lineHeight: 1,
                    color: 'rgba(255,255,255,0.03)',
                    letterSpacing: '-0.04em',
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div
                className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'linear-gradient(90deg, #7c3aed, transparent)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
