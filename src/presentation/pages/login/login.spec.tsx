import React from 'react';
import { render } from '@testing-library/react';
import Login from './login';

describe('Login Component', () => {
  test('should render login without error wrap', () => {
    const { getByTestId } = render(<Login />);
    const erroWrap = getByTestId('error-wrap');
    expect(erroWrap.childElementCount).toBe(0);
  });
});
