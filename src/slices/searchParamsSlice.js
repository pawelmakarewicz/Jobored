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
      // eslint-disable-next-line no-param-reassign
      state.paramsFilter = { ...state.paramsFilter, ...action.payload };
    },
  },
});

export const { setFilters } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
