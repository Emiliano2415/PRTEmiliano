'use client'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const t = useTranslations('contact')
  const ref = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl font-bold mb-4 gradient-text" style={{fontFamily: 'var(--font-space-grotesk)'}}
        >
          {t('title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-slate-400 mb-12"
        >
          {t('subtitle')}
        </motion.p>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {[
              { label: 'Email', value: 'emiliano.arcos.ramirez16@gmail.com', href: 'mailto:emiliano.arcos.ramirez16@gmail.com' },
              { label: 'LinkedIn', value: 'emiliano-arcos-ramirez', href: 'https://linkedin.com/in/emiliano-arcos-ramirez-30bb563b1' },
              { label: 'GitHub', value: 'Emiliano2415', href: 'https://github.com/Emiliano2415' },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#12121a] border border-white/5 hover:border-purple-500/30 transition-all group">
                <span className="text-slate-500 text-sm w-20 flex-shrink-0">{link.label}</span>
                <span className="text-slate-300 group-hover:text-purple-400 transition-colors text-sm truncate">{link.value}</span>
              </a>
            ))}
          </motion.div>
          {/* Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <input name="user_name" type="text" required
              placeholder={t('name')}
              className="w-full px-4 py-3 rounded-xl bg-[#12121a] border border-white/10 focus:border-purple-500/50 outline-none text-slate-300 placeholder-slate-600 transition-all" />
            <input name="user_email" type="email" required
              placeholder={t('email')}
              className="w-full px-4 py-3 rounded-xl bg-[#12121a] border border-white/10 focus:border-purple-500/50 outline-none text-slate-300 placeholder-slate-600 transition-all" />
            <textarea name="message" required rows={4} placeholder={t('message')}
              className="w-full px-4 py-3 rounded-xl bg-[#12121a] border border-white/10 focus:border-purple-500/50 outline-none text-slate-300 placeholder-slate-600 transition-all resize-none" />
            <button type="submit" disabled={status === 'sending'}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 font-medium transition-all">
              {status === 'sending' ? t('sending') : t('send')}
            </button>
            {status === 'success' && <p className="text-cyan-400 text-sm text-center">{t('success')}</p>}
            {status === 'error' && <p className="text-red-400 text-sm text-center">{t('error')}</p>}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
