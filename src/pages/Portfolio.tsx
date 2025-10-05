import ProfileCard from '../components/ProfileCard';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import EducationSection from '../components/EducationSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import AchievementsSection from '../components/AchievementsSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import DarkModeToggle from '../components/DarkModeToggle';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Portfolio() {
  const { data, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-cyan-400 text-xl">Loading portfolio data...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-red-500 text-xl">{error || 'Failed to load portfolio'}</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="stars-background"></div>

      <DarkModeToggle />

      <div className="content-wrapper">
        <ProfileCard {...data.profile} />

        <AboutSection content={data.about} />

        <SkillsSection skills={data.skills} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EducationSection education={data.education} />
          <ExperienceSection experience={data.experience} />
        </div>

        <ProjectsSection projects={data.projects} />

        <AchievementsSection achievements={data.achievements} />

        <ContactForm />

        <Footer social={data.social} />
      </div>
    </div>
  );
}
