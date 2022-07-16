/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect } from 'react';
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components';
import Styles from './survey-result-styles.scss';
import { LoadSurveyResult } from '@/domain/usecases';

type Props = {
  loadSurveyResult?: LoadSurveyResult;
};

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  });

  useEffect(() => {
    (async () => {
      try {
        await loadSurveyResult.show();
        // setState(prev => ({ ...prev, surveys, reload: false }));
      } catch (error) {
        // handleError(error);
      }
    })();
  }, []);

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>Qual é seu framework web favorito? Qual é seu framework web favorito?</h2>
            </hgroup>
            <ul>
              <li>
                <img src="https://robohash.org/react" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li className={Styles.active}>
                <img src="https://robohash.org/react" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li>
                <img src="https://robohash.org/react" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </ul>
            <button>Voltar</button>
          </>
        )}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
