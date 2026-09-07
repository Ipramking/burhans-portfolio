import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Cpu, Compass, Layers, CheckCircle } from 'lucide-react';
import { PortfolioState } from '../types/portfolio';
import { THEME_PALETTES } from '../utils/theme';

interface AboutProps {
  data: PortfolioState;
}

export const About: React.FC<AboutProps> = ({ data }) => {
  const colors = THEME_PALETTES[data.theme.accent] || THEME_PALETTES['luxury-blue'];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={`text-xs font-bold uppercase tracking-wider ${colors.text} mb-2 block`}>
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Background & Philosophy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Story Bento Item */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${colors.primary}`}>
                  <Terminal size={22} />
                </div>
                <h3 className="text-xl font-bold text-white">Engineering with Intent</h3>
              </div>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {data.profile.aboutText.length > 0 ? (
                  data.profile.aboutText.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>{data.profile.bio}</p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-emerald-400" /> Scalable Architecture
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-emerald-400" /> Fast Execution
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-emerald-400" /> Pixel-Perfect Polish
              </span>
            </div>
          </motion.div>

          {/* Quick Metrics / Focus Stack Bento Item */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${colors.primary}`}>
                  <Cpu size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">Focus Areas</h3>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-200 mb-1">
                    <Code2 size={16} className={colors.primary} />
                    <span>Modern Web Apps</span>
                  </div>
                  <p className="text-xs text-slate-400">Full-stack React, TypeScript, and high-performance serverless endpoints.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-200 mb-1">
                    <Layers size={16} className={colors.primary} />
                    <span>Systems Architecture</span>
                  </div>
                  <p className="text-xs text-slate-400">Event-driven infrastructure, caching, and robust database modeling.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="flex items-center gap-2 font-semibold text-sm text-slate-200 mb-1">
                    <Compass size={16} className={colors.primary} />
                    <span>Developer Experience</span>
                  </div>
                  <p className="text-xs text-slate-400">Clear documentation, CI/CD automation, and rigorous testing suites.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
