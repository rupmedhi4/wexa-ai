import React from 'react';

export const StatCard = ({ icon: Icon, value, label, color = '#6366f1' }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon-wrapper" style={{ color }}>
        <Icon size={24} />
      </div>
      <div className="stat-value">{value ?? '—'}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};
