export default function Footer() {
  return (
    <footer
      className="py-10 px-6"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.9rem', color: '#e8e8f0', letterSpacing: '-0.02em' }}
          >
            EA
          </span>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', color: 'rgba(167,139,250,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            .dev
          </span>
        </div>

        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: 'rgba(232,232,240,0.2)' }}>
          © {new Date().getFullYear()} Emiliano Arcos Ramirez
        </p>

        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', color: 'rgba(232,232,240,0.15)', letterSpacing: '0.05em' }}>
          Built with Next.js · Deployed on Vercel
        </p>
      </div>
    </footer>
  )
}
