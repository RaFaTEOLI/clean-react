import React from 'react';
import { Footer, Header, Spinner } from '@/presentation/components';
import Styles from './survey-result-styles.scss';

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        <h2>Qual é seu framework web favorito?</h2>
        <ul>
          <li>
            <img src="https://robohash.org/test" />
            <span className={Styles.answer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li className={Styles.active}>
            <img src="https://robohash.org/test" />
            <span className={Styles.answer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li>
            <img src="https://robohash.org/test" />
            <span className={Styles.answer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
        </ul>
        <button>Go Back</button>
        <div className={Styles.loadingWrap}>
          <div className={Styles.loading}>
            <span>Please Wait...</span>
            <Spinner isNegative />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
