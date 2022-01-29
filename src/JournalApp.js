import React from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';

// the Provider higher-order component will use the store containing all 
// the redux logic
export const JournalApp = () => {
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  )
};
