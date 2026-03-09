'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="min-h-screen flex items-center section-padding pt-24">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-cyan-400 font-medium mb-2 text-sm tracking-widest uppercase">{t('greeting')}</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {t('name')}
          </h1>
          <p className="text-slate-300 text-xl mb-3">{t('title')}</p>
          <p className="text-slate-500 mb-8">{t('subtitle')}</p>
          <div className="flex gap-4 flex-wrap">
            <a href="#projects" className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition-all">
              {t('cta_projects')}
            </a>
            <a href="/cv_emiliano_arcos.pdf" download className="px-6 py-3 border border-white/10 hover:border-purple-500/40 rounded-lg font-medium transition-all text-slate-300">
              {t('cta_cv')}
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/30 to-cyan-400/30 blur-2xl" />
            <div className="relative z-10 w-full h-full rounded-full border-4 border-purple-600/20 overflow-hidden bg-[#12121a] flex items-center justify-center">
              <span className="text-8xl">👤</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
