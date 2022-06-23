import React, { useEffect, useState } from 'react';
import { mockSurveyModel } from '@/domain/test';
import { LoadSurveyList } from '@/domain/usecases';
import { Footer, Header } from '@/presentation/components';
import { SurveyItem, SurveyItemEmpty } from './components';
import Styles from './survey-list-styles.scss';
import { SurveyModel } from '@/domain/models';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[]
  });

  useEffect(() => {
    (async () => {
      const surveys = await loadSurveyList.all();
      setState({ surveys });
    })();
  }, []);
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <ul data-testid="survey-list">
          {state.surveys.length ? (
            state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />)
          ) : (
            <SurveyItemEmpty />
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
