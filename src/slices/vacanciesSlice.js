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
  async (sp, thunkApi) => {
    const state = thunkApi.getState();
    const { accessToken } = state.accessTokens;
    const { keyword, paramsFilter } = sp || state.searchParams;

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

function isVacancySaved(id, ids) {
  return ids.includes(id);
}

function saveVacancy(id, ids) {
  return [...ids, id];
}

function unsaveVacancy(id, ids) {
  return ids.filter((x) => x !== id);
}

const FAVOURITE_VACANCIES_KEY = 'favouriteVacancies';

export const toggleSaveVacancy = createAsyncThunk(
  'vacancies/toggleSaveVacancy',
  async ({ vacancyId, refetchFavouteVacancies = false }, thunkApi) => {
    const state = thunkApi.getState();
    const { favouriteVacancies } = state.vacancies;

    const nextVacancies = isVacancySaved(vacancyId, favouriteVacancies)
      ? unsaveVacancy(vacancyId, favouriteVacancies)
      : saveVacancy(vacancyId, favouriteVacancies);

    localStorage.setItem(FAVOURITE_VACANCIES_KEY, JSON.stringify(nextVacancies));

    if (refetchFavouteVacancies) {
      thunkApi.dispatch(getVacancies({ ids: nextVacancies.map(({id}) => id) }));
    }

    return nextVacancies;
  },
);

export const loadFavouritesList = createAsyncThunk(
  'vacancies/loadFavouritesList',
  async () => {
    const existingVacancies = JSON.parse(localStorage.getItem(FAVOURITE_VACANCIES_KEY)) || [];

    return existingVacancies;
  },
);

export const loadFavouritesVacancies = createAsyncThunk(
  'vacancies/loadFavouritesVacancies',
  async (_, thunkApi) => {
    const existingVacancies = JSON.parse(localStorage.getItem(FAVOURITE_VACANCIES_KEY)) || [];

    thunkApi.dispatch(getVacancies({ ids: existingVacancies.map(x => x.id) }));

    return existingVacancies;
  },
);

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState: { loadingStatus: 'idle', error: null, favouriteVacancies: [], vacancies: [] },
  extraReducers: (builder) => {
    builder
      .addCase(getVacancies.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getVacancies.fulfilled, (state, action) => {
        state.vacancies = action.payload;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(getVacancies.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });

    builder
      .addCase(toggleSaveVacancy.fulfilled, (state, action) => {
        state.favouriteVacancies = action.payload;
      })
      .addCase(loadFavouritesList.fulfilled, (state, action) => {
        state.favouriteVacancies = action.payload;
      })
      .addCase(loadFavouritesVacancies.fulfilled, (state, action) => {
        state.favouriteVacancies = action.payload;
      });
  },
});

export default vacanciesSlice.reducer;
