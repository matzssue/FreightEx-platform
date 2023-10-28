import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import loadsFiltersSlice from './reducers/loadsFiltersSlice';
import modalSlice from './reducers/modalSlice';

const reducer = combineReducers({
  modal: modalSlice,
  loadsFilters: loadsFiltersSlice,
});
export const store = configureStore({ reducer });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
