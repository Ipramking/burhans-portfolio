import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LS, DEFAULT_PROJECTS } from '../../data/defaults';

function thumbUrl(p: { live: string; github: string }) {
  const target = p.live || p.github;
  if (!target) return null;
  return `https://image.thum.io/get/width/1280/crop/720/noanimate/${target}`;
}

function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -12;
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`;
  };
  const handleLeave = () => { if (ref.current) ref.current.style.transform = ''; };

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
         style={{ transition:'transform 0.3s ease', ...style }}>
      {children}
    </div>
  );
}

export default function Projects() {
  const [projects] = useLocalStorage(LS.projects, DEFAULT_PROJECTS);
  const [filter, setFilter] = useState('All');
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin:'-80px' });

  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.tags.includes(filter));

  return (
    <section id="projects" ref={ref} className="section">
      <div className="container">
        <motion.span initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} className="section-label">
          What I've built
        </motion.span>
        <motion.h2 initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.08 }} className="section-title">
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>

        {/* Filter tabs */}
        <motion.div initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.18 }}
          style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', margin:'2rem 0' }}>
          {allTags.map(t => (
            <button key={t} onClick={() => setFilter(t)} className="filter-chip" data-active={filter === t}>{t}</button>
          ))}
        </motion.div>

        <LayoutGroup>
          <motion.div layout style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap:'1.5rem' }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => {
                const thumb = thumbUrl(p);
                return (
                  <motion.div key={p.id} layout
                    initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.9 }}
                    transition={{ duration:0.4, delay: i*0.08 }}>
                    <TiltCard style={{ height:'100%' }}>
                      <div className="glass" style={{
                        overflow:'hidden', display:'flex', flexDirection:'column', height:'100%',
                        transition:'border-color 0.2s, box-shadow 0.2s',
                      }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(129,140,248,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow='0 8px 40px rgba(99,102,241,0.15)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor=''; (e.currentTarget as HTMLElement).style.boxShadow=''; }}>
                        {/* Thumbnail */}
                        <div style={{ aspectRatio:'16/9', position:'relative', overflow:'hidden', background:'var(--surface)' }}>
                          {thumb ? (
                            <>
                              <div style={{ position:'absolute', inset:0, zIndex:1, background:'linear-gradient(90deg,var(--surface) 25%,color-mix(in srgb,var(--accent) 5%,var(--surface)) 50%,var(--surface) 75%)', backgroundSize:'200% 100%', animation:'shimmer 1.6s infinite' }} />
                              <img src={thumb} alt={p.title} loading="lazy"
                                style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0, transition:'opacity 0.4s', zIndex:2 }}
                                onLoad={e => { const el = e.target as HTMLImageElement; el.style.opacity='1'; if (el.previousElementSibling) (el.previousElementSibling as HTMLElement).style.display='none'; }}
                                onError={e => { const el = e.target as HTMLImageElement; el.style.display='none'; if (el.previousElementSibling) (el.previousElementSibling as HTMLElement).style.display='none'; }}
                              />
                            </>
                          ) : (
                            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--border)' }}>
                              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                              </svg>
                            </div>
                          )}
                          {p.featured && (
                            <div style={{ position:'absolute', top:10, right:10, zIndex:3, background:'linear-gradient(135deg,var(--accent-dim),var(--accent2))', color:'white', borderRadius:6, padding:'0.2rem 0.6rem', fontFamily:'JetBrains Mono, monospace', fontSize:'0.65rem', fontWeight:600 }}>
                              Featured
                            </div>
                          )}
                        </div>

                        {/* Body */}
                        <div style={{ padding:'1.25rem', flex:1, display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                          <h3 style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'1.05rem' }}>{p.title}</h3>
                          <p style={{ color:'var(--text-2)', fontSize:'0.88rem', lineHeight:1.65, flex:1 }}>{p.description}</p>
                          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem' }}>
                            {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                          </div>
                          <div style={{ display:'flex', gap:'0.75rem', paddingTop:'0.75rem', borderTop:'1px solid var(--border)', marginTop:'auto' }}>
                            {p.github && (
                              <a href={p.github} target="_blank" rel="noopener noreferrer"
                                style={{ display:'flex', alignItems:'center', gap:'0.35rem', fontFamily:'JetBrains Mono, monospace', fontSize:'0.75rem', color:'var(--muted)', transition:'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.color='var(--accent)')} onMouseLeave={e => (e.currentTarget.style.color='var(--muted)')}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                                Code
                              </a>
                            )}
                            {p.live && (
                              <a href={p.live} target="_blank" rel="noopener noreferrer"
                                style={{ display:'flex', alignItems:'center', gap:'0.35rem', fontFamily:'JetBrains Mono, monospace', fontSize:'0.75rem', color:'var(--muted)', transition:'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.color='var(--accent)')} onMouseLeave={e => (e.currentTarget.style.color='var(--muted)')}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                Live
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
      <style>{`@keyframes shimmer{from{background-position:200% 0}to{background-position:-200% 0}}`}</style>
    </section>
  );
}
