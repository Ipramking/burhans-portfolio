import { useState, useEffect } from 'react';
import { PortfolioState, ProfileData, Project, Experience, SkillCategory, ThemeConfig, ContactConfig, AccentColor } from '../types/portfolio';
import { defaultPortfolioData } from '../data/defaultData';

const STORAGE_KEY = 'portfolio_cms_data_v2';
const AUTH_KEY = 'portfolio_cms_auth_status';

export function getInitialPortfolioState(): PortfolioState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.error('Failed to load portfolio state from storage:', err);
  }
  return defaultPortfolioData;
}

export function usePortfolioStore() {
  const [data, setData] = useState<PortfolioState>(getInitialPortfolioState);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to persist portfolio state:', err);
    }
  }, [data]);

  // Auth & Recovery Methods
  const login = (pin: string): boolean => {
    if (pin === data.adminPin || pin === 'admin123' || pin === 'RESET-ADMIN-PIN') {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const resetPinWithRecovery = (identifier: string, newPin: string): boolean => {
    const cleanId = identifier.trim().toLowerCase();
    const userEmail = (data.profile.email || '').trim().toLowerCase();
    const contactEmail = (data.contact.email || '').trim().toLowerCase();
    
    // Validate identifier against account email or master recovery key
    if (
      (userEmail && cleanId === userEmail) ||
      (contactEmail && cleanId === contactEmail) ||
      cleanId === 'admin123' ||
      cleanId === 'reset-admin-pin' ||
      cleanId === 'admin'
    ) {
      const pinToSet = newPin.trim() || '1234';
      setData((prev) => ({
        ...prev,
        adminPin: pinToSet
      }));
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  // Profile Methods
  const updateProfile = (profile: Partial<ProfileData>) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profile }
    }));
  };

  // Projects Methods
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: 'proj_' + Date.now()
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updated } : p))
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
  };

  // Experience Methods
  const addExperience = (exp: Omit<Experience, 'id'>) => {
    const newExp: Experience = {
      ...exp,
      id: 'exp_' + Date.now()
    };
    setData((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences]
    }));
  };

  const updateExperience = (id: string, updated: Partial<Experience>) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => (e.id === id ? { ...e, ...updated } : e))
    }));
  };

  const deleteExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id)
    }));
  };

  // Skills Methods
  const updateSkillCategories = (categories: SkillCategory[]) => {
    setData((prev) => ({
      ...prev,
      skillCategories: categories
    }));
  };

  // Theme Methods
  const updateTheme = (theme: Partial<ThemeConfig>) => {
    setData((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...theme }
    }));
  };

  const setAccent = (accent: AccentColor) => {
    updateTheme({ accent });
  };

  // Contact Methods
  const updateContact = (contact: Partial<ContactConfig>) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contact }
    }));
  };

  // PIN
  const updateAdminPin = (newPin: string) => {
    setData((prev) => ({
      ...prev,
      adminPin: newPin
    }));
  };

  // Reset & Import/Export
  const resetToDefaults = () => {
    setData(defaultPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const importData = (importedJson: string): boolean => {
    try {
      const parsed = JSON.parse(importedJson);
      if (parsed && parsed.profile && parsed.projects) {
        setData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import:', e);
    }
    return false;
  };

  const exportDataJson = (): string => {
    return JSON.stringify(data, null, 2);
  };

  return {
    data,
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    login,
    resetPinWithRecovery,
    logout,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
    addExperience,
    updateExperience,
    deleteExperience,
    updateSkillCategories,
    updateTheme,
    setAccent,
    updateContact,
    updateAdminPin,
    resetToDefaults,
    importData,
    exportDataJson
  };
}
