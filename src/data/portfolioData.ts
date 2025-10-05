import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  profile: {
    name: 'RANJITH KUMAR ASHADAPU',
    title: 'Digital Marketing Associate',
    level: 24,
    hp: 950,
    maxHp: 1000,
    avatar: 'https://postimg.cc/6275LgLj'
  },
  about: `A passionate Digital Marketing Associate on a quest to conquer the digital realm. Specializing in SEO optimization, content strategy, and data-driven campaigns. Currently leveling up skills in analytics and social media management to unlock new achievements in the marketing dungeon.`,
  skills: [
    { name: 'SEO Optimization', level: 88 },
    { name: 'Content Strategy', level: 85 },
    { name: 'Social Media Management', level: 90 },
    { name: 'Analytics & Reporting', level: 82 },
    { name: 'Email Marketing', level: 78 }
  ],
  education: [
    {
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'Engineering College',
      years: '2019 - 2023',
      levelGain: 15
    }
  ],
  experience: [
    {
      title: 'Digital Marketing Associate',
      company: 'Tech Solutions Inc.',
      period: '2023 - Present',
      description: 'Leading digital campaigns and SEO strategies'
    }
  ],
  projects: [
    {
      title: 'BLOCKCHAIN IOT SECURITY',
      description: 'Blockchain technology is used for enhancing secure data transfer from Autonomous Vehicles (AVs). Developed immutable ledger system for tracking vehicle maintenance and accident history.',
      techStack: ['HTML', 'CSS', 'JavaScript', 'Python'],
      status: 'Completed',
      progress: 100
    },
    {
      title: 'CRICKET WORLD CUP 2024 ANALYTICS',
      description: 'To analyse player performance, match outcomes, and key statistics from the Cricket World Cup 2024. Create interactive dashboards for real-time performance metrics visualization.',
      techStack: ['Python', 'SQL', 'Power BI'],
      status: 'Completed',
      progress: 100,
      role: 'Lead Data Analyst'
    },
    {
      title: 'EHR CLOUD SECURITY SYSTEM',
      description: 'Designed a HAES integrating CP-ABE and ECC with MBSSA-based key generation to ensure secure, efficient, and role-based access to encrypted Electronic Health Records (EHRs) in the cloud.',
      techStack: ['Python', 'HTML', 'CSS'],
      status: 'Completed',
      progress: 100
    },
    {
      title: 'POKÉDEX WEB APP OPTIMIZATION',
      description: 'Contributed to Issue #6: Visual Improvements. Developed smart search normalization, enhanced UX with Enter key functionality, applied advanced color grading, and built string parsing functions.',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'PokéAPI'],
      status: 'Completed',
      progress: 100,
      role: 'Frontend Developer'
    }
  ],
  achievements: [
    {
      title: '[Google Analytics Master]',
      description: 'Google Analytics Certified Professional'
    },
    {
      title: '[SEO Champion]',
      description: 'Advanced SEO Certification'
    },
    {
      title: '[Content Strategist]',
      description: 'Digital Marketing Excellence Award'
    },
    {
      title: '[Data Wizard]',
      description: 'Power BI Data Analytics Certification'
    }
  ],
  social: {
    linkedin: 'https://www.linkedin.com/in/ranjith-ashadapu',
    github: 'https://github.com/ranjith-kumar-ashadapu',
    email: 'ashadapurk@gmail.com'
  }
};
