import React from 'react';
import { Badge } from '../../components/common/Badge';

export const DeveloperCard = ({ developer, onClick }) => {
  return (
    <div className="dev-card" onClick={onClick}>
      <div className="dev-card-header">
        <div className="avatar-circle">
          {developer.name?.charAt(0) || 'D'}
        </div>
        <div>
          <h3 className="dev-name">{developer.name}</h3>
          <p className="dev-title">{developer.title}</p>
        </div>
      </div>

      <div className="dev-meta-row">
        <span>⏱ {developer.experience || 0} yrs exp</span>
        <span>📦 {developer.projectCount || 0} projects</span>
      </div>

      <div className="dev-skills-list">
        {developer.skills?.slice(0, 5).map((skill, index) => (
          <Badge key={index} variant="skill">
            {skill.name}
          </Badge>
        ))}
        {developer.skills?.length > 5 && (
          <Badge variant="more">+{developer.skills.length - 5}</Badge>
        )}
      </div>
    </div>
  );
};
