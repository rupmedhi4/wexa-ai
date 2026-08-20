import React from 'react';

export const LoadingSpinner = ({ label = 'Loading network data...' }) => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="spinner-label">{label}</p>
    </div>
  );
};
