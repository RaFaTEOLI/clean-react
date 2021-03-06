import * as Helper from '../utils/helpers';
import * as FormHelper from '../utils/form-helpers';
import * as Http from '../utils/http-mocks';
import { faker } from '@faker-js/faker';

const path = /api\/signup/;
const mockEmailInUseError = (): void => Http.mockForbiddenError(path, 'POST');
const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST');
const mockSuccess = (): void => {
  Http.mockOk(/api\/surveys/, 'GET', 'survey-list');
  Http.mockOk(path, 'POST', 'account', 'signUpRequest');
};

const populateFields = (): void => {
  cy.getByTestId('name').focus().type(faker.random.alphaNumeric(7));
  cy.getByTestId('email').focus().type(faker.internet.email());
  const password = faker.random.alphaNumeric(7);
  cy.getByTestId('password').focus().type(password);
  cy.getByTestId('passwordConfirmation').focus().type(password);
};

const simulateValidSubmit = (): void => {
  populateFields();
  cy.getByTestId('submit').click();
};

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup');
  });

  it('should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('name', 'Required field');

    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Required field');

    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Required field');

    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('passwordConfirmation', 'Required field');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(1));
    FormHelper.testInputStatus('name', 'Invalid field');

    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelper.testInputStatus('email', 'Invalid field');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('password', 'Invalid field');

    cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(2));
    FormHelper.testInputStatus('passwordConfirmation', 'Invalid field');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should reset state on page load', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');
    cy.getByTestId('login-link').click();
    cy.getByTestId('signup-link').click();
    FormHelper.testInputStatus('email', 'Required field');
  });

  it('should present valid state if form is valid', () => {
    cy.getByTestId('name').focus().type(faker.name.findName());
    FormHelper.testInputStatus('name');

    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');

    const password = faker.random.alphaNumeric(5);
    cy.getByTestId('password').focus().type(password);
    FormHelper.testInputStatus('password');

    cy.getByTestId('passwordConfirmation').focus().type(password);
    FormHelper.testInputStatus('passwordConfirmation');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present EmailInUseError on 403', () => {
    mockEmailInUseError();
    simulateValidSubmit();
    FormHelper.testMainError('Email Already Being Used');
    Helper.testUrl('/signup');
  });

  it('should present UnexpectedError on 400', () => {
    mockUnexpectedError();
    simulateValidSubmit();

    FormHelper.testMainError('Something went wrong! Try again later');

    Helper.testUrl('/signup');
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

    cy.wait('@signUpRequest');
    cy.get('@signUpRequest.all').should('have.length', 1);
  });

  it('should not call submit if form is invalid', () => {
    mockSuccess();

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}');

    Helper.testHttpCallsCount(0);
  });
});
