import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { SurveyList } from '@/presentation/pages';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { LoadSurveyList } from '@/domain/usecases';
import { mockSurveyListModel } from '@/domain/test';
import { SurveyModel } from '@/domain/models';

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();

  async all(): Promise<SurveyModel[]> {
    this.callsCount++;
    return Promise.resolve(this.surveys);
  }
}

const history = createMemoryHistory({ initialEntries: ['/'] });

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

const makeSut = (legacyRoot = false): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy();
  render(
    <Router navigator={history} location={history.location}>
      <SurveyList loadSurveyList={loadSurveyListSpy} />
    </Router>,
    { legacyRoot }
  );
  return { loadSurveyListSpy };
};

describe('SurveyList Component', () => {
  test('should present 4 empty items on start', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');

    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
    await waitFor(() => surveyList);
  });

  test('should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  });

  test('should render SurveyItems on success', async () => {
    makeSut(true);
    const surveyList = await screen.findByTestId('survey-list');
    await waitFor(() => surveyList);
    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3);
  });
});
