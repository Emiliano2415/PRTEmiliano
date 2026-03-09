# Portfolio Web — Emiliano Arcos Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a bilingual (ES/EN) personal portfolio web app with dark mode, animations, and EmailJS contact form.

**Architecture:** Next.js 14 App Router with [locale] dynamic routing via next-intl. All sections are React Server Components except animated ones (Client Components). Framer Motion handles scroll animations. No backend — EmailJS handles contact form.

**Tech Stack:** Next.js 14, Tailwind CSS, Framer Motion, next-intl, EmailJS, TypeScript, Vercel

---

## Agent 1 — UI/Layout: Navbar, Hero, About, Education, Footer, i18n

### Task 1: Initialize Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`

**Step 1: Scaffold project**
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --no-git
```

**Step 2: Install additional dependencies**
```bash
npm install framer-motion next-intl @emailjs/browser
npm install -D @types/node
```

**Step 3: Install fonts**
```bash
npm install @next/font
```

**Step 4: Verify dev server starts**
```bash
npm run dev
```
Expected: Server running at http://localhost:3000

**Step 5: Commit**
```bash
git add -A
git commit -m "feat: initialize Next.js 14 project with Tailwind + deps"
```

---

### Task 2: Configure next-intl for i18n (ES/EN)

**Files:**
- Create: `messages/es.json`
- Create: `messages/en.json`
- Create: `middleware.ts`
- Modify: `next.config.ts`
- Create: `app/[locale]/layout.tsx`
- Create: `app/[locale]/page.tsx`

**Step 1: Create middleware.ts**
```typescript
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es'
})

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
}
```

**Step 2: Create messages/es.json**
```json
{
  "nav": {
    "about": "Sobre mí",
    "skills": "Habilidades",
    "projects": "Proyectos",
    "experience": "Experiencia",
    "education": "Educación",
    "contact": "Contacto"
  },
  "hero": {
    "greeting": "Hola, soy",
    "name": "Emiliano Arcos",
    "title": "Ingeniería Industrial y de Sistemas",
    "subtitle": "Automatización · Desarrollo Web · Análisis de Datos",
    "cta_projects": "Ver proyectos",
    "cta_cv": "Descargar CV"
  },
  "about": {
    "title": "Sobre mí",
    "description": "Estudiante de Ingeniería Industrial y de Sistemas en la UAT con experiencia práctica en automatización de procesos, manipulación de datos y desarrollo de dashboards web. Apasionado por resolver problemas con código limpio y eficiente.",
    "stats": {
      "projects": "Proyectos",
      "technologies": "Tecnologías",
      "university": "Universidad"
    }
  },
  "skills": { "title": "Habilidades" },
  "projects": { "title": "Proyectos", "view_code": "Ver código", "view_demo": "Demo" },
  "experience": { "title": "Experiencia" },
  "education": { "title": "Educación", "expected": "Esperada" },
  "contact": {
    "title": "Contacto",
    "subtitle": "¿Tienes un proyecto en mente? Hablemos.",
    "name": "Nombre",
    "email": "Correo",
    "message": "Mensaje",
    "send": "Enviar mensaje",
    "sending": "Enviando...",
    "success": "¡Mensaje enviado correctamente!",
    "error": "Error al enviar. Intenta de nuevo."
  }
}
```

**Step 3: Create messages/en.json**
```json
{
  "nav": {
    "about": "About",
    "skills": "Skills",
    "projects": "Projects",
    "experience": "Experience",
    "education": "Education",
    "contact": "Contact"
  },
  "hero": {
    "greeting": "Hi, I'm",
    "name": "Emiliano Arcos",
    "title": "Industrial & Systems Engineering Student",
    "subtitle": "Automation · Web Development · Data Analysis",
    "cta_projects": "View projects",
    "cta_cv": "Download CV"
  },
  "about": {
    "title": "About me",
    "description": "Industrial and Systems Engineering student at UAT with hands-on experience in process automation, data manipulation, and web-based dashboard development. Passionate about solving problems with clean, efficient code.",
    "stats": {
      "projects": "Projects",
      "technologies": "Technologies",
      "university": "University"
    }
  },
  "skills": { "title": "Skills" },
  "projects": { "title": "Projects", "view_code": "View code", "view_demo": "Demo" },
  "experience": { "title": "Experience" },
  "education": { "title": "Education", "expected": "Expected" },
  "contact": {
    "title": "Contact",
    "subtitle": "Have a project in mind? Let's talk.",
    "name": "Name",
    "email": "Email",
    "message": "Message",
    "send": "Send message",
    "sending": "Sending...",
    "success": "Message sent successfully!",
    "error": "Failed to send. Please try again."
  }
}
```

**Step 4: Update next.config.ts**
```typescript
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin()
/** @type {import('next').NextConfig} */
const nextConfig = {}
export default withNextIntl(nextConfig)
```

**Step 5: Create app/[locale]/layout.tsx**
```typescript
import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import '../globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Emiliano Arcos — Portfolio',
  description: 'Industrial & Systems Engineering Student. Python, React, Data Analysis.',
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  return (
    <html lang={locale} className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-[#0a0a0f] text-slate-100 font-inter antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

**Step 6: Commit**
```bash
git add -A
git commit -m "feat: configure next-intl for ES/EN bilingual support"
```

---

### Task 3: Global styles + Tailwind config

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

**Step 1: Update tailwind.config.ts**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#12121a',
        primary: '#7c3aed',
        secondary: '#06b6d4',
      },
      fontFamily: {
        'space-grotesk': ['var(--font-space-grotesk)'],
        inter: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
}
export default config
```

**Step 2: Update globals.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-inter); }
  h1, h2, h3, h4 { font-family: var(--font-space-grotesk); }
}

@layer utilities {
  .gradient-text {
    @apply bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent;
  }
  .section-padding {
    @apply py-20 px-6 md:px-12 lg:px-24;
  }
}
```

**Step 3: Commit**
```bash
git add -A
git commit -m "feat: configure Tailwind with custom colors and fonts"
```

---

### Task 4: Navbar component with lang switcher

**Files:**
- Create: `components/layout/Navbar.tsx`

**Step 1: Create Navbar.tsx**
```typescript
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
  const [menuOpen, setMenuOpen] = useState(false)

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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-surface/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-space-grotesk font-bold text-xl gradient-text">EA</span>
        <ul className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <li key={link}>
              <a href={`#${link}`} className="text-slate-400 hover:text-white transition-colors text-sm">
                {t(link)}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={switchLocale} className="text-xs font-medium px-3 py-1.5 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all">
          {locale === 'es' ? 'EN' : 'ES'}
        </button>
      </div>
    </nav>
  )
}
```

**Step 2: Commit**
```bash
git add -A
git commit -m "feat: add Navbar with scroll effect and lang switcher"
```

---

### Task 5: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`

**Step 1: Create Hero.tsx**
```typescript
'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'

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
          <p className="text-secondary font-medium mb-2 text-sm tracking-widest uppercase">{t('greeting')}</p>
          <h1 className="font-space-grotesk text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">{t('name')}</span>
          </h1>
          <p className="text-slate-300 text-xl mb-3">{t('title')}</p>
          <p className="text-slate-500 mb-8">{t('subtitle')}</p>
          <div className="flex gap-4 flex-wrap">
            <a href="#projects" className="px-6 py-3 bg-primary hover:bg-primary/80 rounded-lg font-medium transition-all">
              {t('cta_projects')}
            </a>
            <a href="/cv_emiliano_arcos.pdf" download className="px-6 py-3 border border-white/10 hover:border-primary/40 rounded-lg font-medium transition-all text-slate-300">
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl" />
            <Image
              src="/images/profile.jpg"
              alt="Emiliano Arcos"
              fill
              className="rounded-full object-cover border-4 border-primary/20 relative z-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**
```bash
git add -A
git commit -m "feat: add Hero section with Framer Motion animations"
```

---

### Task 6: About + Education sections

**Files:**
- Create: `components/sections/About.tsx`
- Create: `components/sections/Education.tsx`

**Step 1: Create About.tsx**
```typescript
'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const t = useTranslations('about')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding bg-surface/30">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-space-grotesk text-3xl font-bold mb-12 gradient-text"
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
              <div key={stat.label} className="text-center p-6 rounded-xl bg-surface border border-white/5">
                <p className="font-space-grotesk text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Create Education.tsx**
```typescript
'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Education() {
  const t = useTranslations('education')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="section-padding bg-surface/30">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-space-grotesk text-3xl font-bold mb-12 gradient-text"
        >
          {t('title')}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-2xl bg-surface border border-white/5 max-w-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-primary text-xl">🎓</span>
            </div>
            <div>
              <h3 className="font-space-grotesk font-bold text-xl text-white mb-1">
                Ingeniería Industrial y de Sistemas
              </h3>
              <p className="text-secondary font-medium mb-2">Universidad Autónoma de Tamaulipas (UAT)</p>
              <p className="text-slate-500 text-sm">Tampico, Tamaulipas · 2022 — 2028 ({t('expected')})</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

**Step 3: Commit**
```bash
git add -A
git commit -m "feat: add About and Education sections"
```

---

### Task 7: Footer component

**Files:**
- Create: `components/layout/Footer.tsx`

**Step 1: Create Footer.tsx**
```typescript
export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5 text-center">
      <p className="text-slate-600 text-sm">
        © {new Date().getFullYear()} Emiliano Arcos Ramirez · Built with Next.js & ♥
      </p>
    </footer>
  )
}
```

**Step 2: Commit**
```bash
git add -A
git commit -m "feat: add Footer component"
```

---

## Agent 2 — Dynamic Sections: Skills, Projects, Experience

### Task 8: Skills section

**Files:**
- Create: `components/sections/Skills.tsx`
- Create: `lib/data/skills.ts`

**Step 1: Create lib/data/skills.ts**
```typescript
export const skillCategories = [
  {
    name: 'Programming & Automation',
    icon: '⚡',
    skills: ['Python', 'Pandas', 'Scripting', 'Git'],
  },
  {
    name: 'Web Development',
    icon: '🌐',
    skills: ['React', 'Next.js', 'HTML/CSS', 'Flask', 'REST APIs'],
  },
  {
    name: 'Data & Analysis',
    icon: '📊',
    skills: ['SQL', 'Excel', 'Database Management', 'Data Cleaning'],
  },
  {
    name: 'Languages',
    icon: '💬',
    skills: ['Spanish (Native)', 'English (B2)'],
  },
]
```

**Step 2: Create Skills.tsx**
```typescript
'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
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
          className="font-space-grotesk text-3xl font-bold mb-12 gradient-text"
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
              className="p-6 rounded-2xl bg-surface border border-white/5 hover:border-primary/30 transition-all"
            >
              <span className="text-3xl mb-4 block">{cat.icon}</span>
              <h3 className="font-space-grotesk font-semibold text-white mb-4 text-sm">{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span key={skill} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
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
```

**Step 3: Commit**
```bash
git add -A
git commit -m "feat: add Skills section with category cards"
```

---

### Task 9: Projects section

**Files:**
- Create: `components/sections/Projects.tsx`
- Create: `lib/data/projects.ts`

**Step 1: Create lib/data/projects.ts**
```typescript
export const projects = [
  {
    title: 'Data Automation & Reporting Scripts',
    description: {
      es: 'Scripts de automatización en Python con Pandas para procesar archivos Excel y generar reportes de asistencia. Redujo el tiempo de captura manual un 80%.',
      en: 'Python automation scripts using Pandas to process complex Excel files and generate detailed attendance reports. Reduced manual data entry time by 80%.',
    },
    tags: ['Python', 'Pandas', 'Excel', 'Automation'],
    github: '',
    demo: '',
  },
  {
    title: 'Cursomatematicas — Admin Dashboard',
    description: {
      es: 'Dashboard administrativo full-stack con React y Flask. Incluye paginación, filtros dinámicos y CRUD completo para gestión de usuarios.',
      en: 'Full-stack admin dashboard with React and Flask. Features pagination, dynamic search filters, and full CRUD capabilities for user management.',
    },
    tags: ['React', 'Flask', 'CRUD', 'Dashboard'],
    github: '',
    demo: '',
  },
  {
    title: 'Digital Portfolio — Geology Sector',
    description: {
      es: 'Portafolio digital freelance para cliente del sector geológico. Enfocado en navegación intuitiva y presentación profesional del contenido.',
      en: 'Freelance digital portfolio for a geology sector client, focusing on intuitive navigation and professional content presentation.',
    },
    tags: ['UI/UX', 'Web Design', 'Freelance'],
    github: '',
    demo: '',
  },
]
```

**Step 2: Create Projects.tsx**
```typescript
'use client'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '@/lib/data/projects'

export default function Projects() {
  const t = useTranslations('projects')
  const locale = useLocale()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="section-padding bg-surface/30">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-space-grotesk text-3xl font-bold mb-12 gradient-text"
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
              className="p-6 rounded-2xl bg-surface border border-white/5 hover:border-secondary/30 transition-all flex flex-col"
            >
              <h3 className="font-space-grotesk font-bold text-white mb-3">{project.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                {project.description[locale as 'es' | 'en']}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
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
                    className="text-xs px-3 py-1.5 rounded-lg bg-primary/20 hover:bg-primary/30 transition-all text-primary">
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
```

**Step 3: Commit**
```bash
git add -A
git commit -m "feat: add Projects section with bilingual descriptions"
```

---

### Task 10: Experience section (timeline)

**Files:**
- Create: `components/sections/Experience.tsx`

**Step 1: Create Experience.tsx**
```typescript
'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    role: { es: 'Desarrollador Freelance', en: 'Freelance Developer' },
    company: 'Cliente — Sector Geológico',
    period: '2024',
    description: {
      es: 'Diseño y desarrollo de portafolio digital personalizado para cliente del sector geológico.',
      en: 'Design and development of a custom digital portfolio for a geology sector client.',
    },
  },
  {
    role: { es: 'Automatización de Datos', en: 'Data Automation' },
    company: 'Proyecto Personal',
    period: '2023 — 2024',
    description: {
      es: 'Scripts Python con Pandas para automatizar reportes de asistencia, reduciendo el tiempo manual en 80%.',
      en: 'Python scripts with Pandas to automate attendance reports, reducing manual time by 80%.',
    },
  },
]

export default function Experience() {
  const t = useTranslations('experience')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-space-grotesk text-3xl font-bold mb-12 gradient-text"
        >
          {t('title')}
        </motion.h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />
          <div className="space-y-8 pl-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="absolute -left-9 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                <div className="p-6 rounded-xl bg-surface border border-white/5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="font-space-grotesk font-bold text-white">{exp.role.es}</h3>
                    <span className="text-xs text-secondary font-medium">{exp.period}</span>
                  </div>
                  <p className="text-primary text-sm mb-3">{exp.company}</p>
                  <p className="text-slate-400 text-sm">{exp.description.es}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**
```bash
git add -A
git commit -m "feat: add Experience section with vertical timeline"
```

---

## Agent 3 — Contact + Quality

### Task 11: Contact section with EmailJS

**Files:**
- Create: `components/sections/Contact.tsx`
- Create: `.env.local.example`

**Step 1: Create .env.local.example**
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

**Step 2: Create Contact.tsx**
```typescript
'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
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
          className="font-space-grotesk text-3xl font-bold mb-4 gradient-text"
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
                className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-white/5 hover:border-primary/30 transition-all group">
                <span className="text-slate-500 text-sm w-20">{link.label}</span>
                <span className="text-slate-300 group-hover:text-primary transition-colors text-sm">{link.value}</span>
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
            {(['name', 'email'] as const).map(field => (
              <input key={field} name={field} type={field === 'email' ? 'email' : 'text'} required
                placeholder={t(field)}
                className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 focus:border-primary/50 outline-none text-slate-300 placeholder-slate-600 transition-all" />
            ))}
            <textarea name="message" required rows={4} placeholder={t('message')}
              className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 focus:border-primary/50 outline-none text-slate-300 placeholder-slate-600 transition-all resize-none" />
            <button type="submit" disabled={status === 'sending'}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary/80 disabled:opacity-50 font-medium transition-all">
              {status === 'sending' ? t('sending') : t('send')}
            </button>
            {status === 'success' && <p className="text-secondary text-sm text-center">{t('success')}</p>}
            {status === 'error' && <p className="text-red-400 text-sm text-center">{t('error')}</p>}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
```

**Step 3: Commit**
```bash
git add -A
git commit -m "feat: add Contact section with EmailJS form and social links"
```

---

### Task 12: Assemble main page + final checks

**Files:**
- Create: `app/[locale]/page.tsx`
- Create: `.gitignore` (ensure .env.local is excluded)

**Step 1: Create app/[locale]/page.tsx**
```typescript
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Education from '@/components/sections/Education'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  )
}
```

**Step 2: Run typecheck and lint**
```bash
npm run build
```

**Step 3: Final commit**
```bash
git add -A
git commit -m "feat: assemble full portfolio page with all sections"
git push origin main
```

---

### Task 13: Deploy to Vercel

**Step 1:** Install Vercel CLI
```bash
npm install -g vercel
```

**Step 2:** Deploy
```bash
vercel --prod
```

**Step 3:** Add env vars in Vercel dashboard:
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

**Step 4:** Note deploy URL and update README.md

---

## Summary

| Agent | Tasks | Components |
|-------|-------|-----------|
| Agent 1 | 1-7 | Scaffold, i18n, Navbar, Hero, About, Education, Footer |
| Agent 2 | 8-10 | Skills, Projects, Experience |
| Agent 3 | 11-13 | Contact, Assembly, Deploy |
