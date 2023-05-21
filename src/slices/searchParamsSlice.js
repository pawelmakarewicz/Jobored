import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setSearchParams: (state, { payload }) => {
        
    },
  },
});

export const { setSearchParams } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
