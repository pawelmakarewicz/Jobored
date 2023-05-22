import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
  paramsFilter: {
    paymentFrom: '',
    paymentTo: '',
    catalogue: '',
  },
};

const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.paramsFilter = { ...state.paramsFilter, ...action.payload };
    },
    setKeyWord: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.keyword = action.payload;
    },
  },
});

export const { setFilters, setKeyWord } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
