import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        {/* Add your routes here */}
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </Layout>
  );
} 