import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SurveyList } from '@/presentation/pages';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { LoadSurveyList } from '@/domain/usecases';
import { mockSurveyListModel } from '@/domain/test';
import { SurveyModel } from '@/domain/models';
import { UnexpectedError } from '@/domain/errors';

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

const makeSut = (legacyRoot = false, loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
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
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
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
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });

  test('should render error on failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyListSpy, 'all').mockRejectedValueOnce(error);
    makeSut(true, loadSurveyListSpy);
    await waitFor(() => screen.getByTestId('error'));
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument();
    const errorWrap = await screen.findByTestId('error');
    expect(errorWrap).toHaveTextContent(error.message);
  });

  test('should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest.spyOn(loadSurveyListSpy, 'all').mockRejectedValueOnce(new UnexpectedError());
    makeSut(true, loadSurveyListSpy);
    await waitFor(() => screen.getByTestId('error'));
    fireEvent.click(screen.getByTestId('reload'));
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  });
});
