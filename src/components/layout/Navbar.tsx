import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../../store/themeStore';
import { lsGet } from '../../hooks/useLocalStorage';
import { LS, DEFAULT_PROFILE } from '../../data/defaults';

const NAV_LINKS = ['about','skills','experience','projects','building','blog','contact'] as const;

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState('');
  const { theme, toggle }         = useThemeStore();
  const profile                   = lsGet(LS.profile, DEFAULT_PROFILE);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen);
    return () => document.body.classList.remove('nav-open');
  }, [menuOpen]);

  const name = profile.name || 'Dev';

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? '0.6rem 0' : '1.1rem 0',
        paddingTop: `calc(${scrolled ? '0.6rem' : '1.1rem'} + env(safe-area-inset-top))`,
        background: scrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'padding 0.3s ease, background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#hero" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.04em' }}>
          {name.split(' ')[0]}<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        {/* Desktop links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
          {NAV_LINKS.map(l => (
            <a
              key={l}
              href={`#${l}`}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.78rem',
                color: active === l ? 'var(--accent)' : 'var(--text-2)',
                transition: 'color 0.2s',
                position: 'relative',
              }}
            >
              {active === l && (
                <motion.span
                  layoutId="nav-indicator"
                  style={{
                    position: 'absolute', bottom: '-4px', left: 0, right: 0,
                    height: '1.5px', background: 'var(--accent)', borderRadius: 2,
                  }}
                />
              )}
              {l}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Theme toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            style={{
              width: 44, height: 44,
              borderRadius: '50%',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-2)',
              fontSize: '1.05rem',
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀' : '☽'}
          </motion.button>

          {/* Hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              width: 44, height: 44, background: 'var(--surface-2)',
              border: '1px solid var(--border)', borderRadius: '12px',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 5, cursor: 'pointer', zIndex: 101,
            }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {[0,1,2].map(i => (
              <motion.span
                key={i}
                animate={menuOpen ? {
                  rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                  y:      i === 0 ? 7  : i === 2 ? -7  : 0,
                  opacity: i === 1 ? 0 : 1,
                } : { rotate: 0, y: 0, opacity: 1 }}
                style={{ display: 'block', width: 18, height: 1.5, background: 'var(--text)', borderRadius: 2 }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center',
              padding: '5.5rem 2rem calc(2rem + env(safe-area-inset-bottom))',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l}
                  href={`#${l}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ delay: 0.06 + i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    display: 'flex', alignItems: 'baseline', gap: '1rem',
                    padding: '0.75rem 0.25rem',
                    minHeight: 56,
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.9rem',
                    letterSpacing: '-0.03em',
                    textTransform: 'capitalize',
                    color: active === l ? 'var(--accent)' : 'var(--text)',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 400 }}>
                    0{i + 1}
                  </span>
                  {l}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
        .show-mobile { display: flex; }
      `}</style>
    </motion.header>
  );
}
