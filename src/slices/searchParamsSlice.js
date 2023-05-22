import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getVacancies } from './vacanciesSlice';

const initialState = {
  params: {
    paymentFrom: '',
    paymentTo: '',
    catalogues: '',
    search: '',
  },
};

const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.params = { ...state.params, ...action.payload };
    },
  },
});

export const { setFilters } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
