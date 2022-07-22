import React, { useState, useEffect } from 'react';
import { Error, Footer, Header, Loading } from '@/presentation/components';
import { SurveyResultData, SurveyResultContext } from '@/presentation/pages/survey-result/components';
import Styles from './survey-result-styles.scss';
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases';
import { useErrorHandler } from '@/presentation/hooks';

type Props = {
  loadSurveyResult: LoadSurveyResult;
  saveSurveyResult: SaveSurveyResult;
};

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(prev => ({ ...prev, surveyResult: null, isLoading: false, error: error.message }));
  });

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  });

  const onAnswer = (answer: string): void => {
    setState(prev => ({ ...prev, isLoading: true }));
    saveSurveyResult.save({ answer }).then().catch(handleError);
  };

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
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={Styles.contentWrap}>
          {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  );
};

export default SurveyResult;
