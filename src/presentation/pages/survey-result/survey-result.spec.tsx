import { SurveyResult } from '@/presentation/pages';
import { ApiContext } from '@/presentation/contexts';
import { mockAccountModel } from '@/domain/test';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import React from 'react';

const history = createMemoryHistory({ initialEntries: ['/surveys'] });

describe('SurveyResult Component', () => {
  test('should present correct initial state', () => {
    render(
      <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
        <Router navigator={history} location={history.location}>
          <SurveyResult />
        </Router>
      </ApiContext.Provider>
    );
    const surveyResult = screen.getByTestId('survey-result');
    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });
});
