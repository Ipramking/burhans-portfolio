import { AccentColor } from '../types/portfolio';

export interface ThemeColors {
  primary: string;
  bgGlow: string;
  border: string;
  text: string;
  badgeBg: string;
  gradient: string;
  button: string;
  glowClass: string;
}

export const THEME_PALETTES: Record<AccentColor, ThemeColors> = {
  'luxury-blue': {
    primary: 'text-blue-400',
    bgGlow: 'bg-blue-600/15',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    badgeBg: 'bg-blue-950/70 text-blue-300 border-blue-500/30',
    gradient: 'from-blue-600 via-indigo-600 to-sky-400',
    button: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-900/40 border border-blue-400/30',
    glowClass: 'glow-luxury-blue'
  },
  'champagne-gold': {
    primary: 'text-amber-300',
    bgGlow: 'bg-amber-500/15',
    border: 'border-amber-500/30',
    text: 'text-amber-300',
    badgeBg: 'bg-amber-950/60 text-amber-200 border-amber-500/30',
    gradient: 'from-amber-400 via-yellow-500 to-amber-600',
    button: 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold shadow-lg shadow-amber-900/40 border border-amber-300/40',
    glowClass: 'glow-champagne-gold'
  },
  'royal-emerald': {
    primary: 'text-emerald-400',
    bgGlow: 'bg-emerald-600/15',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    badgeBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
    gradient: 'from-emerald-500 via-teal-600 to-emerald-400',
    button: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/40 border border-emerald-400/30',
    glowClass: 'glow-royal-emerald'
  },
  'velvet-amethyst': {
    primary: 'text-purple-400',
    bgGlow: 'bg-purple-600/15',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    badgeBg: 'bg-purple-950/60 text-purple-300 border-purple-500/30',
    gradient: 'from-purple-500 via-violet-600 to-fuchsia-500',
    button: 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white shadow-lg shadow-purple-900/40 border border-purple-400/30',
    glowClass: 'glow-velvet-amethyst'
  },
  'sapphire-cyan': {
    primary: 'text-cyan-400',
    bgGlow: 'bg-cyan-600/15',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    badgeBg: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30',
    gradient: 'from-cyan-400 via-sky-500 to-blue-600',
    button: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-900/40 border border-cyan-400/30',
    glowClass: 'glow-sapphire-cyan'
  },
  'platinum-silver': {
    primary: 'text-slate-200',
    bgGlow: 'bg-slate-500/15',
    border: 'border-slate-400/30',
    text: 'text-slate-200',
    badgeBg: 'bg-slate-900 text-slate-200 border-slate-600/40',
    gradient: 'from-slate-200 via-slate-400 to-zinc-500',
    button: 'bg-gradient-to-r from-slate-200 to-slate-400 hover:from-white hover:to-slate-300 text-slate-950 font-bold shadow-lg shadow-black/50 border border-white/50',
    glowClass: 'glow-platinum-silver'
  }
};
