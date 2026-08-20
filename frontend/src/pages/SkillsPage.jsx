import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { skillService } from '../api/skillService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { Badge } from '../components/common/Badge';

export const SkillsPage = () => {
  const { data: skills, loading, error, refetch } = useFetch(skillService.getAll);

  if (loading) return <LoadingSpinner label="Grouping skills by graph domain..." />;
  if (error) return <ErrorAlert message={error} onRetry={refetch} />;

  const grouped = skills?.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {}) || {};

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Skill Ecosystem</h2>
        <p className="page-subtitle">Categorized skills with active developer connection counts</p>
      </div>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="category-section">
          <h3 className="category-title">{category}</h3>
          <div className="skills-grid">
            {items.map((skill) => (
              <div key={skill.id} className="skill-card">
                <span className="skill-name">{skill.name}</span>
                <Badge color="#10b981">{skill.developerCount} devs</Badge>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
