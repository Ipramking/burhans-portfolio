import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LS, DEFAULT_EXPERIENCE } from '../../data/defaults';

function formatDate(d: string) {
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m)-1] || ''} ${y}`;
}

export default function Experience() {
  const [exp] = useLocalStorage(LS.experience, DEFAULT_EXPERIENCE);
  const ref   = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" ref={ref} className="section">
      <div className="container">
        <motion.span initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ duration:0.5 }} className="section-label">
          My journey
        </motion.span>
        <motion.h2 initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, delay:0.08 }} className="section-title">
          Experience <span className="gradient-text">&</span> Education
        </motion.h2>

        <div className="timeline">
          {/* Timeline spine */}
          <motion.div
            className="timeline-spine"
            initial={{ scaleY:0 }}
            animate={inView ? { scaleY:1 } : {}}
            transition={{ duration:1.2, delay:0.3, ease:[0.25,0.46,0.45,0.94] }}
          />

          {exp.map((e, i) => (
            <motion.div
              key={e.id}
              className="timeline-item"
              initial={{ opacity:0, y:32 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.7, delay:0.2 + i*0.12, ease:[0.25,0.46,0.45,0.94] }}
            >
              <motion.span
                className="timeline-dot"
                initial={{ scale:0 }}
                animate={inView ? { scale:[0,1.25,1] } : {}}
                transition={{ duration:0.5, delay:0.35 + i*0.12 }}
              />
              <div className="glass timeline-card">
                <TimelineCard entry={e} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .timeline { position: relative; margin-top: 3.5rem; }
        .timeline-spine {
          position: absolute; top: 0; bottom: 0; width: 2px;
          left: 50%; transform: translateX(-50%); transform-origin: top;
          background: linear-gradient(to bottom, var(--accent-dim), var(--accent2), transparent);
        }
        .timeline-item {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 2.75rem;
        }
        .timeline-item:last-child { margin-bottom: 0; }
        .timeline-card { padding: 1.5rem; border-radius: 16px; }
        .timeline-item:nth-child(odd)  .timeline-card { grid-column: 1; margin-right: 2.75rem; }
        .timeline-item:nth-child(even) .timeline-card { grid-column: 2; margin-left: 2.75rem; }
        .timeline-dot {
          position: absolute; left: 50%; top: 1.75rem; transform: translateX(-50%);
          width: 16px; height: 16px; border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-dim), var(--accent2));
          box-shadow: 0 0 0 4px var(--bg), 0 0 14px var(--accent-glow);
          z-index: 1;
        }
        @media (max-width: 768px) {
          .timeline-spine { left: 7px; transform: none; }
          .timeline-item { grid-template-columns: 1fr; }
          .timeline-item .timeline-card {
            grid-column: 1 !important;
            margin: 0 0 0 2.25rem !important;
          }
          .timeline-dot { left: 7px; transform: none; top: 1.6rem; }
        }
      `}</style>
    </section>
  );
}

function TimelineCard({ entry }: { entry: ReturnType<typeof useLocalStorage<typeof DEFAULT_EXPERIENCE>>[0][number] }) {
  return (
    <>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.5rem', flexWrap:'wrap', gap:'0.25rem' }}>
        <div>
          <h3 style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'1.05rem', marginBottom:'0.2rem' }}>{entry.role}</h3>
          <p style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.78rem', color:'var(--accent)' }}>
            {entry.company}{entry.location ? ` · ${entry.location}` : ''}
          </p>
        </div>
        <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.7rem', color:'var(--muted)', whiteSpace:'nowrap', marginTop:'0.25rem' }}>
          {entry.current ? `${formatDate(entry.start)} — Present` : `${formatDate(entry.start)} — ${formatDate(entry.end)}`}
        </span>
      </div>
      <p style={{ fontSize:'0.88rem', color:'var(--text-2)', lineHeight:1.7, marginBottom:'0.75rem' }}>{entry.description}</p>
      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
        {entry.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </>
  );
}
