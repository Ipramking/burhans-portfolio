import React, { useState } from 'react';
import { User, Plus, Trash2, Check, Sparkles } from 'lucide-react';
import { ProfileData, SocialLink } from '../../types/portfolio';

interface ProfileEditorProps {
  profile: ProfileData;
  onSave: (profile: Partial<ProfileData>) => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, onSave }) => {
  const [formData, setFormData] = useState<ProfileData>(profile);
  const [titleInput, setTitleInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddTitle = () => {
    if (!titleInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      titles: [...prev.titles, titleInput.trim()]
    }));
    setTitleInput('');
  };

  const handleRemoveTitle = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      titles: prev.titles.filter((_, i) => i !== index)
    }));
  };

  const handleAddSocial = () => {
    const newSocial: SocialLink = {
      id: Date.now().toString(),
      platform: 'GitHub',
      url: 'https://github.com/',
      iconName: 'github'
    };
    setFormData((prev) => ({
      ...prev,
      socials: [...prev.socials, newSocial]
    }));
  };

  const handleUpdateSocial = (index: number, updated: Partial<SocialLink>) => {
    setFormData((prev) => ({
      ...prev,
      socials: prev.socials.map((s, i) => (i === index ? { ...s, ...updated } : s))
    }));
  };

  const handleRemoveSocial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index)
    }));
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <User size={20} className="text-indigo-400" />
            <span>Profile & Identity</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure your headline, titles, avatar, bio, and social handles.
          </p>
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
        >
          {savedSuccess ? <Check size={14} className="text-emerald-300" /> : <Sparkles size={14} />}
          <span>{savedSuccess ? 'Changes Saved!' : 'Save Profile'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g. San Francisco, CA / Remote"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Availability Status</label>
          <input
            type="text"
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            placeholder="Available for freelance / full-time"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Avatar Image URL</label>
          <input
            type="text"
            value={formData.avatarUrl}
            onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
            placeholder="https://images.unsplash.com/..."
            className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Resume / CV Download URL</label>
          <input
            type="text"
            value={formData.resumeUrl}
            onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
            placeholder="https://example.com/resume.pdf"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Rotating Titles */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
          Rotating Job Titles / Roles (Shown in typewriter headline)
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTitle();
              }
            }}
            placeholder="e.g. Senior Frontend Engineer"
            className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={handleAddTitle}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1"
          >
            <Plus size={14} /> Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.titles.map((title, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-indigo-300 flex items-center gap-2"
            >
              <span>{title}</span>
              <button
                type="button"
                onClick={() => handleRemoveTitle(index)}
                className="text-slate-500 hover:text-rose-400"
              >
                <Trash2 size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Main Tagline & Bio */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Tagline</label>
        <textarea
          rows={2}
          value={formData.tagline}
          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
          className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 resize-none"
        />
      </div>

      {/* Social Links Manager */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold text-slate-300">Social Accounts</label>
          <button
            type="button"
            onClick={handleAddSocial}
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
          >
            <Plus size={13} /> Add Social Link
          </button>
        </div>
        <div className="space-y-2">
          {formData.socials.map((social, index) => (
            <div key={social.id || index} className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
              <input
                type="text"
                value={social.platform}
                onChange={(e) => handleUpdateSocial(index, { platform: e.target.value })}
                placeholder="Platform"
                className="w-28 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
              />
              <input
                type="text"
                value={social.url}
                onChange={(e) => handleUpdateSocial(index, { url: e.target.value })}
                placeholder="https://..."
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
              />
              <button
                type="button"
                onClick={() => handleRemoveSocial(index)}
                className="p-1.5 text-slate-500 hover:text-rose-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
