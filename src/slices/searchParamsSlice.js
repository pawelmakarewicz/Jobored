import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paramsFilter: {
    paymentFrom: '',
    paymentTo: '',
    catalogues: '',
  },
  keyWordParams: '',
};

const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.paramsFilter = { ...state.paramsFilter, ...action.payload };
      console.log('setFilters', state.paramsFilter);
    },
  },
});

export const { setFilters } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
