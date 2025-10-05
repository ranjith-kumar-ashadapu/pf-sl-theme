import { useEffect, useState } from 'react';

interface ProfileCardProps {
  name: string;
  title: string;
  level: number;
  hp: number;
  maxHp: number;
  avatar: string;
}

export default function ProfileCard({ name, title, level, hp, maxHp, avatar }: ProfileCardProps) {
  const [animatedHp, setAnimatedHp] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedHp(hp);
    }, 500);
    return () => clearTimeout(timer);
  }, [hp]);

  const hpPercentage = (animatedHp / maxHp) * 100;

  return (
    <div className="card-container profile-card">
      <div className="flex items-start gap-6">
        <div className="avatar-container">
          <img
            src={avatar}
            alt={name}
            className="avatar-image"
          />
          <div className="avatar-glow"></div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="profile-name">{name}</h1>
              <p className="profile-title">{title}</p>
            </div>
            <div className="level-badge">
              LV. {level}
            </div>
          </div>

          <div className="hp-container">
            <div className="flex justify-between mb-2">
              <span className="stat-label">HP</span>
              <span className="stat-value">{animatedHp}/{maxHp}</span>
            </div>
            <div className="hp-bar-background">
              <div
                className="hp-bar-fill"
                style={{ width: `${hpPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
