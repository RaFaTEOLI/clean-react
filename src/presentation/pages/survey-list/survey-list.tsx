import React, { useEffect, useState } from 'react';
import { LoadSurveyList } from '@/domain/usecases';
import { Footer, Header } from '@/presentation/components';
import { SurveyListItem, SurveyContext, SurveyError } from './components';
import Styles from './survey-list-styles.scss';
import { useErrorHandler } from '@/presentation/hooks';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message, reload: false });
  });

  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  });

  useEffect(() => {
    (async () => {
      try {
        const surveys = await loadSurveyList.all();
        setState({ ...state, surveys, reload: false });
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
          {state.error ? <SurveyError /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
