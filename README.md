# Portafolio Web — Emiliano Arcos Ramirez

> Personal portfolio website built with Next.js 14, Tailwind CSS, Framer Motion, and next-intl. Bilingual (ES/EN), dark mode by default.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styles | Tailwind CSS |
| Animations | Framer Motion |
| i18n | next-intl (ES / EN) |
| Contact | EmailJS |
| Deploy | Vercel |

---

## 📑 Sections

1. **Hero** — Name, title, profile photo, CTA buttons
2. **About** — Short bio + stats
3. **Skills** — Grid with icons by category (Frontend, Backend, Data, Tools)
4. **Projects** — Cards with stack tags and links
5. **Experience** — Vertical timeline
6. **Education** — UAT card
7. **Contact** — Social links + EmailJS form

---

## 🎨 Design

- **Background:** `#0a0a0f` (deep black)
- **Surface:** `#12121a`
- **Primary accent:** `#7c3aed` (vibrant violet)
- **Secondary accent:** `#06b6d4` (neon cyan)
- **Headings:** Space Grotesk
- **Body:** Inter

---

## 🗂️ Project Structure

```
/
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       └── page.tsx
├── components/
│   ├── sections/       # Hero, About, Skills, Projects, Experience, Education, Contact
│   ├── ui/             # Reusable buttons, badges, cards
│   └── layout/         # Navbar, Footer
├── messages/
│   ├── es.json         # Spanish translations
│   └── en.json         # English translations
└── public/
    └── images/         # Profile photo, project screenshots
```

---

## 🤖 Development Approach

This project uses **3 parallel agents** for efficient development:

- **Agent 1 — UI/Layout:** Navbar, Hero, About, Education, Footer, i18n, dark theme
- **Agent 2 — Dynamic Sections:** Skills, Projects, Experience, Framer Motion animations
- **Agent 3 — Contact + Quality:** EmailJS form, accessibility, TypeScript strict, error review

---

## ⚡ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Live

> Deploy URL will be added after first Vercel deployment.

---

## 👤 About

**Emiliano Arcos Ramirez**
Industrial & Systems Engineering Student — UAT Tampico, Mexico
[LinkedIn](https://linkedin.com/in/emiliano-arcos-ramirez-30bb563b1) · [GitHub](https://github.com/Emiliano2415)
