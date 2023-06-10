/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import makeGetVacanciesRequest from '../api/makeVacanciesGetRequest';

function extractDataForVacanciesList(data) {
  return data.map(({
    id, profession, payment_from, payment_to, type_of_work, address,
  }) => ({
    id,
    profession,
    paymentFrom: Number(payment_from),
    paymentTo: Number(payment_to),
    typeOfWork: type_of_work,
    address,
  }));
}

export const getVacancies = createAsyncThunk(
  'vacancies/getVacancies',
  async (favouriteVacanciesIds, thunkApi) => {
    const state = thunkApi.getState();
    const { accessToken } = state.accessTokens;
    const { keyword, paramsFilter, noAgreement } = favouriteVacanciesIds || state.searchParams;

    const params = { keyword, ...paramsFilter, noAgreement };

    const response = await makeGetVacanciesRequest(params, accessToken);

    return extractDataForVacanciesList(response);
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
  async (vacancyId, thunkApi) => {
    const state = thunkApi.getState();
    const { favouriteVacancies } = state.vacancies;

    const nextVacancies = isVacancySaved(vacancyId, favouriteVacancies)
      ? unsaveVacancy(vacancyId, favouriteVacancies)
      : saveVacancy(vacancyId, favouriteVacancies);

    localStorage.setItem(FAVOURITE_VACANCIES_KEY, JSON.stringify(nextVacancies));

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
    thunkApi.dispatch(getVacancies({ ids: existingVacancies.map((x) => x.id) }));

    return existingVacancies;
  },
);

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState: {
    loadingStatus: null, error: null, favouriteVacancies: [], vacancies: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVacancies.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getVacancies.fulfilled, (state, action) => {
        state.vacancies = action.payload;
        state.loadingStatus = 'loaded';
        state.error = null;
      })
      .addCase(getVacancies.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
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
