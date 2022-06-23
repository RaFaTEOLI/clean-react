import React, { useEffect, useState } from 'react';
import { LoadSurveyList } from '@/domain/usecases';
import { Footer, Header } from '@/presentation/components';
import { SurveyListItem, SurveyContext, SurveyError } from './components';
import Styles from './survey-list-styles.scss';
import { SurveyModel } from '@/domain/models';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  });

  useEffect(() => {
    (async () => {
      try {
        const surveys = await loadSurveyList.all();
        setState({ ...state, surveys });
      } catch (error) {
        setState({ ...state, error: error.message });
      }
    })();
  }, []);

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
