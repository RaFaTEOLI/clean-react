/* eslint-disable @typescript-eslint/no-explicit-any */
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/tests/domain/mocks';
import { currentAccountState } from '@/presentation/components';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { MemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { MutableSnapshot, RecoilRoot, RecoilState } from 'recoil';
import React from 'react';

type Params = {
  Page: React.FC;
  history: MemoryHistory;
  account?: AccountModel;
  legacyRoot?: boolean;
  useAct?: boolean;
  states?: Array<{ atom: RecoilState<any>; value: any }>;
};

type Result = {
  setCurrentAccountMock: (account: AccountModel) => void;
};

export const renderWithHistory = ({
  Page,
  useAct = false,
  history,
  legacyRoot = false,
  account = mockAccountModel(),
  states = []
}: Params): Result => {
  const setCurrentAccountMock = jest.fn();
  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account
  };

  const initializeState = ({ set }: MutableSnapshot): void => {
    [...states, { atom: currentAccountState, value: mockedState }].forEach(state => set(state.atom, state.value));
  };

  if (useAct) {
    act(() => {
      render(
        <RecoilRoot initializeState={initializeState}>
          <Router navigator={history} location={history.location}>
            <Page />
          </Router>
        </RecoilRoot>,
        { legacyRoot }
      );
    });
  } else {
    render(
      <RecoilRoot initializeState={initializeState}>
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
