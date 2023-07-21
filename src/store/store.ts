import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import modalSlice from './reducers/modalSlice';
import loadsFiltersSlice from './reducers/loadsFiltersSlice';
import registerUserSlice from './reducers/registerUserSlice';
const reducer = combineReducers({
  modal: modalSlice,
  loadsFilters: loadsFiltersSlice,
  register: registerUserSlice,
});
export const store = configureStore({ reducer });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
