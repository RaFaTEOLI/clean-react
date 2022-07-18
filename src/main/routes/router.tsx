import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginFactory, SignUpFactory, SurveyFactory, SurveyResultFactory } from '@/main/factories/pages/';
import { ApiContext } from '@/presentation/contexts';
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapter';
import { PrivateRoute } from '@/presentation/components';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{ setCurrentAccount: setCurrentAccountAdapter, getCurrentAccount: getCurrentAccountAdapter }}
    >
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
    </ApiContext.Provider>
  );
};

export default Router;
