import React, { useContext, useRef } from 'react';
import FormContext from '@/presentation/contexts/form/form-context';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  name: string;
  placeholder?: string;
};

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext);
  const inputRef = useRef<HTMLInputElement>();
  const error = state[`${props.name}Error`];
  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };
  return (
    <div data-testid={`${props.name}-wrap`} data-status={error ? 'invalid' : 'valid'} className={Styles.inputWrap}>
      <input
        ref={inputRef}
        title={error}
        {...props}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={e => {
          e.target.readOnly = false;
        }}
        onChange={handleChange}
      />
      <label
        title={error}
        data-testid={`${props.name}-label`}
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;
