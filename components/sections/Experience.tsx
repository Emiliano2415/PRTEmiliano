'use client'
import { useTranslations } from 'next-intl'
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
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-bold mb-12 gradient-text" style={{fontFamily: 'var(--font-space-grotesk)'}}
        >
          {t('title')}
        </motion.h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-purple-600 via-cyan-400 to-transparent" />
          <div className="space-y-8 pl-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="absolute -left-9 w-4 h-4 rounded-full bg-purple-600 border-2 border-[#0a0a0f]" />
                <div className="p-6 rounded-xl bg-[#12121a] border border-white/5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-white" style={{fontFamily: 'var(--font-space-grotesk)'}}>{exp.role.es}</h3>
                    <span className="text-xs text-cyan-400 font-medium">{exp.period}</span>
                  </div>
                  <p className="text-purple-400 text-sm mb-3">{exp.company}</p>
                  <p className="text-slate-400 text-sm">{exp.description.es}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
