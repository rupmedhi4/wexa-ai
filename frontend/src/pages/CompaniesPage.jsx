import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { companyService } from '../api/companyService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { Badge } from '../components/common/Badge';

export const CompaniesPage = () => {
  const { data: companies, loading, error, refetch } = useFetch(companyService.getAll);

  if (loading) return <LoadingSpinner label="Loading company profiles..." />;
  if (error) return <ErrorAlert message={error} onRetry={refetch} />;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Companies</h2>
        <p className="page-subtitle">Organizations linked to developers in the graph</p>
      </div>

      <div className="cards-grid">
        {companies?.map((comp) => (
          <div key={comp.id} className="company-card">
            <h3>{comp.name}</h3>
            <p className="company-industry">{comp.industry}</p>
            <div className="company-details">
              <span>📅 Founded: {comp.founded}</span>
              <span>👥 Size: {comp.size}</span>
            </div>
            <Badge color="#ef4444">{comp.employeeCount} active developers</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
