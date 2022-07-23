import { SurveyResult, surveyResultState } from '@/presentation/pages';
import { LoadSurveyResultSpy, SaveSurveyResultSpy, mockSurveyResultModel } from '@/tests/domain/mocks';
import { screen, waitFor, fireEvent, act } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import userEvent from '@testing-library/user-event';
import { renderWithHistory } from '@/tests/presentation/mocks';
import { LoadSurveyResult } from '@/domain/usecases';

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy;
  saveSurveyResultSpy: SaveSurveyResultSpy;
  history: MemoryHistory;
  setCurrentAccountMock: (account: AccountModel) => void;
};

type SutParams = {
  loadSurveyResultSpy?: LoadSurveyResultSpy;
  saveSurveyResultSpy?: SaveSurveyResultSpy;
  legacyRoot?: boolean;
  initialState?: {
    isLoading: boolean;
    error: string;
    surveyResult: LoadSurveyResult.Model;
    reload: boolean;
  };
};

const makeSut = ({
  loadSurveyResultSpy = new LoadSurveyResultSpy(),
  saveSurveyResultSpy = new SaveSurveyResultSpy(),
  legacyRoot = true,
  initialState = null
}: SutParams = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/', '/surveys/any_id'], initialIndex: 1 });
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    legacyRoot,
    Page: () => SurveyResult({ loadSurveyResult: loadSurveyResultSpy, saveSurveyResult: saveSurveyResultSpy }),
    states: initialState ? [{ atom: surveyResultState, value: initialState }] : []
  });
  return {
    loadSurveyResultSpy,
    saveSurveyResultSpy,
    history,
    setCurrentAccountMock
  };
};

describe('SurveyResult Component', () => {
  test('should present correct initial state', () => {
    makeSut();
    const surveyResult = screen.getByTestId('survey-result');
    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  test('should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut();
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
  });

  test('should present SurveyResult data on success', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2020-01-10T00:00:00')
    });
    loadSurveyResultSpy.surveyResult = surveyResult;
    makeSut({ loadSurveyResultSpy });
    await waitFor(() => screen.getByTestId('question'));
    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('month')).toHaveTextContent('jan');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
    expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question);
    expect(screen.getByTestId('answers').childElementCount).toBe(2);

    const answersWrap = screen.queryAllByTestId('answer-wrap');
    expect(answersWrap[0]).toHaveClass('active');
    expect(answersWrap[1]).not.toHaveClass('active');

    const images = screen.queryAllByTestId('image');
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image);
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer);
    expect(images[1]).toBeFalsy();

    const answers = screen.queryAllByTestId('answer');
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer);
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer);

    const percents = screen.queryAllByTestId('percent');
    expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`);
    expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`);
  });

  test('should render error on UnexpectedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyResultSpy, 'show').mockRejectedValueOnce(error);
    makeSut({ loadSurveyResultSpy });
    await waitFor(() => screen.getByTestId('error'));
    expect(screen.queryByTestId('question')).not.toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent(error.message);
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  test('should logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    jest.spyOn(loadSurveyResultSpy, 'show').mockRejectedValueOnce(new AccessDeniedError());
    const { setCurrentAccountMock, history } = makeSut({ loadSurveyResultSpy });
    await waitFor(() => screen.getByTestId('survey-result'));
    setInterval(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
      expect(history.location.pathname).toBe('/login');
    }, 1000);
  });

  test('should call LoadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    jest.spyOn(loadSurveyResultSpy, 'show').mockRejectedValueOnce(new UnexpectedError());
    makeSut({ loadSurveyResultSpy });
    await waitFor(() => screen.getByTestId('survey-result'));
    await act(async () => {
      await waitFor(() => screen.getByTestId('reload'));
      fireEvent.click(screen.getByTestId('reload'));
    });

    expect(loadSurveyResultSpy.callsCount).toBe(1);
  });

  test('should go to SurveyList on back button click', async () => {
    const { history } = makeSut();
    await waitFor(() => screen.getByTestId('survey-result'));
    await act(async () => {
      await waitFor(() => screen.getByTestId('back-button'));
      fireEvent.click(screen.getByTestId('back-button'));
    });
    setInterval(() => {
      expect(history.location.pathname).toBe('/');
    }, 1000);
  });

  test('should not present Loading on active answer click', async () => {
    makeSut();
    await waitFor(() => screen.getByTestId('answers'));
    const answersWrap = screen.queryAllByTestId('answer-wrap');
    fireEvent.click(answersWrap[0]);
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  test('should call SaveSurveyResult on non active answer click', async () => {
    const { saveSurveyResultSpy, loadSurveyResultSpy } = makeSut();
    await waitFor(() => screen.getByTestId('answers'));
    const answersWrap = screen.queryAllByTestId('answer-wrap');
    fireEvent.click(answersWrap[1]);
    expect(screen.queryByTestId('loading')).toBeInTheDocument();
    expect(saveSurveyResultSpy.params).toEqual({
      answer: loadSurveyResultSpy.surveyResult.answers[1].answer
    });
    await waitFor(() => screen.getByTestId('survey-result'));
  });

  test('should render error on UnexpectedError', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy();
    const error = new UnexpectedError();
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(error);
    makeSut({ saveSurveyResultSpy });
    await waitFor(() => screen.getByTestId('answers'));
    const answersWrap = screen.queryAllByTestId('answer-wrap');
    fireEvent.click(answersWrap[1]);
    await waitFor(() => screen.getByTestId('answers'));
    expect(screen.queryByTestId('question')).not.toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent(error.message);
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  test('should logout on AccessDeniedError', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy();
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(new AccessDeniedError());
    const { setCurrentAccountMock, history } = makeSut({ saveSurveyResultSpy });
    await waitFor(() => screen.getByTestId('answers'));
    const answersWrap = screen.queryAllByTestId('answer-wrap');
    fireEvent.click(answersWrap[1]);
    await waitFor(() => screen.getByTestId('answers'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });

  test('should present SurveyResult data on SaveSurveyResult success', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy();
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2020-01-09T00:00:00')
    });
    saveSurveyResultSpy.surveyResult = surveyResult;
    makeSut({ saveSurveyResultSpy });
    await waitFor(() => screen.getByTestId('question'));
    const answersWrap = screen.queryAllByTestId('answer-wrap');
    await act(() => {
      fireEvent.click(answersWrap[1]);
    });
    await waitFor(() => screen.getByTestId('answers'));
    expect(screen.getByTestId('day')).toHaveTextContent('09');
    expect(screen.getByTestId('month')).toHaveTextContent('jan');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
    expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question);
    expect(screen.getByTestId('answers').childElementCount).toBe(2);
    expect(answersWrap[0]).toHaveClass('active');
    expect(answersWrap[1]).not.toHaveClass('active');
    const images = screen.queryAllByTestId('image');
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image);
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer);
    expect(images[1]).toBeFalsy();
    const answers = screen.queryAllByTestId('answer');
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer);
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer);
    const percents = screen.queryAllByTestId('percent');
    expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`);
    expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`);
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  test('should prevent multiple answer click', async () => {
    const { saveSurveyResultSpy } = makeSut({ legacyRoot: false });
    await waitFor(() => screen.getByTestId('question'));
    const answersWrap = screen.queryAllByTestId('answer-wrap');
    await userEvent.dblClick(answersWrap[1]);
    await waitFor(() => screen.getByTestId('question'));
    expect(saveSurveyResultSpy.callsCount).toBe(1);
  });

  test('should prevent multiple answer click with initial state loading', async () => {
    const initialState = {
      isLoading: true,
      error: '',
      surveyResult: null,
      reload: false
    };
    const { saveSurveyResultSpy } = makeSut({ initialState });
    await waitFor(() => screen.getByTestId('question'));
    const answersWrap = screen.queryAllByTestId('answer-wrap');

    fireEvent.click(answersWrap[1]);
    await waitFor(() => screen.getByTestId('question'));

    expect(saveSurveyResultSpy.callsCount).toBe(0);
  });
});
