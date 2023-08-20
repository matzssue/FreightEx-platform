import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// import { LoadsFiltersValues } from '../../utils/schemas/loadsFilters';

import { Addresses } from '../../utils/api/supabase/types';

export type LoadsFilters = {
  loadingAddress: string;
  unloadingAddress?: string | null | undefined;
  loadingAddressData: Addresses;
  unloadingAddressData: { country?: string | undefined };
  startLoadingDate: string | null;
  endLoadingDate: string | null;
  startUnloadingDate: string | null;
  endUnloadingDate: string | null;
  minWeight?: number | null | undefined;
  maxWeight?: number | null | undefined;
  minLength?: number | null | undefined;
  maxLength?: number | null | undefined;
  loadingArea: number;
  unloadingArea?: number | null | undefined;
  id: string;
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
  },
});

export const { addFilter } = loadsFiltersSlice.actions;

export default loadsFiltersSlice.reducer;
