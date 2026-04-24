import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const projects = [
  {
    num: '04',
    title: 'AI-Based Test Automation Framework',
    desc: 'LangChain + Mistral LLM test case generator with pytest, GitHub Actions CI/CD, and HTML reports. Fully offline via Ollama — zero API cost.',
    tags: ['Python', 'LangChain', 'Mistral', 'pytest', 'Docker'],
    github: 'https://github.com/1601chirag/ai-test-framework',
  },
  {
    num: '03',
    title: 'RAG-Based Study Assistant',
    desc: 'PDF/TXT ingestion pipeline with SentenceTransformers + ChromaDB + FastAPI. Answers document queries using a local Mistral LLM — no cloud, no API costs.',
    tags: ['Python', 'RAG', 'ChromaDB', 'FastAPI', 'Ollama'],
    github: 'https://github.com/1601chirag/rag-study-assistant',
  },
  {
    num: '02',
    title: 'Security Intelligence Platform',
    desc: 'AI-powered CVE vulnerability manager pulling NIST NVD data. LangChain triage agent maps findings to OWASP Top 10 and generates remediation steps.',
    tags: ['FastAPI', 'LangChain', 'ChromaDB', 'Docker', 'Plotly'],
    github: 'https://github.com/1601chirag/security-intelligence-platform',
  },

    {
    num: '01',
    title: 'Multi-Model AI Orchestrator with Cost & Latency Optimization',
    desc: 'Multi-model AI routing system with real-time cost optimization, latency-aware decisions, and streaming support.',
    tags: ['FastAPI', 'React', 'Redis', 'Docker', 'Pydantic',],
    github: 'https://github.com/1601chirag/ai-orchestrator',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section">
      <p className="section-label">Work</p>
      <div className="red-line" />
      <h2 className="section-title">PROJECTS</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {projects.map((p, i) => (
          <motion.div
            key={p.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{
              background: '#111',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '36px',
              display: 'grid',
              gridTemplateColumns: '80px 1fr auto',
              gap: '32px',
              alignItems: 'start',
              transition: 'border-color 0.2s, background 0.2s',
              cursor: 'default'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(225,6,0,0.4)'
              e.currentTarget.style.background = '#141414'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.background = '#111'
            }}
          >
            <span style={{ fontFamily: 'Bebas Neue', fontSize: '4rem', color: 'rgba(241, 12, 4, 0.8)', lineHeight: 1 }}>
              {p.num}
            </span>
            <div>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.6rem', letterSpacing: '1px', marginBottom: '12px' }}>
                {p.title}
              </h3>
              <p style={{ color: '#777', fontSize: '14px', lineHeight: 1.8, marginBottom: '20px' }}>{p.desc}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <a href={p.github} target="_blank" rel="noreferrer"
              style={{ color: '#f8f8f8', fontSize: '20px', marginTop: '4px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#E10600'}
              onMouseLeave={e => e.target.style.color = '#f8f8f8'}
            >
              <FiGithub />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}