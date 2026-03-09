'use client'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const switchLocale = () => {
    const next = locale === 'es' ? 'en' : 'es'
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
  }

  const links = ['about', 'skills', 'projects', 'experience', 'education', 'contact'] as const

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#12121a]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-xl gradient-text" style={{ fontFamily: 'var(--font-space-grotesk)' }}>EA</span>
        <ul className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <li key={link}>
              <a href={`#${link}`} className="text-slate-400 hover:text-white transition-colors text-sm">
                {t(link)}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={switchLocale} className="text-xs font-medium px-3 py-1.5 rounded-full border border-purple-500/40 text-purple-400 hover:bg-purple-500/10 transition-all">
          {locale === 'es' ? 'EN' : 'ES'}
        </button>
      </div>
    </nav>
  )
}
