export interface Skill {
  name: string;
  level: number;
}

export interface Education {
  degree: string;
  institution: string;
  years: string;
  levelGain?: number;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description?: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  status: 'Completed' | 'Ongoing';
  progress: number;
  role?: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    title: string;
    level: number;
    hp: number;
    maxHp: number;
    avatar: string;
  };
  about: string;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  achievements: Achievement[];
  social: {
    linkedin: string;
    github: string;
    email: string;
  };
}
