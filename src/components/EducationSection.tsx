import { GraduationCap, ArrowRight } from 'lucide-react';
import { Education } from '../types/portfolio';

interface EducationSectionProps {
  education: Education[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <div className="card-container">
      <h2 className="section-title">
        <GraduationCap className="inline-block mr-2" size={24} />
        KNOWLEDGE UNLOCKED // EDUCATION
      </h2>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="quest-item">
            <div className="flex items-start gap-3">
              <ArrowRight className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
              <div className="flex-1">
                <h3 className="quest-title">{edu.degree}</h3>
                <p className="quest-subtitle">{edu.institution}</p>
                <p className="quest-period">{edu.years}</p>
                {edu.levelGain && (
                  <span className="level-gain">Level Cap Increased! (+{edu.levelGain} LV)</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
