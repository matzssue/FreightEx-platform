import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import modalSlice from './reducers/modalSlice';
const reducer = combineReducers({
  modal: modalSlice,
});
export const store = configureStore({ reducer });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
