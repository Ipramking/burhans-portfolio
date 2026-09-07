import React, { useState } from 'react';
import { Palette, Mail, Shield, Check, Sparkles } from 'lucide-react';
import { ThemeConfig, ContactConfig, AccentColor } from '../../types/portfolio';

interface ThemeEditorProps {
  theme: ThemeConfig;
  contact: ContactConfig;
  adminPin: string;
  onUpdateTheme: (theme: Partial<ThemeConfig>) => void;
  onUpdateContact: (contact: Partial<ContactConfig>) => void;
  onUpdatePin: (pin: string) => void;
}

const ACCENT_OPTIONS: { id: AccentColor; label: string; colorClass: string }[] = [
  { id: 'luxury-blue', label: 'Luxury Sapphire Blue', colorClass: 'bg-blue-600' },
  { id: 'champagne-gold', label: 'Champagne Royal Gold', colorClass: 'bg-amber-400' },
  { id: 'royal-emerald', label: 'Imperial Emerald', colorClass: 'bg-emerald-500' },
  { id: 'velvet-amethyst', label: 'Velvet Amethyst', colorClass: 'bg-purple-500' },
  { id: 'sapphire-cyan', label: 'Arctic Sapphire Cyan', colorClass: 'bg-cyan-400' },
  { id: 'platinum-silver', label: 'Platinum Obsidian', colorClass: 'bg-slate-300' }
];

export const ThemeEditor: React.FC<ThemeEditorProps> = ({
  theme,
  contact,
  adminPin,
  onUpdateTheme,
  onUpdateContact,
  onUpdatePin
}) => {
  const [contactData, setContactData] = useState<ContactConfig>(contact);
  const [pin, setPin] = useState(adminPin);
  const [saved, setSaved] = useState(false);

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContact(contactData);
    if (pin.trim()) {
      onUpdatePin(pin.trim());
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Palette size={20} className="text-indigo-400" />
            <span>Theme & Contact Configuration</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Customize primary accent vibes, contact channels, and admin protection PIN.
          </p>
        </div>
      </div>

      {/* Color Accent Picker */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2">
          Color Accent Theme
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ACCENT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onUpdateTheme({ accent: opt.id })}
              className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold transition-all ${
                theme.accent === opt.id
                  ? 'border-white bg-slate-800/90 text-white shadow-md'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`w-4 h-4 rounded-full ${opt.colorClass} shadow-sm`} />
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Channels Form */}
      <form onSubmit={handleSaveContact} className="space-y-4 pt-4 border-t border-slate-800">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Mail size={16} className="text-indigo-400" />
          <span>Contact Channels</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Email</label>
            <input
              type="email"
              value={contactData.email}
              onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Telegram Handle</label>
            <input
              type="text"
              value={contactData.telegram || ''}
              onChange={(e) => setContactData({ ...contactData, telegram: e.target.value })}
              placeholder="@yourhandle"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Calendly Booking Link (Optional)</label>
            <input
              type="text"
              value={contactData.calendlyUrl || ''}
              onChange={(e) => setContactData({ ...contactData, calendlyUrl: e.target.value })}
              placeholder="https://calendly.com/your-username/30min"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
            />
          </div>
        </div>

        {/* Security / Admin PIN */}
        <div className="pt-4 border-t border-slate-800">
          <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
            <Shield size={16} className="text-indigo-400" />
            <span>Admin Security PIN</span>
          </h4>
          <div className="w-full sm:w-1/2">
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="1234"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono tracking-wider"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Default is 1234. Change this to secure your Admin CMS.
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
        >
          {saved ? <Check size={14} className="text-emerald-300" /> : <Sparkles size={14} />}
          <span>{saved ? 'Saved Successfully!' : 'Save Settings'}</span>
        </button>
      </form>
    </div>
  );
};
