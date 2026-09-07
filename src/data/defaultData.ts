import { PortfolioState } from '../types/portfolio';

export const defaultPortfolioData: PortfolioState = {
  profile: {
    name: "Alex Rivera",
    tagline: "Building resilient distributed systems and next-generation web applications.",
    titles: [
      "Full-Stack Engineer",
      "Cloud Architect",
      "UI/UX Craftsperson",
      "Open Source Contributor"
    ],
    bio: "Passionate engineer dedicated to crafting performant, accessible, and elegant software solutions from concept to cloud deployment.",
    aboutText: [
      "I specialize in architecting scalable backend APIs, responsive modern web frontends, and reliable cloud infrastructure.",
      "With a strong foundation in modern JavaScript/TypeScript, React, Rust, and distributed computing, I love turning complex engineering challenges into delightful user experiences.",
      "When I'm not shipping code, I mentor emerging developers, write technical breakdowns, and explore generative AI workflows."
    ],
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    location: "San Francisco, CA / Remote",
    availability: "Available for new projects & full-time roles",
    resumeUrl: "https://example.com/resume.pdf",
    email: "alex.rivera@example.com",
    socials: [
      { id: "1", platform: "GitHub", url: "https://github.com", iconName: "github" },
      { id: "2", platform: "LinkedIn", url: "https://linkedin.com", iconName: "linkedin" },
      { id: "3", platform: "Twitter / X", url: "https://x.com", iconName: "twitter" },
      { id: "4", platform: "Email", url: "mailto:alex.rivera@example.com", iconName: "mail" }
    ]
  },
  projects: [
    {
      id: "p1",
      title: "PulseFlow Analytics",
      tagline: "Real-time edge metrics and streaming telemetry dashboard",
      description: "High-throughput stream processing platform capable of ingesting 100k+ events/sec with sub-second visual analytics and anomaly detection.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Go", "ClickHouse", "WebSockets"],
      category: "Full Stack",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      demoUrl: "https://example.com/demo1",
      githubUrl: "https://github.com/example/pulseflow",
      featured: true
    },
    {
      id: "p2",
      title: "OmniVault Identity",
      tagline: "Zero-knowledge decentralized authentication protocol",
      description: "Cryptographic credential wallet with passkey biometrics, fine-grained access policies, and encrypted multi-device state synchronization.",
      tags: ["TypeScript", "Next.js", "WebAuthn", "Rust", "Soroban", "Cryptography"],
      category: "Web3 / Security",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1000&q=80",
      demoUrl: "https://example.com/demo2",
      githubUrl: "https://github.com/example/omnivault",
      featured: true
    },
    {
      id: "p3",
      title: "Aura Component Engine",
      tagline: "Micro-interactions and fluid animation primitive library",
      description: "Accessible design system and gesture-driven UI components built on Framer Motion and modern CSS Houdini properties.",
      tags: ["React", "Framer Motion", "Tailwind CSS", "Storybook", "TypeScript"],
      category: "Frontend / Design",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
      demoUrl: "https://example.com/demo3",
      githubUrl: "https://github.com/example/aura-engine",
      featured: false
    }
  ],
  experiences: [
    {
      id: "e1",
      role: "Senior Full-Stack Engineer",
      company: "Apex HyperScale Technologies",
      location: "San Francisco, CA",
      period: "2024 — Present",
      description: "Leading core platform services and real-time collaboration architecture across web and mobile clients.",
      highlights: [
        "Architected real-time WebSocket protocol reducing latency by 45% across 250k daily active users.",
        "Refactored legacy design system to modern React 19 architecture, improving Lighthouse performance score from 72 to 98.",
        "Mentored a team of 6 engineers on TypeScript best practices and state machine architecture."
      ],
      type: "work"
    },
    {
      id: "e2",
      role: "Software Engineer",
      company: "Nexus Cloud Systems",
      location: "Remote",
      period: "2022 — 2024",
      description: "Built microservices and customer-facing dashboard for multi-cloud resource provisioning.",
      highlights: [
        "Engineered automated deployment pipeline cutting release cycle times by 60%.",
        "Developed custom query builder interface with drag-and-drop workflow visualizer."
      ],
      type: "work"
    },
    {
      id: "e3",
      role: "B.S. in Computer Science",
      company: "University of Technology",
      location: "California",
      period: "2018 — 2022",
      description: "Focused on Distributed Systems, Computer Networks, and Human-Computer Interaction.",
      highlights: [
        "Dean's Honor List (2020, 2021, 2022)",
        "Lead Organizer for Annual Hackathon (500+ attendees)"
      ],
      type: "education"
    }
  ],
  skillCategories: [
    {
      id: "s1",
      name: "Frontend & UI",
      skills: ["React 19", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "HTML5/CSS3", "Vite"]
    },
    {
      id: "s2",
      name: "Backend & Systems",
      skills: ["Node.js", "Go", "Python", "PostgreSQL", "Redis", "GraphQL", "REST APIs"]
    },
    {
      id: "s3",
      name: "DevOps & Cloud",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD Actions", "Vercel", "Terraform", "Cloudflare"]
    },
    {
      id: "s4",
      name: "Specialized & Architecture",
      skills: ["WebSockets", "Distributed Systems", "Web3 / Smart Contracts", "Microservices", "System Design"]
    }
  ],
  theme: {
    accent: "luxury-blue",
    mode: "dark",
    glowEffect: true
  },
  contact: {
    email: "alex.rivera@example.com",
    telegram: "@alexriveradev",
    discord: "alexrivera#0001",
    calendlyUrl: "https://calendly.com",
    customMessage: "Have an exciting project or role in mind? Let's build something remarkable together."
  },
  adminPin: "1234"
};
