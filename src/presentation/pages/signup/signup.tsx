import React, { useState } from 'react';

import Styles from './signup-styles.scss';
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';

const SignUp: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Campo obrigatorio',
    emailError: 'Campo obrigatorio',
    passwordError: 'Campo obrigatorio',
    passwordConfirmationError: 'Campo obrigatorio',
    mainError: ''
  });

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state }}>
        <form className={Styles.form}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
          <button data-testid="submit" disabled className={Styles.submit} type="submit">
            Cadastrar
          </button>
          <span className={Styles.link}>Voltar Para Login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;
