import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginFactory } from '@/main/factories/pages/login/login-factory';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginFactory />}>
          <Route path="login" element={<LoginFactory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
