import React from 'react';

export const Card = ({ children, onClick, className = '', hoverable = true }) => {
  return (
    <div
      onClick={onClick}
      className={`card ${hoverable ? 'card-hover' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
