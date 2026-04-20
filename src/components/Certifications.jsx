import { motion } from 'framer-motion'

const certs = [
  { title: 'Design Thinking', issuer: 'Infosys Springboard', date: 'Oct 2025' },
  { title: 'Fundamentals of Digital Marketing', issuer: 'Google Skillshop', date: 'Sept 2024' },
]

export default function Certifications() {
  return (
    <section id="contact" className="section">
      <p className="section-label">Credentials</p>
      <div className="red-line" />
      <h2 className="section-title">CERTIFICATIONS</h2>
      <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
        {certs.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: '#111',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '28px 36px',
              flex: '1 1 300px',
              borderLeft: '3px solid #E10600'
            }}
          >
            <p style={{ fontFamily: 'Bebas Neue', fontSize: '1.3rem', letterSpacing: '1px', marginBottom: '8px' }}>{c.title}</p>
            <p style={{ fontSize: '13px', color: '#666' }}>{c.issuer}</p>
            <p style={{ fontSize: '12px', color: '#E10600', marginTop: '8px', letterSpacing: '2px' }}>{c.date}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          marginTop: '100px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '80px',
          textAlign: 'center'
        }}
      >
        <p style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 0.9, marginBottom: '32px' }}>
          LET'S BUILD<br/><span style={{ color: '#E10600' }}>SOMETHING</span>
        </p>
        <a href="mailto:cr.poojary1601@gmail.com" className="btn-red" style={{ fontSize: '16px', padding: '16px 40px' }}>
          Get in Touch
        </a>
      </motion.div>
    </section>
  )
}