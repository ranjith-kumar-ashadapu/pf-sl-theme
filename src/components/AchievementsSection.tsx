import { Trophy } from 'lucide-react';
import { Achievement } from '../types/portfolio';

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <div className="card-container">
      <h2 className="section-title">
        <Trophy className="inline-block mr-2" size={24} />
        TITLES EARNED // ACHIEVEMENTS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="achievement-item">
            <h3 className="achievement-title">{achievement.title}</h3>
            <p className="achievement-description">{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
