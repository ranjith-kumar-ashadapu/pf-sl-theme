import { Sword } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <div className="card-container">
      <h2 className="section-title">
        <Sword className="inline-block mr-2" size={24} />
        DUNGEON RAIDS // PROJECTS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="flex items-start justify-between mb-3">
              <h3 className="project-title">{project.title}</h3>
              <span className={`status-badge ${project.status === 'Completed' ? 'status-completed' : 'status-ongoing'}`}>
                {project.status}
              </span>
            </div>

            {project.role && (
              <p className="project-role">{project.role}</p>
            )}

            <p className="project-description">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {project.techStack.map((tech, techIndex) => (
                <span key={techIndex} className="tech-badge">{tech}</span>
              ))}
            </div>

            <div className="progress-container">
              <div className="flex justify-between mb-1">
                <span className="progress-label">Progress</span>
                <span className="progress-value">{project.progress}%</span>
              </div>
              <div className="progress-bar-background">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
