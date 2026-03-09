'use client'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import { projects } from '@/lib/data/projects'

export default function Projects() {
  const t = useTranslations('projects')
  const locale = useLocale()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
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
          <p className="section-label mb-2">03 — Projects</p>
          <h2
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
            className="text-white"
          >
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-7 flex flex-col gap-5 group transition-all duration-300"
            >
              {/* Number badge */}
              <div className="flex items-start justify-between">
                <span
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: '2.5rem',
                    lineHeight: 1,
                    color: 'rgba(255,255,255,0.04)',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-hover
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 transition-all"
                    >
                      <Github className="w-3.5 h-3.5 text-white/50" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-hover
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-purple-500/30 hover:border-purple-400 transition-all"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
                    </a>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#e8e8f0', letterSpacing: '-0.01em', lineHeight: 1.3 }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(232,232,240,0.5)', lineHeight: 1.65, flex: 1 }}
              >
                {project.description[locale as 'es' | 'en']}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>

              {/* Bottom divider that grows on hover */}
              <div
                className="h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'linear-gradient(90deg, #6d28d9, #0891b2)' }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
