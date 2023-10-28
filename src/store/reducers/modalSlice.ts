import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  isLoadDialogOpen: boolean;
  isLoadModalOpen: boolean;
}

const initialState: CounterState = {
  isLoadModalOpen: false,
  isLoadDialogOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
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
