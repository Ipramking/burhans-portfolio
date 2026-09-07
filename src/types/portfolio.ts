export type AccentColor = 'luxury-blue' | 'champagne-gold' | 'royal-emerald' | 'velvet-amethyst' | 'sapphire-cyan' | 'platinum-silver';

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  iconName: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  category: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  highlights: string[];
  type: 'work' | 'education';
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface ProfileData {
  name: string;
  tagline: string;
  titles: string[];
  bio: string;
  aboutText: string[];
  avatarUrl: string;
  location: string;
  availability: string;
  resumeUrl: string;
  email: string;
  socials: SocialLink[];
}

export interface ThemeConfig {
  accent: AccentColor;
  mode: 'dark' | 'light';
  glowEffect: boolean;
}

export interface ContactConfig {
  email: string;
  telegram?: string;
  discord?: string;
  calendlyUrl?: string;
  customMessage?: string;
}

export interface PortfolioState {
  profile: ProfileData;
  projects: Project[];
  experiences: Experience[];
  skillCategories: SkillCategory[];
  theme: ThemeConfig;
  contact: ContactConfig;
  adminPin: string;
}
