'use client';

import React, { FC, createContext, useReducer, ReactNode } from 'react';

interface StateData {
  account: account;
  web3Provider: any | undefined;
  rpcProvider: any | undefined;
  activeButton: string;
}

const typeStateMap = {
  SET_ACCOUNT: 'account',
  SET_WEB3_PROVIDER: 'web3Provider',
  SET_RPC_PROVIDER: 'rpcProvider',
  SET_ACTIVE_BUTTON: 'activeButton',
};

const initialState: StateData = {
  account: undefined,
  web3Provider: undefined,
  rpcProvider: undefined,
  activeButton: 'Home',
};

const reducer = (state: StateData, action: { type: keyof typeof typeStateMap; payload: any }) => {
  const stateName = typeStateMap[action.type];
  if (!stateName) {
    console.warn(`Unknown action type: ${action.type}`);
    return state;
  }
  return { ...state, [stateName]: action.payload };
};

const StateContext = createContext(initialState);
const DispatchContext = createContext<any>(null);

const StateProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export { typeStateMap, StateContext, DispatchContext, StateProvider };
