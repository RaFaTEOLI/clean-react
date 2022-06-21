import React from 'react';
import { render, screen } from '@testing-library/react';
import { SurveyList } from '@/presentation/pages';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { LoadSurveyList } from '@/domain/usecases';
import { SurveyModel } from '@/domain/models';

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;

  async all(): Promise<SurveyModel[]> {
    this.callsCount++;
    return Promise.resolve([]);
  }
}

const history = createMemoryHistory({ initialEntries: ['/'] });

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy();
  render(
    <Router navigator={history} location={history.location}>
      <SurveyList loadSurveyList={loadSurveyListSpy} />
    </Router>
  );
  return { loadSurveyListSpy };
};

describe('SurveyList Component', () => {
  test('should present 4 empty items on start', () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');

    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });

  test('should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});
