import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../redux';
import { LoadsFiltersValues } from '../../utils/schemas/loadsFilters';

interface LoadsFiltersState {
  filters: LoadsFiltersValues[];
}

const initialState: LoadsFiltersState = {
  filters: [],
};

export const loadsFiltersSlice = createSlice({
  name: 'loadsFilters', //nazwa reducera
  initialState,
  reducers: {
    //akcje
    addFilter: (state, action: PayloadAction<LoadsFiltersValues>) => {
      state.filters = [...state.filters, action.payload];
    },
  },
});

export const { addFilter } = loadsFiltersSlice.actions;

export default loadsFiltersSlice.reducer;
