export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '32px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px'
    }}>
      <p style={{ fontFamily: 'Bebas Neue', fontSize: '20px', letterSpacing: '3px' }}>
        CP<span style={{ color: '#E10600' }}>.</span>
      </p>
      <div style={{ display: 'flex', gap: '24px' }}>
        {[
          { label: 'GitHub', href: 'https://github.com/1601chirag' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/chiragpoojari16' },
          { label: 'Email', href: 'mailto:cr.poojary1601@gmail.com' },
        ].map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
            style={{ fontSize: '12px', letterSpacing: '2px', color: '#555', textTransform: 'uppercase', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#E10600'}
            onMouseLeave={e => e.target.style.color = '#555'}
          >
            {l.label}
          </a>
        ))}
      </div>
      <p style={{ fontSize: '12px', color: '#333' }}>© 2025 Chirag Poojari</p>
    </footer>
  )
}