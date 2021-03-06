import React from 'react';
import { Login } from '@/presentation/pages';
import { makeRemoteAuthentication } from '@/main/factories/usecases';
import { makeLoginValidation } from '@/main/factories/validation';

export const LoginFactory: React.FC = () => {
  return <Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} />;
};
