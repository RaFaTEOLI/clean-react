import React, { useEffect } from 'react';
import { LoadSurveyList } from '@/domain/usecases';
import { Error, Footer, Header } from '@/presentation/components';
import { SurveyListItem, surveyListState } from './components';
import Styles from './survey-list-styles.scss';
import { useErrorHandler } from '@/presentation/hooks';
import { useRecoilState, useResetRecoilState } from 'recoil';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const resetSurveyListState = useResetRecoilState(surveyListState);
  const handleError = useErrorHandler((error: Error) => {
    setState(prev => ({ ...prev, error: error.message, reload: false }));
  });

  const [state, setState] = useRecoilState(surveyListState);

  const reload = (): void => setState(prev => ({ surveys: [], error: '', reload: !prev.reload }));

  useEffect(() => resetSurveyListState(), []);
  useEffect(() => {
    (async () => {
      try {
        const surveys = await loadSurveyList.all();
        setState(prev => ({ ...prev, surveys, reload: false }));
      } catch (error) {
        handleError(error);
      }
    })();
  }, [state.reload]);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        {state.error ? <Error error={state.error} reload={reload} /> : <SurveyListItem surveys={state.surveys} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
