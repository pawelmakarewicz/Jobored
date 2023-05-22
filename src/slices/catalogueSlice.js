/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../api/routes';
import axiosInstance from '../api/axiosInstance';

export const getCatalogues = createAsyncThunk(
  'catalogues/getBranches',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const { accessToken } = state.accessTokens;
    const authorization = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axiosInstance.get(routes.cataloguesPath(), { headers: authorization });
    console.log('responceDtata', response.data);

    const payload = response.data.map(({
      // eslint-disable-next-line camelcase
      title_trimmed, key,
    }) => ({
      // eslint-disable-next-line camelcase
      titleTrimmed: title_trimmed, key,
    }));
    return payload;
  },
);

const initialState = { cataloguesData: null, loadingStatus: 'idle', error: null };

const catalogueSlice = createSlice({
  name: 'catalogues',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCatalogues.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getCatalogues.fulfilled, (state, action) => {
        state.cataloguesData = action.payload;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(getCatalogues.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export default catalogueSlice.reducer;
