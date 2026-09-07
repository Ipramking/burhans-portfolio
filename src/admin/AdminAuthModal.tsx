import React, { useState } from 'react';
import { Lock, KeyRound, X, AlertCircle, HelpCircle, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (pin: string) => boolean;
  onResetPin: (identifier: string, newPin: string) => boolean;
  registeredEmail: string;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onResetPin,
  registeredEmail
}) => {
  const [mode, setMode] = useState<'login' | 'forgot'>('login');
  const [pin, setPin] = useState('');
  const [recoveryInput, setRecoveryInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onSuccess(pin);
    if (!success) {
      setError('Incorrect PIN. Please try again or use "Forgot PIN".');
    } else {
      setError(null);
      setPin('');
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryInput.trim()) {
      setError('Please enter your portfolio email or master recovery code.');
      return;
    }
    if (!newPinInput.trim()) {
      setError('Please enter a new PIN (minimum 4 digits recommended).');
      return;
    }

    const success = onResetPin(recoveryInput, newPinInput);
    if (success) {
      setError(null);
      setResetSuccess(true);
      setTimeout(() => {
        setResetSuccess(false);
        setMode('login');
        setRecoveryInput('');
        setNewPinInput('');
      }, 1500);
    } else {
      setError('Verification failed. Use your portfolio email address or master key (admin123).');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm glass-panel rounded-2xl p-6 border border-slate-700 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X size={18} />
        </button>

        {mode === 'login' ? (
          /* Normal PIN Login View */
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mx-auto flex items-center justify-center mb-3 shadow-inner">
                <Lock size={22} />
              </div>
              <h3 className="text-lg font-bold text-white">Admin CMS Access</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your admin PIN to customize your portfolio.
              </p>
              <div className="mt-2 text-[11px] text-blue-300 font-mono bg-blue-950/60 border border-blue-800/40 rounded-lg py-1 px-2.5 inline-block">
                Default PIN: <span className="font-bold">1234</span>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <KeyRound size={13} />
                  <span>Admin PIN</span>
                </label>
                <input
                  type="password"
                  autoFocus
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="1234"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-center text-lg tracking-widest font-mono focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {error && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-900/30 transition-all active:scale-[0.98]"
              >
                Unlock Admin CMS
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setMode('forgot');
                  }}
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1 mx-auto font-medium transition-colors"
                >
                  <HelpCircle size={13} />
                  <span>Forgot PIN / Password?</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Forgot PIN / Reset View */
          <div>
            <div className="flex items-center gap-2 mb-4">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setMode('login');
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
                title="Back to Login"
              >
                <ArrowLeft size={16} />
              </button>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <ShieldCheck size={18} className="text-amber-400" />
                <span>Reset Admin PIN</span>
              </h3>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Verify your identity by entering your portfolio email or the fallback master recovery key (<code className="font-mono text-amber-300">admin123</code>).
            </p>

            <form onSubmit={handleResetSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Portfolio Email or Master Key
                </label>
                <input
                  type="text"
                  value={recoveryInput}
                  onChange={(e) => {
                    setRecoveryInput(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={registeredEmail || "your-email@example.com"}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Enter New PIN
                </label>
                <input
                  type="password"
                  value={newPinInput}
                  onChange={(e) => {
                    setNewPinInput(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="e.g. 5678"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              {error && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {resetSuccess && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
                  <CheckCircle2 size={14} className="shrink-0" />
                  <span>PIN reset successfully! Unlocking...</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-semibold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-900/30 transition-all mt-2 active:scale-[0.98]"
              >
                Verify & Set New PIN
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
