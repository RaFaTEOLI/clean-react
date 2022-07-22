import React from 'react';
import { Router } from 'react-router-dom';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { currentAccountState } from '@/presentation/components';
import { faker } from '@faker-js/faker';
import SignUp from './signup';
import { Helper, ValidationStub } from '@/presentation/test';
import { EmailAlreadyBeingUsedError } from '@/domain/errors';
import { createMemoryHistory } from 'history';
import { AddAccountSpy, mockAccountModel } from '@/domain/test';
import { AddAccount } from '@/domain/usecases';
import { RecoilRoot } from 'recoil';

type SutTypes = {
  addAccountSpy: AddAccountSpy;
  setCurrentAccountMock: (account: AddAccount.Model) => void;
};

type SutParams = {
  validationError?: string;
  legacyRoot?: boolean;
};

const history = createMemoryHistory({ initialEntries: ['/signup'] });
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const addAccountSpy = new AddAccountSpy();
  const setCurrentAccountMock = jest.fn();
  const mockedState = { setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() };
  validationStub.errorMessage = params?.validationError;
  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
      <Router navigator={history} location={history.location}>
        <SignUp validation={validationStub} addAccount={addAccountSpy} />
      </Router>
    </RecoilRoot>,
    {
      legacyRoot: params?.legacyRoot ?? false
    }
  );
  return { addAccountSpy, setCurrentAccountMock };
};

const simulateValidSubmit = async (
  name = faker.random.word(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('name', name);
  Helper.populateField('email', email);
  Helper.populateField('password', password);
  Helper.populateField('passwordConfirmation', password);

  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('SignUp Component', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0);
    expect(screen.getByTestId('submit')).toBeDisabled();
    Helper.testStatusForField('name', validationError);
    Helper.testStatusForField('email', validationError);
    Helper.testStatusForField('password', validationError);
    Helper.testStatusForField('passwordConfirmation', validationError);
  });

  test('should show name error if validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('name');
    Helper.testStatusForField('name', validationError);
  });

  test('should show email error if validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('email');
    Helper.testStatusForField('email', validationError);
  });

  test('should show password error if validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('password');
    Helper.testStatusForField('password', validationError);
  });

  test('should show password confirmation error if validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('passwordConfirmation');
    Helper.testStatusForField('passwordConfirmation', validationError);
  });

  test('should show valid name state if validation succeeds', () => {
    makeSut();
    Helper.populateField('name');
    Helper.testStatusForField('name');
  });

  test('should show valid email state if validation succeeds', () => {
    makeSut();
    Helper.populateField('email');
    Helper.testStatusForField('email');
  });

  test('should show valid password state if validation succeeds', () => {
    makeSut();
    Helper.populateField('password');
    Helper.testStatusForField('password');
  });

  test('should show valid passwordConfirmation state if validation succeeds', () => {
    makeSut();
    Helper.populateField('passwordConfirmation');
    Helper.testStatusForField('passwordConfirmation');
  });

  test('should enable submit button if form is valid', () => {
    makeSut();
    Helper.populateField('name');
    Helper.populateField('email');
    Helper.populateField('password');
    Helper.populateField('passwordConfirmation');
    expect(screen.getByTestId('submit')).toBeEnabled();
  });

  test('should show spinner on submit', async () => {
    makeSut();
    await simulateValidSubmit();
    expect(screen.queryByTestId('spinner')).toBeInTheDocument();
  });

  test('should call AddAccount with correct value', async () => {
    const { addAccountSpy } = makeSut();
    const name = faker.random.word();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(name, email, password);
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    });
  });

  test('should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut();
    await simulateValidSubmit();
    await simulateValidSubmit();
    expect(addAccountSpy.callsCount).toBe(1);
  });

  test('should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words();
    const { addAccountSpy } = makeSut({ validationError });
    await simulateValidSubmit();
    expect(addAccountSpy.callsCount).toBe(0);
  });

  test('should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut({ legacyRoot: true });
    const error = new EmailAlreadyBeingUsedError();
    jest.spyOn(addAccountSpy, 'add').mockReturnValueOnce(Promise.reject(error));
    await simulateValidSubmit();
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message);
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1);
  });

  test('should call UpdateCurrentAccount on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit();
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account);
    expect(history.location.pathname).toBe('/');
  });

  test('should go to login page', () => {
    makeSut();
    const loginLink = screen.getByTestId('login-link');
    fireEvent.click(loginLink);
    expect(history.location.pathname).toBe('/login');
  });
});
