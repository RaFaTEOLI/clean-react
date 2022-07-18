import React, { useState, useEffect } from 'react';
import { Error, Footer, Header, Loading } from '@/presentation/components';
import Styles from './survey-result-styles.scss';
import { LoadSurveyResult } from '@/domain/usecases';
import { useErrorHandler } from '@/presentation/hooks';
import { SurveyResultData } from './components';

type Props = {
  loadSurveyResult: LoadSurveyResult;
};

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(prev => ({ ...prev, surveyResult: null, error: error.message }));
  });

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  });

  const reload = (): void => setState(prev => ({ isLoading: false, surveyResult: null, error: '', reload: !prev.reload }));

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
