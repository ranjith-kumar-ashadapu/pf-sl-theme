import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Code, BookOpen, Briefcase, FolderOpen, Trophy, Link as LinkIcon } from 'lucide-react';
import ProfileManager from '../components/admin/ProfileManager';
import SkillsManager from '../components/admin/SkillsManager';
import EducationManager from '../components/admin/EducationManager';
import ExperienceManager from '../components/admin/ExperienceManager';
import ProjectsManager from '../components/admin/ProjectsManager';
import AchievementsManager from '../components/admin/AchievementsManager';
import SocialLinksManager from '../components/admin/SocialLinksManager';

type TabType = 'profile' | 'skills' | 'education' | 'experience' | 'projects' | 'achievements' | 'social';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const { signOut, user } = useAuth();

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: User },
    { id: 'skills' as TabType, label: 'Skills', icon: Code },
    { id: 'education' as TabType, label: 'Education', icon: BookOpen },
    { id: 'experience' as TabType, label: 'Experience', icon: Briefcase },
    { id: 'projects' as TabType, label: 'Projects', icon: FolderOpen },
    { id: 'achievements' as TabType, label: 'Achievements', icon: Trophy },
    { id: 'social' as TabType, label: 'Social Links', icon: LinkIcon },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="stars-background"></div>

      <div className="content-wrapper" style={{ maxWidth: '1600px' }}>
        <div className="card-container mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="section-title mb-2">ADMIN CONTROL PANEL</h1>
              <p className="text-gray-400">Logged in as: {user?.email}</p>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="card-container">
              <h2 className="text-lg font-bold text-cyan-400 mb-4 uppercase tracking-wider">Sections</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? 'bg-cyan-400/20 border-2 border-cyan-400 text-cyan-400'
                          : 'bg-black/20 border-2 border-gray-700 text-gray-400 hover:border-cyan-400/50 hover:text-cyan-400'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-semibold">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'profile' && <ProfileManager />}
            {activeTab === 'skills' && <SkillsManager />}
            {activeTab === 'education' && <EducationManager />}
            {activeTab === 'experience' && <ExperienceManager />}
            {activeTab === 'projects' && <ProjectsManager />}
            {activeTab === 'achievements' && <AchievementsManager />}
            {activeTab === 'social' && <SocialLinksManager />}
          </div>
        </div>
      </div>
    </div>
  );
}
