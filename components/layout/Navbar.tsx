'use client'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Track active section
  useEffect(() => {
    const sections = ['about', 'skills', 'projects', 'experience', 'education', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const switchLocale = () => {
    const next = locale === 'es' ? 'en' : 'es'
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
  }

  const links = ['about', 'skills', 'projects', 'experience', 'education', 'contact'] as const

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 3.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050508]/80 backdrop-blur-xl border-b border-white/[0.04]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="group relative">
            <span
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.03em' }}
              className="text-white"
            >
              EA
            </span>
            <span
              className="ml-1 text-xs font-medium text-purple-400/60"
              style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.1em' }}
            >
              .dev
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <li key={link} className="relative group">
                <a
                  href={`#${link}`}
                  className="flex items-center gap-1.5 text-sm transition-colors duration-200"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    color: activeSection === link ? '#e8e8f0' : 'rgba(232,232,240,0.4)',
                    fontWeight: activeSection === link ? 500 : 400,
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.6rem',
                      fontFamily: 'Syne, sans-serif',
                      color: 'rgba(167,139,250,0.5)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {t(link)}
                </a>
                {activeSection === link && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, #7c3aed, #0891b2)' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Locale switcher */}
            <button
              onClick={switchLocale}
              data-hover
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
              className="text-xs px-3 py-1.5 rounded-full border border-purple-500/30 text-purple-400/80 hover:border-purple-400 hover:text-purple-300 transition-all"
            >
              {locale === 'es' ? 'EN' : 'ES'}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className="block w-5 h-px bg-white origin-center" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-5 h-px bg-white" />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="block w-5 h-px bg-white origin-center" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#050508]/95 backdrop-blur-xl border-b border-white/[0.04] md:hidden"
          >
            <ul className="px-6 py-6 flex flex-col gap-4">
              {links.map((link, i) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-base py-2 border-b border-white/[0.03]"
                    style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(232,232,240,0.7)' }}
                  >
                    <span className="text-purple-400/50 text-xs font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {t(link)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
