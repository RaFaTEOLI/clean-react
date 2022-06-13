import { Footer, Logo } from '@/presentation/components';
import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './survey-list-styles.scss';

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logoutWrap}>
            <span>Rafael</span>
            <Link to="/">Sair</Link>
          </div>
        </div>
      </header>
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <div className={[Styles.iconWrap, Styles.green].join(' ')}>
                <img className={Styles.icon} src="/assets/icon-thumb-up.png" />
              </div>
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>03</span>
                <span className={Styles.year}>2020</span>
              </time>
              <p>What is your favorite web framework?</p>
            </div>
            <footer>Check Results</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <div className={[Styles.iconWrap, Styles.green].join(' ')}>
                <img className={Styles.icon} src="/assets/icon-thumb-up.png" />
              </div>
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>03</span>
                <span className={Styles.year}>2020</span>
              </time>
              <p>What is your favorite web framework?</p>
            </div>
            <footer>Check Results</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <div className={[Styles.iconWrap, Styles.green].join(' ')}>
                <img className={Styles.icon} src="/assets/icon-thumb-up.png" />
              </div>
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>03</span>
                <span className={Styles.year}>2020</span>
              </time>
              <p>What is your favorite web framework?</p>
            </div>
            <footer>Check Results</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <div className={[Styles.iconWrap, Styles.green].join(' ')}>
                <img className={Styles.icon} src="/assets/icon-thumb-up.png" />
              </div>
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>03</span>
                <span className={Styles.year}>2020</span>
              </time>
              <p>What is your favorite web framework?</p>
            </div>
            <footer>Check Results</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <div className={[Styles.iconWrap, Styles.green].join(' ')}>
                <img className={Styles.icon} src="/assets/icon-thumb-up.png" />
              </div>
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>03</span>
                <span className={Styles.year}>2020</span>
              </time>
              <p>What is your favorite web framework?</p>
            </div>
            <footer>Check Results</footer>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
