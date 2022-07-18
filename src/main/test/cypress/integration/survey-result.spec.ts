import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /api\/surveys/;
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET');

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account);
    });
  });

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError();
    cy.visit('/surveys/any_id');
    cy.getByTestId('error').should('contain.text', 'Something went wrong! Try again later');
  });
});
