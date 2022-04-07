import React, { useContext } from 'react';
import Spinner from '../spinner/spinner';
import Styles from './form-status-styles.scss';
import FormContext from '@/presentation/contexts/form/form-context';

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(FormContext);
  const { isLoading } = state;
  const { main } = errorState;
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {main && (
        <span data-testid="main-error" className={Styles.error}>
          {main}
        </span>
      )}
    </div>
  );
};

export default FormStatus;
