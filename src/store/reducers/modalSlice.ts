import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../redux';

interface CounterState {
  isLoadModalOpen: boolean;
  isLoadDialogOpen: boolean;
}

const initialState: CounterState = {
  isLoadModalOpen: false,
  isLoadDialogOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal', //nazwa reducera
  initialState,
  reducers: {
    //akcje
    openModal: (state) => {
      state.isLoadModalOpen = true;
    },
    closeModal: (state) => {
      state.isLoadDialogOpen = false;
      state.isLoadModalOpen = false;
    },
    openDialog: (state) => {
      state.isLoadDialogOpen = true;
    },
    closeDialog: (state) => {
      state.isLoadDialogOpen = false;
    },
  },
});

export const { openModal, closeModal, openDialog, closeDialog } = modalSlice.actions;

export default modalSlice.reducer;
