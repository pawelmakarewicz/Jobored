/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import makeGetVacanciesRequest from '../api/makeVacanciesGetRequest';

const FAVOURITE_VACANCIES_KEY = 'favouriteVacancies';
const FAVOURITE_VACANCIES = 'favourite';

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
  async (vacanciesType, thunkApi) => {
    const state = thunkApi.getState();
    const { accessToken } = state.accessTokens;
    // eslint-disable-next-line max-len
    const existingFavouriteVacanciesIds = JSON.parse(localStorage.getItem(FAVOURITE_VACANCIES_KEY)) || [];
    let params;
    if (vacanciesType === FAVOURITE_VACANCIES) {
      if (!existingFavouriteVacanciesIds.length) {
        return { vacanciesList: [], existingFavouriteVacanciesIds };
      }
      params = { ids: existingFavouriteVacanciesIds };
    } else {
      const { keyword, paramsFilter, noAgreement } = state.searchParams;
      params = { keyword, ...paramsFilter, noAgreement };
    }

    const response = await makeGetVacanciesRequest(params, accessToken);
    const vacanciesList = extractDataForVacanciesList(response);

    return { vacanciesList, existingFavouriteVacanciesIds };
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

export const loadFavouritesVacancies = createAsyncThunk(
  'vacancies/loadFavouritesVacancies',
  async (_, thunkApi) => {
    thunkApi.dispatch(getVacancies(FAVOURITE_VACANCIES));
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
        state.vacancies = action.payload.vacanciesList;
        state.favouriteVacancies = action.payload.existingFavouriteVacanciesIds;
        state.loadingStatus = 'loaded';
        state.error = null;
      })
      .addCase(getVacancies.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(toggleSaveVacancy.fulfilled, (state, action) => {
        state.favouriteVacancies = action.payload;
      });
  },
});

export default vacanciesSlice.reducer;
