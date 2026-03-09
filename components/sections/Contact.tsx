'use client'
import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Linkedin, Github, Send } from 'lucide-react'
import emailjs from '@emailjs/browser'

const socialLinks = [
  {
    label: 'Email',
    value: 'emiliano.arcos.ramirez16@gmail.com',
    href: 'mailto:emiliano.arcos.ramirez16@gmail.com',
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    value: 'emiliano-arcos-ramirez',
    href: 'https://linkedin.com/in/emiliano-arcos-ramirez-30bb563b1',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    value: 'Emiliano2415',
    href: 'https://github.com/Emiliano2415',
    icon: Github,
  },
]

export default function Contact() {
  const t = useTranslations('contact')
  const ref = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
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

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1.1rem',
    borderRadius: '10px',
    background: 'rgba(13,13,21,0.8)',
    border: '1px solid rgba(255,255,255,0.06)',
    color: '#e8e8f0',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
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
          <p className="section-label mb-2">06 — Contact</p>
          <h2
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
            className="text-white"
          >
            {t('title')}
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: 'rgba(232,232,240,0.45)', marginTop: '0.75rem', maxWidth: '420px', lineHeight: 1.6 }}>
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[2fr_3fr] gap-10 items-start">
          {/* Social column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3"
          >
            {socialLinks.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="glass-card flex items-center gap-4 p-5 group transition-all duration-200"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 transition-colors duration-200"
                  style={{ background: 'rgba(109,40,217,0.08)', border: '1px solid rgba(109,40,217,0.15)' }}
                >
                  <Icon className="w-4 h-4" style={{ color: 'rgba(167,139,250,0.7)' }} />
                </div>
                <div className="min-w-0">
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', color: 'rgba(167,139,250,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.1rem' }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'rgba(232,232,240,0.6)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    className="group-hover:text-white transition-colors">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-card p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                name="user_name"
                type="text"
                required
                placeholder={t('name')}
                style={inputStyle}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(109,40,217,0.4)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
              />
              <input
                name="user_email"
                type="email"
                required
                placeholder={t('email')}
                style={inputStyle}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(109,40,217,0.4)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
              />
            </div>
            <textarea
              name="message"
              required
              rows={5}
              placeholder={t('message')}
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(109,40,217,0.4)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              data-hover
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-medium text-sm transition-all disabled:opacity-50"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                background: 'linear-gradient(135deg, #6d28d9, #4f46e5)',
                color: 'white',
                boxShadow: '0 0 30px rgba(109,40,217,0.25)',
              }}
            >
              <Send className="w-4 h-4" />
              {status === 'sending' ? t('sending') : t('send')}
            </button>

            {status === 'success' && (
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: '#67e8f9', textAlign: 'center' }}>
                {t('success')}
              </p>
            )}
            {status === 'error' && (
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: '#f87171', textAlign: 'center' }}>
                {t('error')}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
