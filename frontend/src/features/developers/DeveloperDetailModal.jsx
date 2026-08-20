import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import { developerService } from '../../api/developerService';

export const DeveloperDetailModal = ({ developerId, onClose }) => {
  const [developer, setDeveloper] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!developerId) return;
    setLoading(true);

    Promise.all([
      developerService.getById(developerId),
      developerService.getSimilar(developerId).catch(() => []),
      developerService.getRecommendations(developerId).catch(() => []),
    ])
      .then(([devData, simData, recData]) => {
        setDeveloper(devData);
        setSimilar(simData);
        setRecommendations(recData);
      })
      .finally(() => setLoading(false));
  }, [developerId]);

  if (!developerId) return null;

  return (
    <Modal isOpen={!!developerId} onClose={onClose} title="Developer Profile & Graph Insights">
      {loading || !developer ? (
        <div className="modal-loading">Loading graph relationships...</div>
      ) : (
        <div className="dev-detail-body">
          <div className="dev-detail-header">
            <h2>{developer.name}</h2>
            <p className="subtitle">{developer.title} {developer.company ? `• ${developer.company.name}` : ''}</p>
          </div>

          <div className="section-block">
            <h4>🛠️ Known Skills ({developer.skills?.length || 0})</h4>
            <div className="badge-grid">
              {developer.skills?.map((s, i) => (
                <Badge key={i} color="#10b981">
                  {s.name} ({s.level || 'known'})
                </Badge>
              ))}
            </div>
          </div>

          <div className="section-block">
            <h4>🤝 Similar Developers (Shared Skills - 2 Hop Traversal)</h4>
            {similar.length === 0 ? (
              <p className="empty-text">No similar developer connections</p>
            ) : (
              similar.map((sim) => (
                <div key={sim.id} className="similar-item">
                  <span><strong>{sim.name}</strong> ({sim.sharedSkills?.join(', ')})</span>
                  <Badge color="#6366f1">{sim.overlap} shared</Badge>
                </div>
              ))
            )}
          </div>

          <div className="section-block">
            <h4>💡 Recommended Skills (Collaborator Traversal - 3 Hop)</h4>
            {recommendations.length === 0 ? (
              <p className="empty-text">No skill recommendations derived</p>
            ) : (
              recommendations.map((rec, i) => (
                <div key={i} className="recommendation-item">
                  <span className="rec-name">✨ {rec.name}</span>
                  <span className="rec-reason">Known by colleagues: {rec.colleagues?.join(', ')}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};
