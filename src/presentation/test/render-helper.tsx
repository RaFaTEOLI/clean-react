import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';
import { currentAccountState } from '@/presentation/components';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { MemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import React from 'react';

type Params = {
  Page: React.FC;
  history: MemoryHistory;
  account?: AccountModel;
  legacyRoot?: boolean;
  useAct?: boolean;
};

type Result = {
  setCurrentAccountMock: (account: AccountModel) => void;
};

export const renderWithHistory = ({
  Page,
  useAct = false,
  history,
  legacyRoot = false,
  account = mockAccountModel()
}: Params): Result => {
  const setCurrentAccountMock = jest.fn();
  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account
  };
  if (useAct) {
    act(() => {
      render(
        <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
          <Router navigator={history} location={history.location}>
            <Page />
          </Router>
        </RecoilRoot>,
        { legacyRoot }
      );
    });
  } else {
    render(
      <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
        <Router navigator={history} location={history.location}>
          <Page />
        </Router>
      </RecoilRoot>,
      { legacyRoot }
    );
  }

  return {
    setCurrentAccountMock
  };
};
