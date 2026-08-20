import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { DevelopersPage } from './pages/DevelopersPage';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { GraphExplorerPage } from './pages/GraphExplorerPage';
import './styles/index.css';

export const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/developers" element={<DevelopersPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/explorer" element={<GraphExplorerPage />} />
            <Route path="*" element={<DashboardPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
};
