import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import PrivateRoute from './private-route';
import { Router } from 'react-router-dom';

const Page: React.FC = () => {
  return <h1>Mock Page</h1>;
};

type SutTypes = {
  history: MemoryHistory;
};

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <Router navigator={history} location={history.location}>
      <PrivateRoute>
        <Page />
      </PrivateRoute>
    </Router>
  );
  return { history };
};

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const { history } = makeSut();
    expect(history.location.pathname).toBe('/login');
  });
});
