import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import faker from '@faker-js/faker';
import { render, fireEvent, cleanup, waitFor, screen } from '@testing-library/react';
import { Login } from '@/presentation/pages';
import { ValidationStub, AuthenticationSpy, UpdateCurrentAccountMock, Helper } from '@/presentation/test';
import { InvalidCredentialsError } from '@/domain/errors';

type SutTypes = {
  authenticationSpy: AuthenticationSpy;
  updateCurrentAccountMock: UpdateCurrentAccountMock;
};

type SutParams = {
  validationError?: string;
  legacyRoot?: boolean;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const updateCurrentAccountMock = new UpdateCurrentAccountMock();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Router navigator={history} location={history.location}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        updateCurrentAccount={updateCurrentAccountMock}
      />
    </Router>,
    { legacyRoot: params?.legacyRoot ?? false }
  );
  return { authenticationSpy, updateCurrentAccountMock };
};

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('email', email);
  Helper.populateField('password', password);

  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('Login Component', () => {
  afterEach(cleanup);

  it('should not render spinner and error on start', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0);
    expect(screen.getByTestId('submit')).toBeDisabled();
  });

  it('should start with submit button disabled', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('email');

    expect(screen.getByTestId('submit')).toBeDisabled();
    Helper.testStatusForField('email', validationError);
    Helper.testStatusForField('password', validationError);
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

  test('should enable submit button if form is valid', async () => {
    makeSut();
    await simulateValidSubmit();
    expect(screen.getByTestId('submit')).toBeEnabled();
  });

  test('should show spinner on submit', async () => {
    makeSut();
    await simulateValidSubmit();
    expect(screen.queryByTestId('spinner')).toBeInTheDocument();
  });

  test('should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password
    });
  });

  test('should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut();
    await simulateValidSubmit();
    await simulateValidSubmit();
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { authenticationSpy } = makeSut({ validationError });
    await simulateValidSubmit();
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut({ legacyRoot: true });
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error);
    await simulateValidSubmit();
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message);
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1);
  });

  test('should call SaveAccessToken on success', async () => {
    const { authenticationSpy, updateCurrentAccountMock } = makeSut();
    await simulateValidSubmit();
    expect(updateCurrentAccountMock.account).toEqual(authenticationSpy.account);
    expect(history.location.pathname).toBe('/');
  });

  test('should go to signup page', () => {
    makeSut();
    const register = screen.getByTestId('signup-link');
    fireEvent.click(register);
    expect(history.location.pathname).toBe('/signup');
  });
});
