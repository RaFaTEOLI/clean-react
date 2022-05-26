import faker from '@faker-js/faker';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly');
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo obrigatorio').should('contain.text', '🔴');

    cy.getByTestId('password').should('have.attr', 'readOnly');
    cy.getByTestId('password-status').should('have.attr', 'title', 'Campo obrigatorio').should('contain.text', '🔴');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should have error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    cy.getByTestId('email-status').should('have.attr', 'title', 'Valor invalido').should('contain.text', '🔴');

    cy.getByTestId('password').focus().type(faker.datatype.string(3));
    cy.getByTestId('password-status').should('have.attr', 'title', 'Valor invalido').should('contain.text', '🔴');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('should have valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('email-status').should('have.attr', 'title', 'Tudo certo!').should('contain.text', '🟡');

    cy.getByTestId('password').focus().type(faker.datatype.string(5));
    cy.getByTestId('password-status').should('have.attr', 'title', 'Tudo certo!').should('contain.text', '🟡');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });
});
