import React, { useState } from 'react';
import { Download, Upload, RotateCcw, AlertTriangle, Check, Copy } from 'lucide-react';

interface DataBackupProps {
  onExport: () => string;
  onImport: (json: string) => boolean;
  onReset: () => void;
}

export const DataBackup: React.FC<DataBackupProps> = ({ onExport, onImport, onReset }) => {
  const [importText, setImportText] = useState('');
  const [copied, setCopied] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDownload = () => {
    const jsonStr = onExport();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = () => {
    const jsonStr = onExport();
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) return;
    const ok = onImport(importText);
    if (ok) {
      setImportStatus('success');
      setImportText('');
      setTimeout(() => setImportStatus('idle'), 3000);
    } else {
      setImportStatus('error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Download size={20} className="text-indigo-400" />
          <span>Data Backup, Export & Import</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Export your custom portfolio data as JSON or restore an existing backup configuration.
        </p>
      </div>

      {/* Export Section */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h4 className="text-sm font-bold text-white">Export Portfolio Data</h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          Download your complete portfolio configuration (projects, skills, biography, contact channels) as a portable JSON file.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
          >
            <Download size={14} />
            <span>Download JSON File</span>
          </button>
          <button
            type="button"
            onClick={handleCopyJson}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Raw JSON'}</span>
          </button>
        </div>
      </div>

      {/* Import Section */}
      <form onSubmit={handleImportSubmit} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Upload size={16} className="text-indigo-400" />
          <span>Import Portfolio Data</span>
        </h4>
        <p className="text-xs text-slate-400">
          Paste a previously exported JSON backup to instantly restore your data.
        </p>
        <textarea
          rows={4}
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          placeholder="Paste JSON content here..."
          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono resize-none focus:outline-none focus:border-indigo-500"
        />

        {importStatus === 'success' && (
          <div className="text-xs text-emerald-400 flex items-center gap-1">
            <Check size={14} /> Data restored successfully!
          </div>
        )}

        {importStatus === 'error' && (
          <div className="text-xs text-rose-400 flex items-center gap-1">
            <AlertTriangle size={14} /> Invalid JSON structure. Please verify the format.
          </div>
        )}

        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
        >
          <Upload size={14} />
          <span>Import & Apply</span>
        </button>
      </form>

      {/* Factory Reset */}
      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-3">
        <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
          <AlertTriangle size={16} />
          <span>Reset to Defaults</span>
        </h4>
        <p className="text-xs text-slate-400">
          Reset all your portfolio details, projects, and skills back to original starter data. This action clears local storage.
        </p>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you want to reset all portfolio data to starter defaults?')) {
              onReset();
            }
          }}
          className="px-4 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold flex items-center gap-1.5"
        >
          <RotateCcw size={14} />
          <span>Reset All Data</span>
        </button>
      </div>
    </div>
  );
};
