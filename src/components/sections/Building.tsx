import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LS, DEFAULT_BUILDING } from '../../data/defaults';

const STATUSES: Record<string, string> = {
  'In Progress':   'var(--accent)',
  'Shipping Soon': 'var(--accent2)',
  'Planning':      '#facc15',
  'On Hold':       'var(--muted)',
  'Shipped ✓':     '#4ade80',
};

export default function Building() {
  const [d]    = useLocalStorage(LS.building, DEFAULT_BUILDING);
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  if (!d || d.show === false) return null;

  const statusColor = STATUSES[d.status] || 'var(--accent)';

  return (
    <section id="building" ref={ref} className="section" style={{ background:'var(--bg-2)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
      <div className="container">
        <motion.span initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} className="section-label">
          What I'm working on
        </motion.span>
        <motion.h2 initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.08 }} className="section-title">
          Currently <span className="gradient-text">Building</span>
        </motion.h2>

        <motion.div
          initial={{ opacity:0, y:32 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.2, duration:0.7 }}
          className="glass building-card"
          style={{
            marginTop:'2.5rem',
            padding:'2.5rem',
            display:'grid',
            gridTemplateColumns:'1fr auto',
            gap:'2rem',
            alignItems:'center',
            position:'relative',
            overflow:'hidden',
          }}
        >
          {/* Glow */}
          <div style={{ position:'absolute', top:'-30%', right:'-10%', width:'50%', height:'200%', background:`radial-gradient(ellipse, color-mix(in srgb, ${statusColor} 8%, transparent), transparent)`, pointerEvents:'none' }} />

          <div style={{ display:'flex', flexDirection:'column', gap:'1.1rem', position:'relative', zIndex:1 }}>
            {/* Live badge */}
            <motion.div
              animate={{ opacity:[0.7,1,0.7] }} transition={{ duration:2, repeat:Infinity }}
              style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', padding:'0.3rem 0.8rem', background:`color-mix(in srgb, ${statusColor} 10%, transparent)`, border:`1px solid color-mix(in srgb, ${statusColor} 25%, transparent)`, borderRadius:20, width:'fit-content', fontFamily:'JetBrains Mono, monospace', fontSize:'0.7rem', color:statusColor, letterSpacing:'0.1em', textTransform:'uppercase' }}
            >
              <span style={{ width:6, height:6, borderRadius:'50%', background:statusColor, animation:'livePulse 1.6s ease-in-out infinite' }} />
              Active build
            </motion.div>

            <h3 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'clamp(1.4rem, 3vw, 2.2rem)', letterSpacing:'-0.04em', lineHeight:1.1 }}>{d.title}</h3>
            <p style={{ color:'var(--text-2)', fontSize:'0.95rem', lineHeight:1.75, maxWidth:520 }}>{d.description}</p>

            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
              {d.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>

            {d.link && (
              <motion.a href={d.link} target="_blank" rel="noopener noreferrer" whileHover={{ x:4 }}
                style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', fontFamily:'JetBrains Mono, monospace', fontSize:'0.8rem', color:'var(--accent)', width:'fit-content' }}>
                View repo
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </motion.a>
            )}
          </div>

          {/* Status card */}
          <motion.div
            whileHover={{ scale:1.02 }}
            style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:'1.5rem 2rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.6rem', minWidth:160, textAlign:'center', position:'relative', zIndex:1 }}
          >
            <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.65rem', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.1em' }}>Status</span>
            <span style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'0.95rem', color:statusColor, padding:'0.4rem 0.9rem', background:`color-mix(in srgb, ${statusColor} 10%, transparent)`, border:`1px solid color-mix(in srgb, ${statusColor} 20%, transparent)`, borderRadius:8, whiteSpace:'nowrap' }}>
              {d.status}
            </span>
          </motion.div>
        </motion.div>
      </div>
      <style>{`
        @keyframes livePulse{0%,100%{box-shadow:0 0 0 0 color-mix(in srgb,var(--accent) 60%,transparent)}50%{box-shadow:0 0 0 6px transparent}}
        @media (max-width: 700px) {
          .building-card {
            grid-template-columns: 1fr !important;
            padding: 1.75rem !important;
            gap: 1.5rem !important;
          }
          .building-card > div:last-child { align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
