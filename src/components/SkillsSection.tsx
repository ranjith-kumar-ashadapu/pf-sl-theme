import { useEffect, useState } from 'react';
import { Skill } from '../types/portfolio';

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [animatedSkills, setAnimatedSkills] = useState<number[]>(skills.map(() => 0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedSkills(skills.map(skill => skill.level));
    }, 300);
    return () => clearTimeout(timer);
  }, [skills]);

  return (
    <div className="card-container">
      <h2 className="section-title">ABILITIES // SKILL TREE</h2>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={skill.name} className="skill-item">
            <div className="flex justify-between mb-2">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{animatedSkills[index]}/100</span>
            </div>
            <div className="skill-bar-background">
              <div
                className="skill-bar-fill"
                style={{ width: `${animatedSkills[index]}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
