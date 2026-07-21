import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LS, DEFAULT_TESTIMONIALS } from '../../data/defaults';

export default function Testimonials() {
  const [items] = useLocalStorage(LS.testimonials, DEFAULT_TESTIMONIALS);
  const ref     = useRef<HTMLElement>(null);
  const inView  = useInView(ref, { once:true, margin:'-80px' });
  if (!items.length) return null;

  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <section ref={ref} className="section" style={{ background:'var(--bg-2)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', overflow:'hidden' }}>
      <div className="container">
        <motion.span initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} className="section-label">Kind words</motion.span>
        <motion.h2 initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.08 }} className="section-title">
          What people <span className="gradient-text">say</span>
        </motion.h2>
      </div>

      {/* Marquee */}
      <div style={{ position:'relative', marginTop:'2.5rem', overflow:'hidden' }}>
        {/* Fade edges */}
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'clamp(40px, 12vw, 120px)', background:'linear-gradient(to right, var(--bg-2), transparent)', zIndex:2, pointerEvents:'none' }} />
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'clamp(40px, 12vw, 120px)', background:'linear-gradient(to left, var(--bg-2), transparent)', zIndex:2, pointerEvents:'none' }} />

        <motion.div
          animate={{ x: [0, -(items.length * 380)] }}
          transition={{ duration: items.length * 6, repeat: Infinity, ease: 'linear' }}
          style={{ display:'flex', gap:'1.25rem', paddingInline:'1.5rem', width:'max-content' }}
        >
          {doubled.map((t, i) => (
            <div key={i} className="glass"
              style={{ width:360, flexShrink:0, padding:'1.75rem', borderRadius:20 }}>
              {/* Stars */}
              <div style={{ display:'flex', gap:'0.2rem', marginBottom:'1rem' }}>
                {Array(5).fill(0).map((_,j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent2)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <p style={{ color:'var(--text-2)', fontSize:'0.9rem', lineHeight:1.75, marginBottom:'1.25rem', fontStyle:'italic' }}>
                "{t.text}"
              </p>
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} style={{ width:40, height:40, borderRadius:'50%', objectFit:'cover', border:'2px solid var(--border)' }} />
                ) : (
                  <div style={{ width:40, height:40, borderRadius:'50%', background:'linear-gradient(135deg, var(--accent-dim), var(--accent2))', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'0.9rem', flexShrink:0 }}>
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'0.9rem', marginBottom:'0.1rem' }}>{t.name}</p>
                  <p style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.7rem', color:'var(--muted)' }}>{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
