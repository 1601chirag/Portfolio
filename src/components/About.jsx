import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="section">
      <p className="section-label">About</p>
      <div className="red-line" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title" style={{ marginBottom: '24px' }}>WHO<br/>I AM</h2>
          <p style={{ color: '#999', lineHeight: 1.9, marginBottom: '16px' }}>
            Third-year Computer Science student at MIT World Peace University, Pune.
            I build AI-powered pipelines, RAG systems, and backend APIs — all local-first, zero cloud dependency.
          </p>
          <p style={{ color: '#999', lineHeight: 1.9 }}>
            Currently completing my tenure at <span style={{ color: '#fff' }}>Infosys Mysore Development Centre</span>.
            I've been on a merit scholarship since 2023 and love shipping things that actually work end-to-end.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}
        >
          {[
            { label: 'University', value: 'MIT World Peace University' },
            { label: 'Degree', value: 'B.Tech CSE · 2023–2027' },
            { label: 'CGPA', value: '8.95 / 10' },
            { label: 'Location', value: 'Pune, India' },
            { label: 'Email', value: 'cr.poojary1601@gmail.com' },
            { label: 'GitHub', value: 'github.com/1601chirag' },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
              <span style={{ fontSize: '12px', letterSpacing: '2px', color: '#555', textTransform: 'uppercase' }}>{item.label}</span>
              <span style={{ fontSize: '14px', color: '#e1e1e1', fontWeight: 500 }}>{item.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}