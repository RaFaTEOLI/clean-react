import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginFactory, SignUpFactory } from '@/main/factories/pages/';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Dashboard</h1>} />
        <Route path="/login" element={<LoginFactory />} />
        <Route path="/signup" element={<SignUpFactory />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
