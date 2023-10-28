import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// import { LoadsFiltersValues } from '../../utils/schemas/loadsFilters';
import { Addresses } from '../../utils/api/supabase/types';

export type LoadsFilters = {
  endLoadingDate: string | null;
  endUnloadingDate: string | null;
  id: string;
  loadingAddress: string;
  loadingAddressData: Addresses;
  loadingArea: number;
  maxLength?: number | null | undefined;
  maxWeight?: number | null | undefined;
  minLength?: number | null | undefined;
  minWeight?: number | null | undefined;
  startLoadingDate: string | null;
  startUnloadingDate: string | null;
  unloadingAddress?: string | null | undefined;
  unloadingAddressData: { country?: string | undefined };
  unloadingArea?: number | null | undefined;
};

type LoadsFiltersState = {
  filters: LoadsFilters[];
};

const initialState: LoadsFiltersState = {
  filters: [],
};

export const loadsFiltersSlice = createSlice({
  name: 'loadsFilters',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<LoadsFilters>) => {
      state.filters = [...state.filters, action.payload];
    },
    removeFilter: (state, action) => {
      state.filters = state.filters.filter((filter) => filter.id !== action.payload);
    },
  },
});

export const { addFilter, removeFilter } = loadsFiltersSlice.actions;

export default loadsFiltersSlice.reducer;
