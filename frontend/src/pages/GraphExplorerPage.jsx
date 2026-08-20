import React, { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { graphService } from '../api/graphService';
import { GraphCanvas } from '../components/graph/GraphCanvas';
import { GraphLegend } from '../components/graph/GraphLegend';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { DeveloperDetailModal } from '../features/developers/DeveloperDetailModal';

export const GraphExplorerPage = () => {
  const { data: graphData, loading, error, refetch } = useFetch(graphService.getVisualization);
  const [selectedDevId, setSelectedDevId] = useState(null);

  if (loading) return <LoadingSpinner label="Constructing 2D force-directed canvas layout..." />;
  if (error) return <ErrorAlert message={error} onRetry={refetch} />;

  const handleNodeClick = (node) => {
    if (node.label === 'Developer') {
      setSelectedDevId(node.id);
    }
  };

  return (
    <div className="explorer-page-container">
      <div className="explorer-header">
        <div>
          <h2>Interactive Graph Explorer</h2>
          <p className="page-subtitle">Drag nodes, scroll to zoom, click developer nodes to inspect traversals</p>
        </div>
        <GraphLegend />
      </div>

      <GraphCanvas data={graphData} onNodeClick={handleNodeClick} />

      <DeveloperDetailModal
        developerId={selectedDevId}
        onClose={() => setSelectedDevId(null)}
      />
    </div>
  );
};
