import React, { useContext } from 'react';
import Spinner from '../spinner/spinner';
import Styles from './form-status-styles.scss';
import FormContext from '@/presentation/contexts/form/form-context';

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(FormContext);
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && (
        <span data-testid="main-error" className={Styles.error}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormStatus;