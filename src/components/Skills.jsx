import { motion } from 'framer-motion'

const skillGroups = [
  { label: 'Languages', items: ['Python', 'C', 'C++', 'SQL', 'Swift'] },
  { label: 'AI / ML', items: ['LangChain', 'LLM Integration', 'RAG Pipelines', 'SentenceTransformers', 'Ollama', 'Prompt Engineering'] },
  { label: 'Databases', items: ['MySQL', 'PostgreSQL', 'ChromaDB'] },
  { label: 'Tools', items: ['FastAPI', 'pytest', 'Docker', 'GitHub Actions', 'Git', 'Streamlit', 'REST APIs'] },
  { label: 'Web', items: ['HTML', 'CSS', 'React'] },
  { label: 'Practices', items: ['Test Automation', 'Agile', 'API Design', 'CI/CD', 'Version Control'] },
]

export default function Skills() {
  return (
    <section id="skills" className="section">
      <p className="section-label">Capabilities</p>
      <div className="red-line" />
      <h2 className="section-title">SKILLS</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px' }}>
        {skillGroups.map((g, i) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            style={{
              background: '#111',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '28px 32px',
            }}
          >
            <p style={{
              fontFamily: 'Bebas Neue', fontSize: '20px', letterSpacing: '4px',
              color: '#E10600', marginBottom: '20px', textTransform: 'uppercase'
            }}>{g.label}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {g.items.map(item => (
                <span key={item} style={{
                  padding: '6px 14px', fontSize: '13px', fontWeight: 500,
                  background: 'rgba(255,255,255,0.04)', color: '#ccc',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>{item}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}