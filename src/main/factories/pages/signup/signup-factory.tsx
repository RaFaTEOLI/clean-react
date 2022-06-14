import React from 'react';
import { SignUp } from '@/presentation/pages';
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account/remote-add-account-factory';
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/update-current-account/local-update-current-account-factory';
import { makeSignUpValidation } from './signup-validation-factory';

export const SignUpFactory: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  );
};
