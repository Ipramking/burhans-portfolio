import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LS, DEFAULT_PROFILE } from '../../data/defaults';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.25,0.46,0.45,0.94] } },
});

export default function About() {
  const [p]   = useLocalStorage(LS.profile, DEFAULT_PROFILE);
  const ref   = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="section">
      <div className="container">
        <motion.span variants={fadeUp(0)} initial="hidden" animate={inView ? 'show' : 'hidden'} className="section-label">
          Who I am
        </motion.span>
        <motion.h2 variants={fadeUp(0.08)} initial="hidden" animate={inView ? 'show' : 'hidden'} className="section-title">
          About <span className="gradient-text">Me</span>
        </motion.h2>

        <div className="about-grid">
          {/* Text */}
          <motion.div variants={fadeUp(0.15)} initial="hidden" animate={inView ? 'show' : 'hidden'} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-2)', lineHeight: 1.8 }}>{p.bio1 || DEFAULT_PROFILE.bio1}</p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-2)', lineHeight: 1.8 }}>{p.bio2 || DEFAULT_PROFILE.bio2}</p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              {[p.h1 || DEFAULT_PROFILE.h1, p.h2 || DEFAULT_PROFILE.h2, p.h3 || DEFAULT_PROFILE.h3].map((h, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp(0.2 + i * 0.08)}
                  initial="hidden" animate={inView ? 'show' : 'hidden'}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}
                >
                  <span style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>→</span>
                  {h}
                </motion.li>
              ))}
            </ul>

            {p.resumeUrl && (
              <motion.div variants={fadeUp(0.45)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <a href={p.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ width: 'fit-content', marginTop: '0.5rem' }}>
                  ↓ Download Resume
                </a>
              </motion.div>
            )}
          </motion.div>

          {/* Photo card */}
          <motion.div
            className="about-photo"
            variants={fadeUp(0.2)}
            initial="hidden" animate={inView ? 'show' : 'hidden'}
            whileHover={{ rotateY: 5, rotateX: -5 }}
            style={{ perspective: 1000 }}
          >
            <div className="glass" style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', borderRadius: 24 }}>
              <img
                src="assets/profile.jpg"
                alt={p.name || 'Profile'}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              {/* Placeholder */}
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem',
                background: 'var(--surface)',
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
                profile.jpg
              </div>

              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(192,132,252,0.1))',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Status badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                bottom: '-16px', right: '-16px',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '0.6rem 1rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--text-2)',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s infinite', flexShrink: 0 }} />
              Available for work
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,0.4)} 50%{box-shadow:0 0 0 6px transparent} }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 4rem;
          align-items: center;
          margin-top: 3rem;
        }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 3rem; margin-top: 2.5rem; }
          .about-photo { max-width: 300px; margin-inline: auto; width: 100%; }
        }
      `}</style>
    </section>
  );
}
