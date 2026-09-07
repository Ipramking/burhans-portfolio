import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Sparkles, FolderGit2 } from 'lucide-react';
import { PortfolioState } from '../types/portfolio';
import { THEME_PALETTES } from '../utils/theme';

interface ProjectsProps {
  data: PortfolioState;
}

export const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const colors = THEME_PALETTES[data.theme.accent] || THEME_PALETTES['luxury-blue'];

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(data.projects.map((p) => p.category).filter(Boolean)))];

  const filteredProjects = selectedCategory === 'All'
    ? data.projects
    : data.projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider ${colors.text} mb-2 block`}>
              Featured Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Selected Projects
            </h2>
          </div>

          {/* Category Filter Pills */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? `${colors.button} shadow-sm`
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Project Image Preview */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950 border-b border-slate-800/80">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-60" />

                    {project.featured && (
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <Sparkles size={12} />
                        <span>Featured</span>
                      </div>
                    )}

                    {project.category && (
                      <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-slate-300 text-[11px] font-medium px-2.5 py-1 rounded-full">
                        {project.category}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-1.5 flex items-center gap-2">
                      <FolderGit2 size={18} className={colors.primary} />
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mb-3">
                      {project.tagline}
                    </p>
                    <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Link Actions */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-800/40 flex items-center justify-between">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                      <Github size={14} />
                      <span>Source</span>
                    </a>
                  ) : <div />}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 text-xs font-semibold ${colors.text} hover:brightness-125 transition-all`}
                    >
                      <span>Live Preview</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
