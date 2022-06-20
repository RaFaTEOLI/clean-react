import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import PrivateRoute from './private-route';
import { Router } from 'react-router-dom';

const Page: React.FC = () => {
  return <h1>Mock Page</h1>;
};

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(
      <Router navigator={history} location={history.location}>
        <PrivateRoute>
          <Page />
        </PrivateRoute>
      </Router>
    );
    expect(history.location.pathname).toBe('/login');
  });
});
