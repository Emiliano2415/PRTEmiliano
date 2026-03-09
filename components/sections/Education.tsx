'use client'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap } from 'lucide-react'

export default function Education() {
  const t = useTranslations('education')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="section-padding" style={{ background: 'rgba(18,18,26,0.5)' }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-bold mb-12 gradient-text" style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {t('title')}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-2xl bg-[#12121a] border border-white/5 max-w-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Ingeniería Industrial y de Sistemas
              </h3>
              <p className="text-cyan-400 font-medium mb-2">Universidad Autónoma de Tamaulipas (UAT)</p>
              <p className="text-slate-500 text-sm">Tampico, Tamaulipas · 2022 — 2028 ({t('expected')})</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
