import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import trackData from './silverstone.json'

const DRIVERS = [
  { label: 'PY',  name: 'Python',         color: '#3b8ede', offset: 0.00 },
  { label: 'LC',  name: 'LangChain',       color: '#00c896', offset: 0.08 },
  { label: 'FA',  name: 'FastAPI',         color: '#05a882', offset: 0.16 },
  { label: 'DK',  name: 'Docker',          color: '#2496ed', offset: 0.24 },
  { label: 'CB',  name: 'ChromaDB',        color: '#9b59b6', offset: 0.32 },
  { label: 'MS',  name: 'Mistral',         color: '#e67e22', offset: 0.40 },
  { label: 'PT',  name: 'pytest',          color: '#f1c40f', offset: 0.48 },
  { label: 'GA',  name: 'GitHub Actions',  color: '#e10600', offset: 0.56 },
  { label: 'ST',  name: 'SentenceTransf.', color: '#1abc9c', offset: 0.64 },
  { label: 'PL',  name: 'Plotly',          color: '#ff6b6b', offset: 0.72 },
  { label: 'SQ',  name: 'SQL',             color: '#f39c12', offset: 0.80 },
  { label: 'SW',  name: 'Swift',           color: '#ff6a00', offset: 0.88 },
]

// AUTO-FIT REAL TRACK DATA (FastF1)
const CANVAS_W = 460
const CANVAS_H = 520
const PADDING = 30

const SILVERSTONE = (() => {
  const xs = trackData.map(p => p[0])
  const ys = trackData.map(p => p[1])

  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  const scaleX = (CANVAS_W - 2 * PADDING) / (maxX - minX)
  const scaleY = (CANVAS_H - 2 * PADDING) / (maxY - minY)

  const scale = Math.min(scaleX, scaleY)

  return trackData.map(([x, y]) => [
    ((x - minX) * scale + PADDING) / CANVAS_W,
    ((y - minY) * scale + PADDING) / CANVAS_H
  ])
})()

function lerp(a, b, t) { return a + (b - a) * t }

function getPointOnTrack(path, t) {
  const total = path.length
  const scaled = ((t % 1) + 1) % 1 * total
  const i = Math.floor(scaled)
  const frac = scaled - i
  const a = path[i % total]
  const b = path[(i + 1) % total]
  return [lerp(a[0], b[0], frac), lerp(a[1], b[1], frac)]
}

function TrackCanvas() {
  const canvasRef = useRef(null)
  const stateRef = useRef(
    DRIVERS.map(d => ({ ...d, t: d.offset, speed: 0.0005 + Math.random() * 0.0006 }))
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const DPR = window.devicePixelRatio || 1
    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width = W * DPR
    canvas.height = H * DPR
    ctx.scale(DPR, DPR)

    const px = (x) => x * W
    const py = (y) => y * H

    function drawTrack() {
      ctx.beginPath()
      ctx.moveTo(px(SILVERSTONE[0][0]), py(SILVERSTONE[0][1]))
      for (let i = 1; i < SILVERSTONE.length - 1; i++) {
        const [x1, y1] = SILVERSTONE[i]
        const [x2, y2] = SILVERSTONE[i + 1]
        const mx = (x1 + x2) / 2
        const my = (y1 + y2) / 2
        ctx.quadraticCurveTo(px(x1), py(y1), px(mx), py(my))
      }
      ctx.closePath()
      ctx.strokeStyle = 'rgba(225,6,0,0.15)'
      ctx.lineWidth = 20
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(px(SILVERSTONE[0][0]), py(SILVERSTONE[0][1]))
      for (let i = 1; i < SILVERSTONE.length - 1; i++) {
        const [x1, y1] = SILVERSTONE[i]
        const [x2, y2] = SILVERSTONE[i + 1]
        const mx = (x1 + x2) / 2
        const my = (y1 + y2) / 2
        ctx.quadraticCurveTo(px(x1), py(y1), px(mx), py(my))
      }
      ctx.closePath()
      ctx.strokeStyle = 'rgba(255,255,255,0.08)'
      ctx.lineWidth = 12
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(px(SILVERSTONE[0][0]), py(SILVERSTONE[0][1]))
      for (let i = 1; i < SILVERSTONE.length - 1; i++) {
        const [x1, y1] = SILVERSTONE[i]
        const [x2, y2] = SILVERSTONE[i + 1]
        const mx = (x1 + x2) / 2
        const my = (y1 + y2) / 2
        ctx.quadraticCurveTo(px(x1), py(y1), px(mx), py(my))
      }
      ctx.closePath()
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'
      ctx.lineWidth = 3
      ctx.stroke()

      const [sx, sy] = [px(SILVERSTONE[0][0]), py(SILVERSTONE[0][1])]
      ctx.beginPath()
      ctx.moveTo(sx - 12, sy - 6)
      ctx.lineTo(sx + 12, sy + 6)
      ctx.strokeStyle = '#E10600'
      ctx.lineWidth = 3
      ctx.stroke()
    }

    function drawDrivers() {
      const drivers = stateRef.current
      const sorted = [...drivers].sort((a, b) => b.t - a.t)
      const posMap = {}
      sorted.forEach((d, i) => { posMap[d.label] = i + 1 })

      drivers.forEach(d => {
        d.t += d.speed
        const [fx, fy] = getPointOnTrack(SILVERSTONE, d.t)
        const nx = px(fx), ny = py(fy)

        for (let i = 1; i <= 8; i++) {
          const [tx, ty] = getPointOnTrack(SILVERSTONE, d.t - i * 0.008)
          const alpha = (1 - i / 9) * 0.4
          ctx.beginPath()
          ctx.arc(px(tx), py(ty), 4 - i * 0.35, 0, Math.PI * 2)
          ctx.fillStyle = d.color + Math.round(alpha * 255).toString(16).padStart(2, '0')
          ctx.fill()
        }

        const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, 18)
        grd.addColorStop(0, d.color + '66')
        grd.addColorStop(1, d.color + '00')
        ctx.beginPath()
        ctx.arc(nx, ny, 18, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        ctx.beginPath()
        ctx.arc(nx, ny, 7, 0, Math.PI * 2)
        ctx.fillStyle = d.color
        ctx.fill()
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 2
        ctx.stroke()

        const pos = posMap[d.label]
        const tag = `P${pos} ${d.label}`
        ctx.font = 'bold 11px "DM Sans", sans-serif'
        const tagW = ctx.measureText(tag).width + 18
        const tagH = 20
        const tx2 = nx + 16
        const ty2 = ny - 12

        ctx.fillStyle = d.color
        ctx.beginPath()
        ctx.roundRect(tx2, ty2 - tagH / 2, tagW, tagH, 3)
        ctx.fill()

        ctx.fillStyle = '#fff'
        ctx.fillText(tag, tx2 + 8, ty2 + 4)

        ctx.beginPath()
        ctx.moveTo(nx + 7, ny)
        ctx.lineTo(tx2, ty2)
        ctx.strokeStyle = d.color + '99'
        ctx.lineWidth = 1
        ctx.stroke()
      })
    }

    function frame() {
      ctx.clearRect(0, 0, W, H)
      drawTrack()
      drawDrivers()
      animId = requestAnimationFrame(frame)
    }

    frame()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 0.9 }}
      style={{ position: 'relative', flexShrink: 0 }}
    >
      <div style={{
        position: 'absolute', top: -14, left: 20, zIndex: 2,
        background: '#0a0a0a', border: '1px solid rgba(225,6,0,0.35)',
        padding: '5px 18px',
        fontFamily: 'Bebas Neue, sans-serif', fontSize: '11px',
        letterSpacing: '4px', color: '#E10600', display: 'flex', gap: 10, alignItems: 'center'
      }}>
        <div style={{ 
          width: 6, height: 6, borderRadius: '50%', 
          background: '#E10600', 
          boxShadow: '0 0 8px #E10600',
          animation: 'tp 1.2s ease-in-out infinite' 
        }} />
        SILVERSTONE · LIVE TRACKING
      </div>

      <div style={{
        width: '460px', height: '520px',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(6,3,3,0.92)',
        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
        position: 'relative', overflow: 'hidden'
      }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

        {[
          { top: 12, left: 12, borderTop: '1px solid #E10600', borderLeft: '1px solid #E10600' },
          { bottom: 12, right: 12, borderBottom: '1px solid #E10600', borderRight: '1px solid #E10600' },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 20, height: 20, ...s }} />
        ))}

        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.05) 3px,rgba(0,0,0,0.05) 4px)'
        }} />

        <div style={{
          position: 'absolute', bottom: 16, left: 18,
          fontFamily: 'Bebas Neue, sans-serif', fontSize: '10px',
          letterSpacing: '4px', color: 'rgba(255,255,255,0.12)'
        }}>SILVERSTONE CIRCUIT</div>
      </div>

      <div style={{
        marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 7, maxWidth: 460
      }}>
        {DRIVERS.map(d => (
          <div key={d.label} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '4px 12px', 
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 2
          }}>
            <div style={{ 
              width: 7, height: 7, borderRadius: '50%', 
              background: d.color,
              boxShadow: `0 0 4px ${d.color}80`
            }} />
            <span style={{ 
              fontFamily: 'DM Sans, sans-serif', 
              fontSize: '11px', 
              color: '#777', 
              letterSpacing: '0.3px',
              fontWeight: 500
            }}>{d.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes tp { 
          0%, 100% { opacity: 1; transform: scale(1); } 
          50% { opacity: 0.3; transform: scale(0.85); } 
        }
      `}</style>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', padding: '0 24px'
    }}>
      <div style={{
        position: 'absolute', top: 0, right: '38%', width: '1px',
        height: '100%', background: 'rgba(225,6,0,0.05)'
      }} />

      <div style={{
        maxWidth: '1150px', margin: '0 auto', width: '100%', paddingTop: '80px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '48px'
      }}>
        <div style={{ flex: 1 }}>
          <motion.p
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '14px', letterSpacing: '5px', color: '#E10600', marginBottom: '16px' }}
          >
            Software Engineer · AI/ML · Backend
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(4rem, 9vw, 8.5rem)', lineHeight: 0.9, letterSpacing: '2px', marginBottom: '32px' }}
          >
            CHIRAG<br /><span style={{ color: '#E10600' }}>POOJARI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            style={{ maxWidth: '440px', color: '#d3d3d3', fontSize: '15px', lineHeight: 1.8, marginBottom: '40px' }}
          >
            B.Tech CSE student at MIT-WPU Pune (CGPA 8.95) building AI-powered tools,
            backend systems, and automation pipelines. Passionate about LLMs, RAG, and shipping things that work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
          >
            <a href="#projects" className="btn-red">View Projects</a>
            <a href="https://github.com/1601chirag" target="_blank" rel="noreferrer" className="btn-outline">GitHub ↗</a>
            <a href="mailto:cr.poojary1601@gmail.com" className="btn-outline">Contact</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            style={{
              display: 'flex', gap: '40px', marginTop: '60px',
              borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '32px', flexWrap: 'wrap'
            }}
          >
            {[
              { value: '8.95', label: 'CGPA' },
              { value: '3+', label: 'AI Projects' },
              { value: '25%', label: 'Merit Scholarship' },
              { value: '2027', label: 'Graduating' },
            ].map(s => (
              <div key={s.label}>
                <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.2rem', color: '#E10600', lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: '10px', letterSpacing: '3px', color: '#d3d3d3', marginTop: '4px' }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <TrackCanvas />
      </div>
    </section>
  )
}