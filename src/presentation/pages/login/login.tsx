import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Styles from './login-styles.scss';
import { Footer, Input, LoginHeader, FormStatus, SubmitButton } from '@/presentation/components';
import { FormContext, ApiContext } from '@/presentation/contexts';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/usecases';

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext);
  const navigate = useNavigate();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  });

  const validate = (field: string): void => {
    const { email, password } = state;
    const formData = { email, password };
    setState(prev => ({
      ...prev,
      [`${field}Error`]: validation.validate(field, formData)
    }));
    setState(prev => ({
      ...prev,
      isFormInvalid: !!prev.emailError || !!prev.passwordError
    }));
  };

  useEffect(() => validate('email'), [state.email]);
  useEffect(() => validate('password'), [state.password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      setState(prev => ({ ...prev, isLoading: true }));
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      });
      setCurrentAccount(account);
      navigate('/');
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      });
    }
  };

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <SubmitButton text="Entrar" />
          <Link data-testid="signup-link" to="/signup" className={Styles.link}>
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;
