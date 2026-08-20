import React from 'react';
import { NODE_COLORS } from '../../utils/constants';

export const GraphLegend = () => {
  return (
    <div className="graph-legend">
      {Object.entries(NODE_COLORS).map(([type, color]) => (
        <div key={type} className="legend-item">
          <span className="legend-indicator" style={{ backgroundColor: color }} />
          <span className="legend-label">{type}</span>
        </div>
      ))}
    </div>
  );
};
