import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux'
import configureStore, { MockStore, MockStoreCreator } from 'redux-mock-store';
import * as Redux from 'redux';

function loggingMiddleware() {
  return (next: Redux.Dispatch<Redux.AnyAction>) => (action: any) => {
    console.log(action.type);
    return next(action);
  };
}

const initialState = 0;
const mockStoreCreator: MockStoreCreator<number> = configureStore<number>([loggingMiddleware]);
const store: MockStore<number> = mockStoreCreator(initialState);

test('renders learn react link', () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>)
  console.log(getByText)
});
