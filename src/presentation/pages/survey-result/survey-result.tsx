import React from 'react';
import { Calendar, Footer, Header, Loading } from '@/presentation/components';
import Styles from './survey-result-styles.scss';

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {false && (
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>Qual é seu framework web favorito? Qual é seu framework web favorito?</h2>
            </hgroup>
            <ul>
              <li>
                <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li className={Styles.active}>
                <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li>
                <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </ul>
            <button>Voltar</button>
          </>
        )}
        {false && <Loading />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
