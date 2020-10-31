import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import patientsReducer from './store/reducers/patient';
// import logInSignUpReducer from './store/reducers/logInSignUp';
import Navigator from './navigation/Navigator';

const rootReducer = combineReducers({
  patients: patientsReducer,

});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    // Store prop set to store constant
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
