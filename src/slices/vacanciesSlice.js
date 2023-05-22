/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import routes from '../api/routes';
import initSearchParams from '../api/queryParams/searchParameters';

const vacanciesAdapter = createEntityAdapter();

function calculateNoAgreement(paramsFilter) {
  return (paramsFilter.paymentFrom || paramsFilter.paymentTo) ? 1 : null;
}

export const getVacancies = createAsyncThunk(
  'vacancies/getVacancies',
  // eslint-disable-next-line default-param-last
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const { accessToken } = state.accessTokens;
    const { keyword, paramsFilter } = state.searchParams;
    const searchParams = initSearchParams({ keyword, ...paramsFilter, noAgreement: calculateNoAgreement(paramsFilter) });
    const authorization = {
      Authorization: `Bearer ${accessToken}`,
    };
    // eslint-disable-next-line max-len

    const response = await axiosInstance.get(routes.vacanciesPath(), { headers: authorization, params: { ...searchParams } });

    const { objects } = response.data;
    const payload = objects.map(({
      id, profession, payment_from, payment_to, type_of_work, address,
    }) => ({
      id, profession, payment_from, payment_to, type_of_work, address,
    }));
    return payload;
  },
);

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState: vacanciesAdapter.getInitialState({ loadingStatus: 'idle', error: null, favouriteVacancies: [] }),
  extraReducers: (builder) => {
    builder
      .addCase(getVacancies.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getVacancies.fulfilled, (state, action) => {
        vacanciesAdapter.setAll(state, action.payload);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(getVacancies.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export default vacanciesSlice.reducer;
