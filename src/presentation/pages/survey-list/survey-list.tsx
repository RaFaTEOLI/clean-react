import React, { useEffect, useState } from 'react';
import { LoadSurveyList } from '@/domain/usecases';
import { Error, Footer, Header } from '@/presentation/components';
import { SurveyListItem, SurveyContext } from './components';
import Styles from './survey-list-styles.scss';
import { useErrorHandler } from '@/presentation/hooks';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(prev => ({ ...prev, error: error.message, reload: false }));
  });

  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  });

  const reload = (): void => setState(prev => ({ surveys: [], error: '', reload: !prev.reload }));

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
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <Error error={state.error} reload={reload} /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
