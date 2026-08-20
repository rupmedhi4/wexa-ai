import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Wrench, Package, Building, Network } from 'lucide-react';

export const Navigation = () => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/developers', label: 'Developers', icon: Users },
    { to: '/skills', label: 'Skills', icon: Wrench },
    { to: '/projects', label: 'Projects', icon: Package },
    { to: '/companies', label: 'Companies', icon: Building },
    { to: '/explorer', label: 'Explorer', icon: Network },
  ];

  return (
    <nav className="main-nav">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <Icon size={16} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
