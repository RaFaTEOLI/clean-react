import React, { useContext } from 'react';
import { SurveyContext } from '..';
import Styles from './error-styles.scss';

const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext);
  const reload = (): void => {
    setState({ surveys: [], error: '', reload: true });
  };
  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{state.error}</span>
      <button data-testid="reload" onClick={reload}>
        Try again
      </button>
    </div>
  );
};

export default Error;
