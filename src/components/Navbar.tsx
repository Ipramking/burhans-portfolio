import React, { useState, useEffect } from 'react';
import { Settings, Menu, X, FileDown } from 'lucide-react';
import { PortfolioState } from '../types/portfolio';
import { THEME_PALETTES } from '../utils/theme';

interface NavbarProps {
  data: PortfolioState;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ data, onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const colors = THEME_PALETTES[data.theme.accent] || THEME_PALETTES['luxury-blue'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090D16]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Logo / Name */}
        <a href="#" className="flex items-center gap-2 group">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm bg-gradient-to-tr ${colors.gradient} text-white shadow-md group-hover:scale-105 transition-transform`}>
            {data.profile.name.charAt(0) || 'P'}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-white group-hover:text-slate-200 transition-colors">
              {data.profile.name}
            </span>
            <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {data.profile.titles[0] || 'Engineer'}
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:absolute after:bottom-0 after:left-0 after:bg-indigo-400 after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {data.profile.resumeUrl && (
            <a
              href={data.profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-white transition-all shadow-sm"
            >
              <FileDown size={14} />
              <span>Resume</span>
            </a>
          )}

          {/* Admin CMS Trigger */}
          <button
            onClick={onOpenAdmin}
            title="Open Admin CMS"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-indigo-300 transition-all group"
          >
            <Settings size={14} className="group-hover:rotate-45 transition-transform duration-300" />
            <span>Admin CMS</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenAdmin}
            title="Open Admin CMS"
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300"
          >
            <Settings size={16} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0F172A] border-b border-slate-800 px-6 py-5 flex flex-col gap-4 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white py-1 border-b border-slate-800/40"
            >
              {link.label}
            </a>
          ))}
          {data.profile.resumeUrl && (
            <a
              href={data.profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-indigo-400 font-semibold pt-2"
            >
              <FileDown size={16} />
              Download Resume
            </a>
          )}
        </div>
      )}
    </header>
  );
};
