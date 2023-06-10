/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
  paramsFilter: {
    paymentFrom: '',
    paymentTo: '',
    catalogue: '',
  },
  noAgreement: null,
};

function calculateNoAgreement(paramsFilter) {
  return (paramsFilter.paymentFrom || paramsFilter.paymentTo) ? 1 : null;
}

const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.paramsFilter = { ...state.paramsFilter, ...action.payload };
      state.noAgreement = calculateNoAgreement(action.payload);
    },
    setKeyWord: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const { setFilters, setKeyWord } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
