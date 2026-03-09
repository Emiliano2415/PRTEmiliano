'use client'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Zap, Globe, BarChart2, MessageSquare } from 'lucide-react'
import { skillCategories } from '@/lib/data/skills'

const iconMap = { Zap, Globe, BarChart2, MessageSquare }

const accentColors = [
  { text: '#c4b5fd', bg: 'rgba(109,40,217,0.08)', border: 'rgba(109,40,217,0.2)' },
  { text: '#67e8f9', bg: 'rgba(8,145,178,0.08)', border: 'rgba(8,145,178,0.2)' },
  { text: '#a5f3fc', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.2)' },
  { text: '#ddd6fe', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)' },
]

export default function Skills() {
  const t = useTranslations('skills')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
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
          <p className="section-label mb-2">02 — Skills</p>
          <h2
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
            className="text-white"
          >
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.iconName]
            const accent = accentColors[i % accentColors.length]
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card p-6 flex flex-col gap-5 group transition-all duration-300"
                style={{ cursor: 'default' }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-xl"
                  style={{ background: accent.bg, border: `1px solid ${accent.border}` }}
                >
                  <Icon className="w-5 h-5" style={{ color: accent.text }} />
                </div>

                {/* Name */}
                <div>
                  <h3
                    style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#e8e8f0', letterSpacing: '0.01em' }}
                  >
                    {cat.name}
                  </h3>
                  <div
                    className="mt-1 h-px w-8 transition-all duration-300 group-hover:w-full"
                    style={{ background: `linear-gradient(90deg, ${accent.text}, transparent)` }}
                  />
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map(skill => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.68rem',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '99px',
                        background: accent.bg,
                        border: `1px solid ${accent.border}`,
                        color: accent.text,
                        fontWeight: 500,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
