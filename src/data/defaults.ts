import type {
  Profile, SkillGroup, Project, ExperienceEntry,
  BuildingItem, BlogPost, Testimonial, SocialLink, EmailJSConfig
} from './types';

export const DEFAULT_PROFILE: Profile = {
  name: 'Burhan',
  role: 'Full-Stack Developer',
  tagline: 'I build things for the web — clean, fast, and purposeful.',
  bio1: "I'm a passionate developer creating modern digital experiences and scalable web systems.",
  bio2: 'I care deeply about clean architecture, performance, and shipping things that actually work.',
  h1: 'Computer Science Graduate',
  h2: 'Full-Stack Engineer',
  h3: 'Open to opportunities',
  email: 'burhan@example.com',
  githubUsername: 'burhan',
  resumeUrl: '',
};

export const DEFAULT_SKILLS: SkillGroup[] = [
  {
    category: 'Languages',
    items: [
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
      { name: 'Python',     icon: 'devicon-python-plain colored' },
      { name: 'HTML5',      icon: 'devicon-html5-plain colored' },
      { name: 'CSS3',       icon: 'devicon-css3-plain colored' },
    ],
  },
  {
    category: 'Frameworks',
    items: [
      { name: 'React',   icon: 'devicon-react-original colored' },
      { name: 'Next.js', icon: 'devicon-nextjs-plain' },
      { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
      { name: 'Express', icon: 'devicon-express-original' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git',        icon: 'devicon-git-plain colored' },
      { name: 'Docker',     icon: 'devicon-docker-plain colored' },
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
      { name: 'VS Code',    icon: 'devicon-vscode-plain colored' },
    ],
  },
];

export const DEFAULT_EXPERIENCE: ExperienceEntry[] = [
  {
    id: 1,
    role: 'Frontend Developer',
    company: 'Your Company',
    location: 'Lagos, Nigeria',
    start: '2024-01',
    end: '',
    current: true,
    description: 'Describe what you did, what you built, the impact you had. Keep it punchy — 2 to 3 sentences.',
    tags: ['React', 'TypeScript', 'Node.js'],
  },
  {
    id: 2,
    role: 'Junior Developer',
    company: 'Previous Company',
    location: 'Remote',
    start: '2023-01',
    end: '2023-12',
    current: false,
    description: 'Another role description. Replace with your actual experience.',
    tags: ['JavaScript', 'CSS', 'HTML'],
  },
];

export const DEFAULT_PROJECTS: Project[] = [
  { id: 1, title: 'Project One',   description: 'A short description of what this project does and the problem it solves.',   tags: ['React', 'Node.js', 'PostgreSQL'], github: 'https://github.com', live: 'https://example.com', featured: true  },
  { id: 2, title: 'Project Two',   description: 'Another project. Highlight what makes it interesting.',                       tags: ['TypeScript', 'Tailwind', 'Go'],    github: 'https://github.com', live: '',                featured: true  },
  { id: 3, title: 'Project Three', description: 'Third project.',                                                               tags: ['Next.js', 'GraphQL', 'Supabase'],  github: 'https://github.com', live: '',                featured: false },
];

export const DEFAULT_BUILDING: BuildingItem = {
  show: true,
  title: 'Portfolio v2',
  description: 'Rebuilding my personal portfolio with React, TypeScript, Framer Motion and a fully custom admin panel.',
  status: 'In Progress',
  tags: ['React', 'TypeScript', 'Framer Motion'],
  link: 'https://github.com',
};

export const DEFAULT_BLOG: BlogPost[] = [];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Jane Smith',    role: 'Senior Engineer',  company: 'TechCorp',   text: 'One of the most dedicated developers I have worked with. Ships clean, well-structured code every time.',        avatar: '' },
  { id: 2, name: 'Mark Johnson',  role: 'Product Manager',  company: 'StartupXYZ', text: 'An incredible eye for detail and always finds elegant solutions to complex problems. Highly recommended.',       avatar: '' },
  { id: 3, name: 'Aisha Okafor',  role: 'Lead Developer',   company: 'DevAgency',  text: 'Fast learner, great communicator, and produces production-quality work. Would love to collaborate again.',       avatar: '' },
];

export const DEFAULT_SOCIALS: SocialLink[] = [
  { name: 'GitHub',      url: 'https://github.com' },
  { name: 'LinkedIn',    url: 'https://linkedin.com' },
  { name: 'Twitter / X', url: 'https://twitter.com' },
];

export const DEFAULT_EMAILJS: EmailJSConfig = {
  serviceId: '',
  templateId: '',
  publicKey: '',
};

export const DEFAULT_ADMIN_HASH = '9881928f60e14fcbd7a28d2166ee4e8ba456daa9df696159dcae35050762895b'; // portfolio2026

export const LS = {
  profile:     'pf_profile',
  skills:      'pf_skills',
  experience:  'pf_experience',
  projects:    'pf_projects',
  building:    'pf_building',
  blog:        'pf_blog',
  testimonials:'pf_testimonials',
  socials:     'pf_socials',
  emailjs:     'pf_emailjs',
  hash:        'pf_adm_hash',
  session:     'pf_adm_session',
  theme:       'pf_theme',
} as const;

export const SOCIAL_ICONS: Record<string, string> = {
  github:   `<svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  twitter:  `<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  default:  `<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,
};

export function getSocialIcon(name: string): string {
  const key = name.toLowerCase().replace(/[\s/]+/g, '');
  for (const [k, svg] of Object.entries(SOCIAL_ICONS)) {
    if (key.includes(k)) return svg;
  }
  return SOCIAL_ICONS.default;
}
