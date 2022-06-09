import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginFactory, SignUpFactory } from '@/main/factories/pages/';
import SurveyList from '@/presentation/pages/survey-list/survey-list';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<h1>Dashboard</h1>} /> */}
        <Route path="/login" element={<LoginFactory />} />
        <Route path="/signup" element={<SignUpFactory />} />
        <Route path="/" element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
