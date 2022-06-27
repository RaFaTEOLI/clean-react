import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ApiContext } from '@/presentation/contexts';
import Header from './header';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AccountModel } from '@/domain/models';

type SutTypes = {
  history: MemoryHistory;
  setCurrentAccountMock: (account: AccountModel) => void;
};

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router navigator={history} location={history.location}>
        <Header />
      </Router>
    </ApiContext.Provider>
  );
  return {
    history,
    setCurrentAccountMock
  };
};

describe('Header Component', () => {
  test('should call setCurrentAccount with null value', () => {
    const { history, setCurrentAccountMock } = makeSut();

    fireEvent.click(screen.getByTestId('logout'));
    expect(setCurrentAccountMock).toHaveBeenLastCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });
});
