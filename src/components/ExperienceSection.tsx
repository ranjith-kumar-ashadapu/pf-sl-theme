import { Briefcase, ArrowRight } from 'lucide-react';
import { Experience } from '../types/portfolio';

interface ExperienceSectionProps {
  experience: Experience[];
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <div className="card-container">
      <h2 className="section-title">
        <Briefcase className="inline-block mr-2" size={24} />
        QUEST LOG // WORK EXPERIENCE
      </h2>
      <div className="space-y-4">
        {experience.map((exp, index) => (
          <div key={index} className="quest-item">
            <div className="flex items-start gap-3">
              <ArrowRight className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
              <div className="flex-1">
                <h3 className="quest-title">Joined Guild! (+{exp.title})</h3>
                <p className="quest-subtitle">@{exp.company}</p>
                <p className="quest-period">{exp.period}</p>
                {exp.description && (
                  <p className="quest-description">{exp.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
