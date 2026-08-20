import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { developerService } from '../api/developerService';
import { DeveloperCard } from '../features/developers/DeveloperCard';
import { DeveloperDetailModal } from '../features/developers/DeveloperDetailModal';
import { AddDeveloperModal } from '../features/developers/AddDeveloperModal';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';

export const DevelopersPage = () => {
  const { data: developers, loading, error, refetch } = useFetch(developerService.getAll);
  const [selectedDevId, setSelectedDevId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  if (loading) return <LoadingSpinner label="Loading developers..." />;
  if (error) return <ErrorAlert message={error} onRetry={refetch} />;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>Developer Network</h2>
          <p className="page-subtitle">Select any developer to inspect graph neighbors and recommendations</p>
        </div>
        <button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={16} /> Add Developer
        </button>
      </div>

      <div className="cards-grid">
        {developers?.map((dev) => (
          <DeveloperCard
            key={dev.id}
            developer={dev}
            onClick={() => setSelectedDevId(dev.id)}
          />
        ))}
      </div>

      <DeveloperDetailModal
        developerId={selectedDevId}
        onClose={() => setSelectedDevId(null)}
      />

      <AddDeveloperModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={refetch}
      />
    </div>
  );
};
