import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginFactory, SignUpFactory, SurveyFactory, SurveyResultFactory } from '@/main/factories/pages/';
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapter';
import { PrivateRoute, currentAccountState } from '@/presentation/components';
import { RecoilRoot } from 'recoil';

const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  };
  return (
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginFactory />} />
          <Route path="/signup" element={<SignUpFactory />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <SurveyFactory />
              </PrivateRoute>
            }
          />
          <Route
            path="/surveys/:id"
            element={
              <PrivateRoute>
                <SurveyResultFactory />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default Router;
