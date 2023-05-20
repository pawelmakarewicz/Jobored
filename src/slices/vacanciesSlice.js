import axiosInstance from '../api/axiosInstance';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../api/routes';
import initSearchParams from '../api/queryParams/searchParameters';



  const vacanciesAdapter = createEntityAdapter();
  const initialSearchParams = initSearchParams()

  export const getVacancies = createAsyncThunk(
    'vacancies/getVacancies',
    async (searchParams = initialSearchParams, thunkApi) => {
      const state = thunkApi.getState();
      const accessToken = state.accessTokens.accessToken

      const authorization = {
        'Authorization': `Bearer ${accessToken}`,
      }
      const response = await axiosInstance.get(routes.vacanciesPath(),{ headers: authorization, params : {...searchParams}})

      console.log('response', response);

      return
    },
  );

  const vacanciesSlice = createSlice({
    name: 'vacancies',
    initialState: vacanciesAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
    extraReducers: (builder) => {
      builder
        .addCase(getVacancies.pending, (state) => {
          state.loadingStatus = 'loading';
          state.error = null;
        })
        .addCase(getVacancies.fulfilled, (state, action) => {
          state.loadingStatus = 'idle';
          state.error = null;
        })
        .addCase(getVacancies.rejected, (state, action) => {
          state.loadingStatus = 'failed';
          state.error = action.error;
        });
    },
  })

  export default vacanciesSlice.reducer