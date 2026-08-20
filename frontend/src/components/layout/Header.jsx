import React from 'react';
import { Link } from 'react-router-dom';
import { Network } from 'lucide-react';
import { Navigation } from './Navigation';
import { SearchBar } from './SearchBar';

export const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="brand-logo">
          <div className="logo-badge">
            <Network size={20} className="logo-icon" />
          </div>
          <span className="brand-name">
            Dev<span className="brand-highlight">Graph</span>
          </span>
        </Link>

        <Navigation />
        <SearchBar />
      </div>
    </header>
  );
};
