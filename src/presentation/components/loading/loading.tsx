import React from 'react';
import Spinner from '../spinner/spinner';
import Styles from './loading-styles.scss';

const Loading: React.FC = () => (
  <div data-testid="loading" className={Styles.loadingWrap}>
    <div className={Styles.loading}>
      <span>Please Wait...</span>
      <Spinner isNegative />
    </div>
  </div>
);

export default Loading;
