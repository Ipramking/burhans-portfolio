import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LS, DEFAULT_SKILLS } from '../../data/defaults';

export default function Skills() {
  const [skills]    = useLocalStorage(LS.skills, DEFAULT_SKILLS);
  const [active, setActive] = useState('All');
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const categories = ['All', ...skills.map(g => g.category)];
  const filtered = active === 'All'
    ? skills.flatMap(g => g.items)
    : skills.find(g => g.category === active)?.items ?? [];

  return (
    <section id="skills" ref={ref} className="section" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <motion.span initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ duration:0.6 }} className="section-label">
          What I work with
        </motion.span>
        <motion.h2 initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, delay:0.08 }} className="section-title">
          Tech <span className="gradient-text">Stack</span>
        </motion.h2>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.5, delay:0.18 }}
          style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', margin:'2rem 0' }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="filter-chip"
              data-active={active === cat}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div layout style={{ display:'flex', flexWrap:'wrap', gap:'0.75rem' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => (
              <motion.div
                key={s.name}
                layout
                initial={{ opacity:0, scale:0.8 }}
                animate={{ opacity:1, scale:1 }}
                exit={{ opacity:0, scale:0.8 }}
                transition={{ duration:0.3, delay: i * 0.04 }}
                whileHover={{ y: -4, borderColor: 'var(--accent)', boxShadow: '0 0 20px var(--accent-glow)' }}
                style={{
                  display:'flex', alignItems:'center', gap:'0.6rem',
                  padding:'0.5rem 1.1rem',
                  background:'var(--surface)',
                  border:'1px solid var(--border)',
                  borderRadius:10,
                  fontFamily:'JetBrains Mono, monospace',
                  fontSize:'0.82rem',
                  color:'var(--text-2)',
                  cursor:'default',
                  transition:'border-color 0.2s, box-shadow 0.2s, color 0.2s',
                }}
              >
                <i className={s.icon} style={{ fontSize:'1.2rem' }} />
                {s.name}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
