'use client'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const t = useTranslations('about')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding" style={{ background: 'rgba(18,18,26,0.5)' }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-bold mb-12 gradient-text" style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {t('title')}
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg leading-relaxed"
          >
            {t('description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-6"
          >
            {[
              { value: '3+', label: t('stats.projects') },
              { value: '10+', label: t('stats.technologies') },
              { value: 'UAT', label: t('stats.university') },
            ].map(stat => (
              <div key={stat.label} className="text-center p-6 rounded-xl bg-[#12121a] border border-white/5">
                <p className="text-3xl font-bold gradient-text" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{stat.value}</p>
                <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
