import React from 'react';
import { Header } from './Header';
import { useApp } from '../../context/AppContext';

export const Layout = ({ children }) => {
  const { notification } = useApp();

  return (
    <div className="app-shell">
      <Header />
      {notification && (
        <div className={`notification-toast toast-${notification.type}`}>
          {notification.message}
        </div>
      )}
      <main className="main-viewport">{children}</main>
    </div>
  );
};
