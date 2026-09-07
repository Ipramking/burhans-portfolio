import React, { useState } from 'react';
import { Layers, Plus, Trash2, Check, Sparkles } from 'lucide-react';
import { SkillCategory } from '../../types/portfolio';

interface SkillsEditorProps {
  categories: SkillCategory[];
  onSave: (categories: SkillCategory[]) => void;
}

export const SkillsEditor: React.FC<SkillsEditorProps> = ({ categories, onSave }) => {
  const [data, setData] = useState<SkillCategory[]>(categories);
  const [newCatName, setNewCatName] = useState('');
  const [saved, setSaved] = useState(false);

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    setData([
      ...data,
      {
        id: 'cat_' + Date.now(),
        name: newCatName.trim(),
        skills: ['Example Skill']
      }
    ]);
    setNewCatName('');
  };

  const handleRemoveCategory = (catId: string) => {
    setData(data.filter((c) => c.id !== catId));
  };

  const handleSkillsChange = (catId: string, skillsStr: string) => {
    const skillsArray = skillsStr.split(',').map((s) => s.trim()).filter(Boolean);
    setData(
      data.map((c) => (c.id === catId ? { ...c, skills: skillsArray } : c))
    );
  };

  const handleSave = () => {
    onSave(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers size={20} className="text-indigo-400" />
            <span>Skills & Tech Stack Manager</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Group skills into domains and comma-separate individual badges.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
        >
          {saved ? <Check size={14} className="text-emerald-300" /> : <Sparkles size={14} />}
          <span>{saved ? 'Saved!' : 'Save All Skills'}</span>
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          placeholder="New Category Name (e.g. AI & Machine Learning)"
          className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
        />
        <button
          type="button"
          onClick={handleAddCategory}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1"
        >
          <Plus size={14} /> Add Category
        </button>
      </div>

      <div className="space-y-4">
        {data.map((cat) => (
          <div key={cat.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={cat.name}
                onChange={(e) => {
                  const newName = e.target.value;
                  setData(data.map((c) => (c.id === cat.id ? { ...c, name: newName } : c)));
                }}
                className="font-bold text-sm bg-transparent border-b border-transparent hover:border-slate-700 text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveCategory(cat.id)}
                className="text-slate-500 hover:text-rose-400 p-1"
                title="Remove Category"
              >
                <Trash2 size={13} />
              </button>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Skills (separated by commas)
              </label>
              <textarea
                rows={2}
                value={cat.skills.join(', ')}
                onChange={(e) => handleSkillsChange(cat.id, e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 resize-none font-mono"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
