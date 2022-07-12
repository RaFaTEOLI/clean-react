import * as Helper from '../utils/helpers';
import * as FormHelper from '../utils/form-helpers';
import * as Http from '../utils/http-mocks';
import { faker } from '@faker-js/faker';

const path = /api\/login/;
const mockInvalidCredentialsError = (): void => Http.mockUnauthorizedError(path);
const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST');
const mockSuccess = (): void => {
  Http.mockOk(/api\/surveys/, 'GET', 'survey-list');
  Http.mockOk(path, 'POST', 'account', 'loginRequest');
};

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email());
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
};

const simulateValidSubmit = (): void => {
  populateFields();
  cy.getByTestId('submit').click();
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Required field');

    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Required field');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelper.testInputStatus('email', 'Invalid field');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('password', 'Invalid field');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
    FormHelper.testInputStatus('password');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should show UnexpectedError on 400', () => {
    mockUnexpectedError();
    simulateValidSubmit();

    FormHelper.testMainError('Something went wrong! Try again later');

    Helper.testUrl('/login');
  });

  it('should present InvalidCredentialsError on 401', () => {
    mockInvalidCredentialsError();
    simulateValidSubmit();

    FormHelper.testMainError('Invalid Credentials');

    Helper.testUrl('/login');
  });

  it('should present UnexpectedError on default error cases', () => {
    mockUnexpectedError();
    simulateValidSubmit();

    FormHelper.testMainError('Something went wrong! Try again later');
    Helper.testUrl('/login');
  });

  it('should present save account if valid credentials are provided', () => {
    mockSuccess();
    simulateValidSubmit();

    cy.getByTestId('main-error').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');

    Helper.testUrl('/');
    Helper.testLocalStorageItem('account');
  });

  it('should prevent multiple submits', () => {
    mockSuccess();
    populateFields();

    cy.getByTestId('submit').click();

    cy.wait('@loginRequest');
    cy.get('@loginRequest.all').should('have.length', 1);
  });

  it('should not call submit if form is invalid', () => {
    mockSuccess();

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}');

    Helper.testHttpCallsCount(0);
  });
});
