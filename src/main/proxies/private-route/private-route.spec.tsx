import React from 'react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { PrivateRoute } from '@/main/proxies';
import { mockAccountModel } from '@/domain/test';
import { renderWithHistory } from '@/presentation/test';

const Page: React.FC = () => {
  return <h1>Mock Page</h1>;
};

type SutTypes = {
  history: MemoryHistory;
};

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  renderWithHistory({
    history,
    Page: () => (
      <PrivateRoute>
        <Page />
      </PrivateRoute>
    ),
    account
  });
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
