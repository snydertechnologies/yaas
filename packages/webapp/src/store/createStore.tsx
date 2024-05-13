// @ts-nocheck
import monitorReducerEnhancer from '@bigcapital/webapp/store/enhancers/monitorReducer';
import loggerMiddleware from '@bigcapital/webapp/store/logger.middleware';
import rootReducer from '@bigcapital/webapp/store/reducers';
import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import ResetMiddleware from './ResetMiddleware';

const createStoreFactory = (initialState = {}) => {
  /**
  |--------------------------------------------------
  | Middleware Configuration
  |--------------------------------------------------
  */
  const middleware = [thunkMiddleware, loggerMiddleware];

  /**
  |--------------------------------------------------
  | Store Enhancers
  |--------------------------------------------------
  */
  const enhancers = [monitorReducerEnhancer, ResetMiddleware];
  let composeEnhancers = compose;

  if (import.meta.env.NODE_ENV === 'development') {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  /**
  |--------------------------------------------------
  | Store Instantiation and HMR Setup
  |--------------------------------------------------
  */
  const store = createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers),
  );
  store.asyncReducers = {};
  return store;
};

export const createStore = createStoreFactory;
export const store = createStoreFactory();
export const persistor = persistStore(store);
