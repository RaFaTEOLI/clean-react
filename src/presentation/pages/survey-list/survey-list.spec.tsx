import { fireEvent, screen, waitFor } from '@testing-library/react';
import { SurveyList } from '@/presentation/pages';
import { createMemoryHistory, MemoryHistory } from 'history';
import { LoadSurveyListSpy } from '@/domain/test';
import { UnexpectedError, AccessDeniedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { renderWithHistory } from '@/presentation/test';

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
  history: MemoryHistory;
  setCurrentAccountMock: (account: AccountModel) => void;
};

const makeSut = (legacyRoot = false, loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    useAct: true,
    legacyRoot,
    Page: () => SurveyList({ loadSurveyList: loadSurveyListSpy })
  });

  return {
    loadSurveyListSpy,
    history,
    setCurrentAccountMock
  };
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

  test('should render error on UnexpectedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyListSpy, 'all').mockRejectedValueOnce(error);
    makeSut(true, loadSurveyListSpy);
    await waitFor(() => screen.getByTestId('error'));
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument();
    const errorWrap = await screen.findByTestId('error');
    expect(errorWrap).toHaveTextContent(error.message);
  });

  test('should render error on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest.spyOn(loadSurveyListSpy, 'all').mockRejectedValueOnce(new AccessDeniedError());
    const { setCurrentAccountMock, history } = makeSut(true, loadSurveyListSpy);
    await waitFor(() => screen.getByRole('heading'));
    setTimeout(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
      expect(history.location.pathname).toBe('/login');
    }, 500);
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
