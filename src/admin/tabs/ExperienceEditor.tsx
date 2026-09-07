import React, { useState } from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { Experience } from '../../types/portfolio';

interface ExperienceEditorProps {
  experiences: Experience[];
  onAddExperience: (exp: Omit<Experience, 'id'>) => void;
  onUpdateExperience: (id: string, updated: Partial<Experience>) => void;
  onDeleteExperience: (id: string) => void;
}

export const ExperienceEditor: React.FC<ExperienceEditorProps> = ({
  experiences,
  onAddExperience,
  onUpdateExperience,
  onDeleteExperience
}) => {
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newExp, setNewExp] = useState({
    role: '',
    company: '',
    location: '',
    period: '2024 — Present',
    description: '',
    highlights: '',
    type: 'work' as 'work' | 'education'
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.role.trim() || !newExp.company.trim()) return;

    onAddExperience({
      role: newExp.role,
      company: newExp.company,
      location: newExp.location || undefined,
      period: newExp.period,
      description: newExp.description,
      highlights: newExp.highlights.split('\n').map((h) => h.trim()).filter(Boolean),
      type: newExp.type
    });

    setNewExp({
      role: '',
      company: '',
      location: '',
      period: '',
      description: '',
      highlights: '',
      type: 'work'
    });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Briefcase size={20} className="text-indigo-400" />
            <span>Experience & Education</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your timeline milestones and career history.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
        >
          <Plus size={14} />
          <span>{showAdd ? 'Cancel' : 'Add Item'}</span>
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreate} className="glass-panel p-5 rounded-2xl border border-indigo-500/30 space-y-3">
          <h4 className="text-sm font-bold text-indigo-300">Add Timeline Milestone</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Degree</label>
              <input
                type="text"
                required
                value={newExp.role}
                onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                placeholder="Senior Engineer / B.S. Computer Science"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company / University</label>
              <input
                type="text"
                required
                value={newExp.company}
                onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                placeholder="Acme Corp / Tech University"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Period</label>
              <input
                type="text"
                value={newExp.period}
                onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                placeholder="2023 — Present"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
              <select
                value={newExp.type}
                onChange={(e) => setNewExp({ ...newExp, type: e.target.value as 'work' | 'education' })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
              >
                <option value="work">Work Experience</option>
                <option value="education">Education / Certification</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
              <input
                type="text"
                value={newExp.description}
                onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                placeholder="Summary of responsibilities..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Key Achievements / Highlights (One per line)</label>
              <textarea
                rows={3}
                value={newExp.highlights}
                onChange={(e) => setNewExp({ ...newExp, highlights: e.target.value })}
                placeholder="• Boosted page load performance by 40%&#10;• Led migration to modern microservices"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 resize-none"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
            >
              Add Timeline Item
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {experiences.map((exp) => (
          <div key={exp.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
                    {exp.type}
                  </span>
                  <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                  <span className="text-xs text-slate-400">@ {exp.company}</span>
                </div>
                <p className="text-xs font-mono text-slate-400 mb-1">{exp.period}</p>
                <p className="text-xs text-slate-300">{exp.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setEditingId(editingId === exp.id ? null : exp.id)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                >
                  {editingId === exp.id ? 'Close' : 'Edit'}
                </button>
                <button
                  onClick={() => onDeleteExperience(exp.id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 text-xs"
                  title="Delete Item"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {editingId === exp.id && (
              <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Role</label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => onUpdateExperience(exp.id, { role: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => onUpdateExperience(exp.id, { company: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
