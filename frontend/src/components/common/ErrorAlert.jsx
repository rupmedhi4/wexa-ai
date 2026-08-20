import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ErrorAlert = ({ message, onRetry }) => {
  return (
    <div className="error-alert">
      <AlertCircle className="error-icon" size={24} />
      <div className="error-text">
        <h4>Connection Warning</h4>
        <p>{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn-retry">
          Retry
        </button>
      )}
    </div>
  );
};
