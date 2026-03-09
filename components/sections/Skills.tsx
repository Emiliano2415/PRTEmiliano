'use client'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skillCategories } from '@/lib/data/skills'

export default function Skills() {
  const t = useTranslations('skills')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-bold mb-12 gradient-text" style={{fontFamily: 'var(--font-space-grotesk)'}}
        >
          {t('title')}
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-[#12121a] border border-white/5 hover:border-purple-500/30 transition-all"
            >
              <span className="text-3xl mb-4 block">{cat.icon}</span>
              <h3 className="font-semibold text-white mb-4 text-sm">{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span key={skill} className="text-xs px-2 py-1 rounded-full bg-purple-600/10 text-purple-400 border border-purple-500/20">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
