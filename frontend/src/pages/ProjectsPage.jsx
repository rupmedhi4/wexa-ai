import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { projectService } from '../api/projectService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { Badge } from '../components/common/Badge';

export const ProjectsPage = () => {
  const { data: projects, loading, error, refetch } = useFetch(projectService.getAll);

  if (loading) return <LoadingSpinner label="Fetching project nodes..." />;
  if (error) return <ErrorAlert message={error} onRetry={refetch} />;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Active Projects</h2>
        <p className="page-subtitle">Project repositories and associated technology stacks</p>
      </div>

      <div className="cards-grid">
        {projects?.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h3>{project.name}</h3>
              <Badge color="#f59e0b">{project.status}</Badge>
            </div>
            <p className="project-desc">{project.description}</p>
            <div className="project-tech-stack">
              {project.techStack?.map((t, i) => (
                <Badge key={i} color="#6366f1">
                  {t}
                </Badge>
              ))}
            </div>
            <div className="contributors-row">
              👥 Contributors: {project.contributors?.map((c) => c.name).join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
