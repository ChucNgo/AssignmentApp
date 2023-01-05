import {
  getDefaultMiddleware,
  applyMiddleware,
  createStore,
  compose,
} from '@reduxjs/toolkit';
import reducer from './src/reducers';

const enhancers = [];

enhancers.push(applyMiddleware(...getDefaultMiddleware()));

const store = createStore(reducer, compose(...enhancers));

export default store;
