import React from 'react';
import { Login } from '@/presentation/pages';
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory';
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/update-current-account/local-update-current-account-factory';
import { makeLoginValidation } from './login-validation-factory';

export const LoginFactory: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  );
};
