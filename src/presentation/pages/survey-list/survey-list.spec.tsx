import React from 'react';
import { render, screen } from '@testing-library/react';
import { SurveyList } from '@/presentation/pages';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory({ initialEntries: ['/'] });

const makeSut = (): void => {
  render(
    <Router navigator={history} location={history.location}>
      <SurveyList />
    </Router>
  );
};

describe('SurveyList Component', () => {
  test('should present 4 empty items on start', () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');

    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });
});
