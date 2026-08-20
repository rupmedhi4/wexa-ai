/**
 * Global App Context
 * Provides global state for notifications, active modals, and refresh triggers.
 */

import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedDeveloperId, setSelectedDeveloperId] = useState(null);
  const [isAddDevModalOpen, setIsAddDevModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <AppContext.Provider
      value={{
        selectedDeveloperId,
        setSelectedDeveloperId,
        isAddDevModalOpen,
        setIsAddDevModalOpen,
        notification,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
