import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Check, Copy, MessageSquare, Calendar, Sparkles } from 'lucide-react';
import { PortfolioState } from '../types/portfolio';
import { THEME_PALETTES } from '../utils/theme';

interface ContactProps {
  data: PortfolioState;
}

export const Contact: React.FC<ContactProps> = ({ data }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const colors = THEME_PALETTES[data.theme.accent] || THEME_PALETTES['luxury-blue'];

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    
    // Simulate sending message or opening mailto
    const mailtoLink = `mailto:${data.contact.email || data.profile.email}?subject=Project inquiry from ${formData.name}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`;
    window.location.href = mailtoLink;
    
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const contactEmail = data.contact.email || data.profile.email;

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={`text-xs font-bold uppercase tracking-wider ${colors.text} mb-2 block`}>
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Collaborate
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {data.contact.customMessage || "Have a project in mind or interested in working together? Drop me a message!"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Direct Quick Channels (Left 2 cols) */}
          <div className="md:col-span-2 space-y-4">
            {/* Email Card */}
            {contactEmail && (
              <div className="glass-panel rounded-2xl p-5 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                    <Mail size={14} className={colors.primary} /> Direct Email
                  </span>
                  <button
                    onClick={() => handleCopy(contactEmail, 'email')}
                    className="text-xs text-slate-400 hover:text-white p-1 rounded-md bg-slate-900 border border-slate-800"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-mono text-sm text-slate-200 hover:text-white font-medium break-all"
                >
                  {contactEmail}
                </a>
              </div>
            )}

            {/* Telegram Card */}
            {data.contact.telegram && (
              <div className="glass-panel rounded-2xl p-5 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                    <MessageSquare size={14} className={colors.primary} /> Telegram
                  </span>
                  <button
                    onClick={() => handleCopy(data.contact.telegram || '', 'tg')}
                    className="text-xs text-slate-400 hover:text-white p-1 rounded-md bg-slate-900 border border-slate-800"
                    title="Copy Telegram Handle"
                  >
                    {copiedField === 'tg' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="font-mono text-sm text-slate-200">
                  {data.contact.telegram}
                </p>
              </div>
            )}

            {/* Calendly Booking Card */}
            {data.contact.calendlyUrl && (
              <a
                href={data.contact.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800 flex items-center justify-between block group"
              >
                <div>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-1">
                    <Calendar size={14} className="text-amber-400" /> Schedule Meeting
                  </span>
                  <p className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                    Book a 1-on-1 Call
                  </p>
                </div>
                <Sparkles size={18} className="text-amber-400" />
              </a>
            )}
          </div>

          {/* Interactive Contact Form (Right 3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 glass-panel rounded-2xl p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, timeline, and goals..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 ${colors.button} shadow-lg transition-all active:scale-[0.98]`}
              >
                {isSent ? (
                  <>
                    <Check size={16} />
                    <span>Opening Mail Client...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
