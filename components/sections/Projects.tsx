'use client'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '@/lib/data/projects'

export default function Projects() {
  const t = useTranslations('projects')
  const locale = useLocale()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="section-padding" style={{background: 'rgba(18,18,26,0.3)'}}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-bold mb-12 gradient-text" style={{fontFamily: 'var(--font-space-grotesk)'}}
        >
          {t('title')}
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-[#12121a] border border-white/5 hover:border-cyan-400/30 transition-all flex flex-col"
            >
              <h3 className="font-bold text-white mb-3" style={{fontFamily: 'var(--font-space-grotesk)'}}>{project.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                {project.description[locale as 'es' | 'en']}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 transition-all text-slate-400">
                    {t('view_code')}
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 transition-all text-purple-400">
                    {t('view_demo')}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
