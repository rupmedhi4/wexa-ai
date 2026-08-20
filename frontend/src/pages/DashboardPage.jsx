import React from 'react';
import { Users, Wrench, Package, Building, GitFork } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { graphService } from '../api/graphService';
import { StatCard } from '../features/dashboard/StatCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { NODE_COLORS } from '../utils/constants';

export const DashboardPage = () => {
  const { data: stats, loading, error, refetch } = useFetch(graphService.getStats);

  if (loading) return <LoadingSpinner label="Fetching CognoDB network statistics..." />;
  if (error) return <ErrorAlert message={error} onRetry={refetch} />;

  return (
    <div className="page-container">
      <div className="hero-section">
        <h1>
          Developer Skills <span className="gradient-text">Network</span>
        </h1>
        <p className="hero-description">
          Graph-backed system using CognoDB openCypher queries for multi-hop skill matching,
          collaborator recommendations, and real-time connectivity insights.
        </p>
      </div>

      <div className="stats-grid">
        <StatCard icon={Users} value={stats?.developers} label="Developers" color={NODE_COLORS.Developer} />
        <StatCard icon={Wrench} value={stats?.skills} label="Skills" color={NODE_COLORS.Skill} />
        <StatCard icon={Package} value={stats?.projects} label="Projects" color={NODE_COLORS.Project} />
        <StatCard icon={Building} value={stats?.companies} label="Companies" color={NODE_COLORS.Company} />
        <StatCard icon={GitFork} value={stats?.totalRelationships} label="Total Graph Relationships" color="#a78bfa" />
      </div>
    </div>
  );
};
