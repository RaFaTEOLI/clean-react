import React, { useContext } from 'react';
import { SurveyContext } from '..';
import Styles from './error-styles.scss';

const Error: React.FC = () => {
  const { state } = useContext(SurveyContext);
  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{state.error}</span>
      <button>Reload</button>
    </div>
  );
};

export default Error;
