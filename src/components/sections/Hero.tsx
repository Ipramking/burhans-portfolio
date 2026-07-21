import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LS, DEFAULT_PROFILE } from '../../data/defaults';

const ROLES = ['Full-Stack Developer', 'Problem Solver', 'Creative Builder', 'Open Source Fan'];

function Typewriter({ primaryRole }: { primaryRole: string }) {
  const roles = [primaryRole, ...ROLES.filter(r => r !== primaryRole)];
  const [text, setText] = useState('');
  const [ri, setRi]     = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[ri];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), 80);
      } else {
        timer = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), 40);
      } else {
        setDeleting(false);
        setRi(r => (r + 1) % roles.length);
      }
    }
    return () => clearTimeout(timer);
  }, [text, deleting, ri]);

  return (
    <span>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        style={{ color: 'var(--accent)', marginLeft: 1 }}
      >|</motion.span>
    </span>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25,0.46,0.45,0.94] } },
};

export default function Hero() {
  const [profile] = useLocalStorage(LS.profile, DEFAULT_PROFILE);

  return (
    <section id="hero" style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: 'calc(80px + env(safe-area-inset-top))' }}>

      {/* Aurora orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-20%', left: '-10%',
            width: '70vw', height: '70vw', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          style={{
            position: 'absolute', bottom: '-20%', right: '-10%',
            width: '60vw', height: '60vw', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute', top: '40%', left: '50%',
            width: '40vw', height: '40vw', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,114,182,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
          opacity: 0.3,
        }} />
      </div>

      {/* Content */}
      <motion.div
        variants={container} initial="hidden" animate="show"
        style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 780, padding: '0 1.5rem' }}
      >
        <motion.p variants={item} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Hi, I'm
        </motion.p>

        <motion.h1
          variants={item}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.75rem, 12vw, 7rem)',
            letterSpacing: '-0.05em',
            lineHeight: 0.95,
            marginBottom: '1.25rem',
            overflowWrap: 'break-word',
          }}
        >
          <span className="gradient-text">{profile.name || 'Your Name'}</span>
        </motion.h1>

        <motion.p
          variants={item}
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)', color: 'var(--text-2)', marginBottom: '1.25rem', minHeight: '2em' }}
        >
          <span style={{ color: 'var(--muted)' }}>&lt; </span>
          <Typewriter primaryRole={profile.role || DEFAULT_PROFILE.role} />
          <span style={{ color: 'var(--muted)' }}> /&gt;</span>
        </motion.p>

        <motion.p
          variants={item}
          style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--text-2)', maxWidth: 540, margin: '0 auto 2.5rem', lineHeight: 1.8 }}
        >
          {profile.tagline || DEFAULT_PROFILE.tagline}
        </motion.p>

        <motion.div variants={item} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <MagneticBtn href="#projects" className="btn btn-primary">View Projects</MagneticBtn>
          <MagneticBtn href="#contact" className="btn btn-outline">Get in touch</MagneticBtn>
          {profile.resumeUrl && (
            <MagneticBtn href={profile.resumeUrl} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              ↓ Resume
            </MagneticBtn>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)' }}
      >
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--muted), transparent)' }}
        />
      </motion.div>
    </section>
  );
}

function MagneticBtn({ href, children, className, target, rel }: { href: string; children: React.ReactNode; className: string; target?: string; rel?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 14;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <a ref={ref} href={href} className={className} target={target} rel={rel}
       onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
       style={{ transition: 'transform 0.3s ease, box-shadow 0.2s, border-color 0.2s' }}>
      {children}
    </a>
  );
}
