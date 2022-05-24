import React from 'react';
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import faker from '@faker-js/faker';
import SignUp from './signup';
import { Helper, ValidationStub } from '@/presentation/test';

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError?: string;
  legacyRoot?: boolean;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const sut = render(<SignUp validation={validationStub} />);
  return { sut };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.name.firstName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField(sut, 'name', name);
  Helper.populateField(sut, 'email', email);
  Helper.populateField(sut, 'password', password);
  Helper.populateField(sut, 'passwordConfirmation', password);
  const form = sut.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('SignUp Component', () => {
  afterEach(cleanup);

  test('should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'name', validationError);
    Helper.testStatusForField(sut, 'email', validationError);
    Helper.testStatusForField(sut, 'password', validationError);
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError);
  });

  test('should show name error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, 'name');
    Helper.testStatusForField(sut, 'name', validationError);
  });

  test('should show email error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, 'email');
    Helper.testStatusForField(sut, 'email', validationError);
  });

  test('should show password error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, 'password');
    Helper.testStatusForField(sut, 'password', validationError);
  });

  test('should show password confirmation error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateField(sut, 'passwordConfirmation');
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError);
  });

  test('should show valid name state if validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'name');
    Helper.testStatusForField(sut, 'name');
  });

  test('should show valid email state if validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'email');
    Helper.testStatusForField(sut, 'email');
  });

  test('should show valid password state if validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'password');
    Helper.testStatusForField(sut, 'password');
  });

  test('should show valid passwordConfirmation state if validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'passwordConfirmation');
    Helper.testStatusForField(sut, 'passwordConfirmation');
  });

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    Helper.populateField(sut, 'name');
    Helper.populateField(sut, 'email');
    Helper.populateField(sut, 'password');
    Helper.populateField(sut, 'passwordConfirmation');
    Helper.testButtonIsDisabled(sut, 'submit', false);
  });

  test('should show spinner on submit', async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    Helper.testElementExists(sut, 'spinner');
  });
});
