import React, { useState } from 'react';
import { User, FolderGit2, Briefcase, Layers, Palette, Download, X, LogOut } from 'lucide-react';
import { PortfolioState, ProfileData, Project, Experience, SkillCategory, ThemeConfig, ContactConfig } from '../types/portfolio';
import { ProfileEditor } from './tabs/ProfileEditor';
import { ProjectsEditor } from './tabs/ProjectsEditor';
import { ExperienceEditor } from './tabs/ExperienceEditor';
import { SkillsEditor } from './tabs/SkillsEditor';
import { ThemeEditor } from './tabs/ThemeEditor';
import { DataBackup } from './tabs/DataBackup';

interface AdminLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  data: PortfolioState;
  updateProfile: (profile: Partial<ProfileData>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, updated: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  updateSkillCategories: (categories: SkillCategory[]) => void;
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  updateContact: (contact: Partial<ContactConfig>) => void;
  updateAdminPin: (newPin: string) => void;
  resetToDefaults: () => void;
  importData: (json: string) => boolean;
  exportDataJson: () => string;
}

type TabType = 'profile' | 'projects' | 'experience' | 'skills' | 'theme' | 'backup';

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  isOpen,
  onClose,
  onLogout,
  data,
  updateProfile,
  addProject,
  updateProject,
  deleteProject,
  addExperience,
  updateExperience,
  deleteExperience,
  updateSkillCategories,
  updateTheme,
  updateContact,
  updateAdminPin,
  resetToDefaults,
  importData,
  exportDataJson
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  if (!isOpen) return null;

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile & Bio', icon: <User size={16} /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 size={16} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> },
    { id: 'skills', label: 'Skills Stack', icon: <Layers size={16} /> },
    { id: 'theme', label: 'Theme & Contact', icon: <Palette size={16} /> },
    { id: 'backup', label: 'Data Backup', icon: <Download size={16} /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl h-[92vh] glass-panel rounded-2xl border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
              CMS
            </div>
            <div>
              <h2 className="font-bold text-base text-white">Portfolio Admin Suite</h2>
              <span className="text-[11px] text-slate-400">Live customization & content management</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all flex items-center gap-1.5"
              title="Lock & Log out"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Log out</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              title="Close CMS & View Live Portfolio"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation & Content Container */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Tab Sidebar */}
          <div className="w-full md:w-56 bg-slate-950/60 border-b md:border-b-0 md:border-r border-slate-800/80 p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap text-left ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main Tab Panel */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto bg-[#0B1120]/70">
            {activeTab === 'profile' && (
              <ProfileEditor profile={data.profile} onSave={updateProfile} />
            )}
            {activeTab === 'projects' && (
              <ProjectsEditor
                projects={data.projects}
                onAddProject={addProject}
                onUpdateProject={updateProject}
                onDeleteProject={deleteProject}
              />
            )}
            {activeTab === 'experience' && (
              <ExperienceEditor
                experiences={data.experiences}
                onAddExperience={addExperience}
                onUpdateExperience={updateExperience}
                onDeleteExperience={deleteExperience}
              />
            )}
            {activeTab === 'skills' && (
              <SkillsEditor
                categories={data.skillCategories}
                onSave={updateSkillCategories}
              />
            )}
            {activeTab === 'theme' && (
              <ThemeEditor
                theme={data.theme}
                contact={data.contact}
                adminPin={data.adminPin}
                onUpdateTheme={updateTheme}
                onUpdateContact={updateContact}
                onUpdatePin={updateAdminPin}
              />
            )}
            {activeTab === 'backup' && (
              <DataBackup
                onExport={exportDataJson}
                onImport={importData}
                onReset={resetToDefaults}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
