import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['About', 'Projects', 'Skills', 'Contact']

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '16px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(225,6,0,0.2)' : '1px solid transparent',
        transition: 'all 0.3s ease'
      }}
    >
      <a href="#hero" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', letterSpacing: '3px', color: '#f5f5f5' }}>
        CP<span style={{ color: '#E10600' }}>.</span>
      </a>
      <div style={{ display: 'flex', gap: '36px' }}>
    {links.map(l => (
    <a
        key={l}
        href={`#${l.toLowerCase()}`}
        style={{
            fontSize: '13px',
            letterSpacing: '2px',
            color: '#888',
            textTransform: 'uppercase',
            fontWeight: 500,
            transition: 'color 0.2s'
        }}
        onMouseEnter={e => e.target.style.color = '#E10600'}
        onMouseLeave={e => e.target.style.color = '#888'}
    >
        {l}
    </a>
    ))}
      </div>
    </motion.nav>
  )
}