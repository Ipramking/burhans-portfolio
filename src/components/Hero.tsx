import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles, Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { PortfolioState } from '../types/portfolio';
import { THEME_PALETTES } from '../utils/theme';

interface HeroProps {
  data: PortfolioState;
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const colors = THEME_PALETTES[data.theme.accent] || THEME_PALETTES['luxury-blue'];
  const titles = data.profile.titles.length > 0 ? data.profile.titles : ['Software Engineer'];

  useEffect(() => {
    if (titles.length <= 1) return;
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles]);

  const renderSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <Github size={18} />;
      case 'linkedin':
        return <Linkedin size={18} />;
      case 'twitter':
      case 'x':
        return <Twitter size={18} />;
      default:
        return <Mail size={18} />;
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Decorative Radial Gradient */}
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none opacity-20 bg-gradient-to-tr ${colors.gradient}`} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
        {/* Availability Badge */}
        {data.profile.availability && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-900/90 border border-slate-700/80 text-slate-300 mb-8 backdrop-blur-sm shadow-inner"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
            <span>{data.profile.availability}</span>
          </motion.div>
        )}

        {/* Profile Avatar (Optional) */}
        {data.profile.avatarUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 relative inline-block"
          >
            <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-gradient-to-br ${colors.gradient} shadow-xl shadow-black/50`}>
              <img
                src={data.profile.avatarUrl}
                alt={data.profile.name}
                className="w-full h-full object-cover rounded-[22px] bg-slate-900"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-slate-700 p-2 rounded-xl text-amber-400 shadow-md">
              <Sparkles size={16} />
            </div>
          </motion.div>
        )}

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight mb-4"
        >
          Hi, I'm{' '}
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${colors.gradient}`}>
            {data.profile.name}
          </span>
        </motion.h1>

        {/* Dynamic Rotating Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-10 sm:h-12 flex items-center justify-center mb-6 font-mono text-lg sm:text-2xl font-semibold text-slate-300"
        >
          <span>I am a&nbsp;</span>
          <motion.span
            key={titleIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={colors.text}
          >
            {titles[titleIndex]}
          </motion.span>
        </motion.div>

        {/* Bio / Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          {data.profile.tagline || data.profile.bio}
        </motion.p>

        {/* Location & Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10 text-xs sm:text-sm text-slate-400"
        >
          {data.profile.location && (
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <MapPin size={14} className={colors.primary} />
              <span>{data.profile.location}</span>
            </div>
          )}

          {data.profile.socials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-slate-900/60 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all shadow-sm group"
            >
              {renderSocialIcon(social.iconName || social.platform)}
              <span>{social.platform}</span>
              <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg ${colors.button} transition-all hover:scale-[1.02] active:scale-[0.98]`}
          >
            <span>Explore Projects</span>
            <ArrowRight size={16} />
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 text-slate-200 hover:text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Get in Touch</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
