import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Sparkles } from 'lucide-react';
import { PortfolioState } from '../types/portfolio';
import { THEME_PALETTES } from '../utils/theme';

interface SkillsProps {
  data: PortfolioState;
}

export const SkillsSection: React.FC<SkillsProps> = ({ data }) => {
  const colors = THEME_PALETTES[data.theme.accent] || THEME_PALETTES['luxury-blue'];

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={`text-xs font-bold uppercase tracking-wider ${colors.text} mb-2 block`}>
            Core Competencies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & Tech Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.skillCategories.map((category, index) => (
            <motion.div
              key={category.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className={`p-2 rounded-lg bg-slate-900 border border-slate-800 ${colors.primary}`}>
                    <Layers size={18} />
                  </div>
                  <h3 className="font-bold text-base text-white">
                    {category.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:scale-105 transition-all cursor-default flex items-center gap-1.5 shadow-sm"
                    >
                      <Sparkles size={11} className={`${colors.primary} opacity-70`} />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
