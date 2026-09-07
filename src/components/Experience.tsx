import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { PortfolioState } from '../types/portfolio';
import { THEME_PALETTES } from '../utils/theme';

interface ExperienceProps {
  data: PortfolioState;
}

export const ExperienceSection: React.FC<ExperienceProps> = ({ data }) => {
  const colors = THEME_PALETTES[data.theme.accent] || THEME_PALETTES['luxury-blue'];

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={`text-xs font-bold uppercase tracking-wider ${colors.text} mb-2 block`}>
            Career & Growth
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience & Education
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-32 space-y-10">
          {data.experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative pl-6 sm:pl-8 group"
            >
              {/* Timeline Icon Node */}
              <div className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center ${colors.primary} shadow-md group-hover:scale-110 transition-transform`}>
                {exp.type === 'education' ? <GraduationCap size={16} /> : <Briefcase size={16} />}
              </div>

              {/* Date Bubble (Desktop Left aligned) */}
              <div className="sm:absolute sm:-left-36 sm:top-2 sm:text-right sm:w-28 text-xs font-mono font-semibold text-slate-400 mb-2 sm:mb-0 flex items-center sm:justify-end gap-1">
                <Calendar size={13} className="sm:hidden" />
                <span>{exp.period}</span>
              </div>

              {/* Card Container */}
              <div className="glass-panel rounded-2xl p-6 transition-all hover:border-slate-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {exp.role}
                  </h3>
                  <span className={`text-sm font-semibold ${colors.text}`}>
                    {exp.company}
                  </span>
                </div>

                {exp.location && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                    <MapPin size={12} />
                    <span>{exp.location}</span>
                  </div>
                )}

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Bullet Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.bgGlow} bg-indigo-400 mt-1.5 shrink-0`} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
