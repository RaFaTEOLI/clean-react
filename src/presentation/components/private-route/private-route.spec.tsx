import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { ApiContext } from '@/presentation/contexts';
import PrivateRoute from './private-route';
import { Router } from 'react-router-dom';
import { mockAccountModel } from '@/domain/test';

const Page: React.FC = () => {
  return <h1>Mock Page</h1>;
};

type SutTypes = {
  history: MemoryHistory;
};

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router navigator={history} location={history.location}>
        <PrivateRoute>
          <Page />
        </PrivateRoute>
      </Router>
    </ApiContext.Provider>
  );
  return { history };
};

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const { history } = makeSut(null);
    expect(history.location.pathname).toBe('/login');
  });

  test('should render current component if token is not empty', () => {
    const { history } = makeSut();
    expect(history.location.pathname).toBe('/');
  });
});
