import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ApiContext } from '@/presentation/contexts';
import Header from './header';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const history = createMemoryHistory({ initialEntries: ['/'] });

describe('Header Component', () => {
  test('should call setCurrentAccount with null value', () => {
    const setCurrentAccountMock = jest.fn();
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router navigator={history} location={history.location}>
          <Header />
        </Router>
      </ApiContext.Provider>
    );

    fireEvent.click(screen.getByTestId('logout'));
    expect(setCurrentAccountMock).toHaveBeenLastCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });
});
