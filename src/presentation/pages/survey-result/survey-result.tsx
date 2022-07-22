import React, { useEffect } from 'react';
import { Error, Footer, Header, Loading } from '@/presentation/components';
import { SurveyResultData, surveyResultState, onSurveyAnswerState } from '@/presentation/pages/survey-result/components';
import Styles from './survey-result-styles.scss';
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases';
import { useErrorHandler } from '@/presentation/hooks';
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';

type Props = {
  loadSurveyResult: LoadSurveyResult;
  saveSurveyResult: SaveSurveyResult;
};

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const resetSurveyResultState = useResetRecoilState(surveyResultState);
  const handleError = useErrorHandler((error: Error) => {
    setState(prev => ({ ...prev, surveyResult: null, isLoading: false, error: error.message }));
  });

  const [state, setState] = useRecoilState(surveyResultState);
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState);

  const onAnswer = (answer: string): void => {
    if (!state.isLoading) {
      setState(prev => ({ ...prev, isLoading: true }));
      saveSurveyResult
        .save({ answer })
        .then(surveyResult => setState(prev => ({ ...prev, isLoading: false, surveyResult })))
        .catch(handleError);
    }
  };

  const reload = (): void => setState(prev => ({ isLoading: false, surveyResult: null, error: '', reload: !prev.reload }));

  useEffect(() => {
    resetSurveyResultState();
    setOnAnswer({ onAnswer });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const surveyResult = await loadSurveyResult.show();
        setState(prev => ({ ...prev, surveyResult }));
      } catch (error) {
        handleError(error);
      }
    })();
  }, [state.reload]);

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
