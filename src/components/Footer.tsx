import React from 'react';
import { Settings } from 'lucide-react';
import { PortfolioState } from '../types/portfolio';

interface FooterProps {
  data: PortfolioState;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ data, onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 bg-[#060911] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>&copy; {currentYear} {data.profile.name}. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-400 transition-colors"
          >
            <Settings size={14} />
            <span>Edit via Admin CMS</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
