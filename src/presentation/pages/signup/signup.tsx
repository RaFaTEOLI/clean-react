import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Styles from './signup-styles.scss';
import { signUpState, Input, SubmitButton, FormStatus } from './components';
import { Footer, LoginHeader, currentAccountState } from '@/presentation/components';
import { Validation } from '@/presentation/protocols/validation';
import { AddAccount } from '@/domain/usecases';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

type Props = {
  validation?: Validation;
  addAccount?: AddAccount;
};

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const resetSignUpState = useResetRecoilState(signUpState);
  const { setCurrentAccount } = useRecoilValue(currentAccountState);
  const navigate = useNavigate();
  const [state, setState] = useRecoilState(signUpState);

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state;
    const formData = { name, email, password, passwordConfirmation };
    setState(prev => ({ ...prev, [`${field}Error`]: validation.validate(field, formData) }));
    setState(prev => ({
      ...prev,
      isFormInvalid: !!prev.nameError || !!prev.emailError || !!prev.passwordError || !!prev.passwordConfirmationError
    }));
  };

  useEffect(() => resetSignUpState(), []);
  useEffect(() => validate('name'), [state.name]);
  useEffect(() => validate('email'), [state.email]);
  useEffect(() => validate('password'), [state.password]);
  useEffect(() => validate('passwordConfirmation'), [state.passwordConfirmation]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      setState(prev => ({ ...prev, isLoading: true }));
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      });
      setCurrentAccount(account);
      navigate('/');
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        mainError: error.message
      }));
    }
  };

  return (
    <div className={Styles.signUpWrap}>
      <LoginHeader />
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>
        <Input type="text" name="name" placeholder="Digite seu nome" />
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
        <SubmitButton text="Cadastrar" />
        <Link data-testid="login-link" to="/login" className={Styles.link}>
          Voltar Para Login
        </Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  );
};

export default SignUp;
