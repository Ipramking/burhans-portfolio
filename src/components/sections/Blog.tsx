import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LS, DEFAULT_BLOG } from '../../data/defaults';
import type { BlogPost } from '../../data/types';

function readTime(text: string) { return Math.max(1, Math.round((text||'').split(/\s+/).length / 200)) + ' min read'; }
function fmtDate(iso: string) {
  try { return new Date(iso).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }); }
  catch { return iso; }
}
function renderMd(text: string) {
  return (text||'')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/`(.+?)`/g,'<code>$1</code>')
    .split(/\n\n+/)
    .map(p => `<p>${p.replace(/\n/g,'<br>')}</p>`)
    .join('');
}

function Modal({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  const [readPct, setReadPct] = useState(0);
  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'clamp(0.75rem, 3vw, 1.5rem)' }}
    >
      <motion.div
        initial={{ scale:0.95, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.95, y:20 }}
        transition={{ type:'spring', damping:25, stiffness:300 }}
        className="glass"
        style={{ width:'100%', maxWidth:700, maxHeight:'88dvh', borderRadius:24, overflow:'hidden', display:'flex', flexDirection:'column' }}
      >
        {/* Reading progress */}
        <div style={{ height:2, background:'var(--border)', flexShrink:0 }}>
          <div style={{ height:'100%', width:`${readPct}%`, background:'linear-gradient(90deg,var(--accent-dim),var(--accent2))', transition:'width 0.1s' }} />
        </div>

        <div className="blog-modal-body" style={{ overflow:'auto', flex:1, padding:'2rem 2.5rem 2.5rem' }}
          onScroll={e => {
            const el = e.currentTarget;
            setReadPct(Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100));
          }}>
          <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:'1rem' }}>
            <button onClick={onClose} aria-label="Close post" style={{ background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:'50%', width:40, height:40, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'var(--muted)', transition:'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget.style.color)='#f87171'; (e.currentTarget.style.borderColor)='#f87171'; (e.currentTarget.style.transform)='rotate(90deg)'; }}
              onMouseLeave={e => { (e.currentTarget.style.color)='var(--muted)'; (e.currentTarget.style.borderColor)='var(--border)'; (e.currentTarget.style.transform)=''; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <span className="section-label">Devlog</span>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'clamp(1.5rem,4vw,2rem)', letterSpacing:'-0.04em', margin:'0.5rem 0 1rem', lineHeight:1.2 }}>{post.title}</h2>
          <div style={{ display:'flex', gap:'1rem', alignItems:'center', flexWrap:'wrap', paddingBottom:'1.25rem', borderBottom:'1px solid var(--border)', marginBottom:'1.5rem' }}>
            <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.73rem', color:'var(--muted)' }}>{fmtDate(post.date)}</span>
            <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.7rem', color:'var(--muted)', background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:4, padding:'0.15rem 0.5rem' }}>{readTime(post.content)}</span>
            {post.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
          <div style={{ color:'var(--text-2)', fontSize:'0.95rem', lineHeight:1.8 }} dangerouslySetInnerHTML={{ __html: renderMd(post.content) }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Blog() {
  const [posts]  = useLocalStorage(LS.blog, DEFAULT_BLOG);
  const [active, setActive] = useState<BlogPost | null>(null);
  const [search, setSearch] = useState('');
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  const published = (posts||[]).filter(p => p.published).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const filtered  = search ? published.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) : published;

  return (
    <section id="blog" ref={ref} className="section">
      <div className="container">
        <motion.span initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} className="section-label">Thoughts & updates</motion.span>
        <motion.h2 initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.08 }} className="section-title">
          Dev<span className="gradient-text">log</span>
        </motion.h2>

        {published.length > 3 && (
          <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.15 }} style={{ marginTop:'1.5rem' }}>
            <input type="text" placeholder="Search posts…" value={search} onChange={e => setSearch(e.target.value)}
              style={{ width:'100%', maxWidth:360, padding:'0.65rem 1rem', background:'var(--surface)', border:'1.5px solid var(--border)', borderRadius:10, color:'var(--text)', fontFamily:'JetBrains Mono, monospace', fontSize:'0.85rem', outline:'none', transition:'border-color 0.2s' }}
              onFocus={e => (e.currentTarget.style.borderColor)='var(--accent)'} onBlur={e => (e.currentTarget.style.borderColor)='var(--border)'} />
          </motion.div>
        )}

        {filtered.length === 0 ? (
          <p style={{ color:'var(--muted)', fontFamily:'JetBrains Mono, monospace', fontSize:'0.9rem', marginTop:'3rem', textAlign:'center' }}>
            {search ? 'No posts match your search.' : 'No posts yet — check back soon.'}
          </p>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap:'1.4rem', marginTop:'2rem' }}>
            {filtered.map((p, i) => (
              <motion.article key={p.id}
                initial={{ opacity:0, y:24 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.1 + i*0.08 }}
                whileHover={{ y:-4, borderColor:'rgba(192,132,252,0.4)', boxShadow:'0 8px 32px rgba(168,85,247,0.1)' }}
                onClick={() => setActive(p)}
                className="glass"
                style={{ padding:'1.75rem', cursor:'pointer', display:'flex', flexDirection:'column', gap:'0.9rem', transition:'all 0.2s' }}
              >
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.7rem', color:'var(--muted)' }}>{fmtDate(p.date)}</span>
                  <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.67rem', color:'var(--muted)', background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:4, padding:'0.15rem 0.5rem' }}>{readTime(p.content)}</span>
                </div>
                <h3 style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'1.05rem', letterSpacing:'-0.02em', lineHeight:1.3, transition:'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color)='var(--accent)'} onMouseLeave={e => (e.currentTarget.style.color)=''}>
                  {p.title}
                </h3>
                <p style={{ color:'var(--text-2)', fontSize:'0.86rem', lineHeight:1.65, flex:1, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                  {(p.content||'').replace(/\*\*|__|\*|_|`/g,'').slice(0,160)}…
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem' }}>
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontFamily:'JetBrains Mono, monospace', fontSize:'0.73rem', color:'var(--accent2)', paddingTop:'0.75rem', borderTop:'1px solid var(--border)', marginTop:'auto' }}>
                  Read post
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence>{active && <Modal post={active} onClose={() => setActive(null)} />}</AnimatePresence>
      <style>{`
        @media (max-width: 560px) {
          .blog-modal-body { padding: 1.5rem 1.35rem 1.75rem !important; }
        }
      `}</style>
    </section>
  );
}
