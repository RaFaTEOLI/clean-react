import { mockSurveyModel } from '@/domain/test';
import { LoadSurveyList } from '@/domain/usecases';
import { Footer, Header } from '@/presentation/components';
import React, { useEffect } from 'react';
import { SurveyItem, SurveyItemEmpty } from './components';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    (async () => {
      await loadSurveyList.all();
    })();
  }, []);
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <ul data-testid="survey-list">
          <SurveyItem survey={mockSurveyModel()} />
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
