import React from 'react';

export const Badge = ({ children, variant = 'default', color, style }) => {
  return (
    <span
      className={`badge badge-${variant}`}
      style={{
        backgroundColor: color ? `${color}20` : undefined,
        color: color || undefined,
        borderColor: color ? `${color}40` : undefined,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
