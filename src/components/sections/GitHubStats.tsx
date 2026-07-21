import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { lsGet } from '../../hooks/useLocalStorage';
import { LS, DEFAULT_PROFILE } from '../../data/defaults';

interface GHUser { public_repos: number; followers: number; following: number; name: string; bio: string; avatar_url: string; }
interface GHRepo  { id: number; name: string; description: string; stargazers_count: number; forks_count: number; language: string | null; html_url: string; }

export default function GitHubStats() {
  const profile  = lsGet(LS.profile, DEFAULT_PROFILE);
  const username = profile.githubUsername || 'Ipramking';
  const [user,  setUser]  = useState<GHUser | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [error, setError] = useState(false);
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  useEffect(() => {
    if (!inView) return;
    fetch(`https://api.github.com/users/${username}`)
      .then(r => r.json()).then(setUser).catch(() => setError(true));
    fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`)
      .then(r => r.json()).then(d => Array.isArray(d) ? setRepos(d) : setRepos([])).catch(() => {});
  }, [inView, username]);

  if (error) return null;

  const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);

  return (
    <section ref={ref} className="section" style={{ background:'var(--bg-2)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
      <div className="container">
        <motion.span initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} className="section-label">Open source</motion.span>
        <motion.h2 initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.08 }} className="section-title">
          GitHub <span className="gradient-text">Activity</span>
        </motion.h2>

        {/* Stats row */}
        {user && (
          <motion.div initial={{ opacity:0, y:24 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.2 }}
            style={{ display:'flex', gap:'1rem', marginTop:'2.5rem', flexWrap:'wrap' }}>
            {[
              { label:'Public Repos',   value: user.public_repos },
              { label:'Followers',      value: user.followers },
              { label:'Following',      value: user.following },
              { label:'Total Stars',    value: totalStars },
            ].map((s, i) => (
              <motion.div key={s.label} whileHover={{ y:-4, borderColor:'rgba(129,140,248,0.4)', boxShadow:'0 8px 32px rgba(99,102,241,0.12)' }}
                initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.25+i*0.07 }}
                className="glass" style={{ flex:'1', minWidth:120, padding:'1.5rem', textAlign:'center', borderRadius:16, transition:'all 0.2s' }}>
                <p style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'2rem', letterSpacing:'-0.05em', background:'linear-gradient(135deg, var(--accent), var(--accent2))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  {s.value.toLocaleString()}
                </p>
                <p style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.7rem', color:'var(--muted)', marginTop:'0.25rem', textTransform:'uppercase', letterSpacing:'0.1em' }}>{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Contribution graph via github-readme-stats */}
        <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.4 }}
          style={{ marginTop:'1.5rem', borderRadius:16, overflow:'hidden', border:'1px solid var(--border)', background:'var(--surface)' }}>
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&title_color=818cf8&text_color=a0a0c0&hide_border=true&langs_count=8`}
            alt="Top languages"
            style={{ width:'100%', height:'auto', display:'block', padding:'1rem' }}
            onError={e => { (e.target as HTMLImageElement).style.display='none'; }}
          />
        </motion.div>

        {/* Top repos */}
        {repos.length > 0 && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap:'1rem', marginTop:'1.5rem' }}>
            {repos.slice(0,6).map((r, i) => (
              <motion.a key={r.id} href={r.html_url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.3+i*0.07 }}
                whileHover={{ y:-3, borderColor:'rgba(129,140,248,0.4)' }}
                className="glass"
                style={{ padding:'1.25rem', borderRadius:14, display:'flex', flexDirection:'column', gap:'0.6rem', transition:'all 0.2s' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <p style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'0.9rem' }}>{r.name}</p>
                  <div style={{ display:'flex', gap:'0.75rem', flexShrink:0 }}>
                    <span style={{ display:'flex', alignItems:'center', gap:'0.25rem', fontFamily:'JetBrains Mono, monospace', fontSize:'0.7rem', color:'var(--muted)' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--accent2)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      {r.stargazers_count}
                    </span>
                    <span style={{ display:'flex', alignItems:'center', gap:'0.25rem', fontFamily:'JetBrains Mono, monospace', fontSize:'0.7rem', color:'var(--muted)' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4H7z"/><path d="M7 17l-2 4m12-4l2 4m-9-4v4"/></svg>
                      {r.forks_count}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize:'0.8rem', color:'var(--text-2)', lineHeight:1.6, flex:1 }}>{r.description || 'No description'}</p>
                {r.language && <span className="tag" style={{ width:'fit-content' }}>{r.language}</span>}
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
