/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import makeGetVacanciesRequest from '../api/makeVacanciesGetRequest';
import makeGetVacancyRequest from '../api/makeVacancyGetRequest';

const FAVOURITE_VACANCIES_KEY = 'favouriteVacancies';
const FAVOURITE_VACANCIES = 'favourite';
const VACANCIES_NUMBER = 80;

function convertKeyNames(response) {
  const {
    id,
    profession,
    payment_from,
    payment_to,
    type_of_work,
    address,
  } = response;
  return {
    id,
    profession,
    paymentFrom: Number(payment_from),
    paymentTo: Number(payment_to),
    typeOfWork: type_of_work,
    address,
  };
}

function isEmptyParams(params) {
  return !params.length;
}

export const getVacancies = createAsyncThunk(
  'vacancies/getVacancies',
  async (vacanciesType, thunkApi) => {
    const state = thunkApi.getState();
    const { accessToken } = state.accessTokens;
    const favouriteVacanciesIds = JSON.parse(localStorage.getItem(FAVOURITE_VACANCIES_KEY)) || [];
    let params;
    if (vacanciesType === FAVOURITE_VACANCIES) {
      if (isEmptyParams(favouriteVacanciesIds)) {
        return { vacanciesList: [], favouriteVacanciesIds };
      }
      params = { ids: favouriteVacanciesIds };
    } else {
      const { keyword, paramsFilter, noAgreement } = state.searchParams;
      params = {
        keyword, ...paramsFilter, noAgreement, count: VACANCIES_NUMBER,
      };
    }

    const response = await makeGetVacanciesRequest(params, accessToken);
    const vacanciesList = response.map(convertKeyNames);

    return { vacanciesList, favouriteVacanciesIds };
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

export const loadVacancy = createAsyncThunk(
  'vacancies/loadVacancy',
  async (vacancyId, thunkApi) => {
    const state = thunkApi.getState();
    const { accessToken } = state.accessTokens;
    // eslint-disable-next-line max-len
    const favouriteVacanciesIds = JSON.parse(localStorage.getItem(FAVOURITE_VACANCIES_KEY)) || [];

    const response = await makeGetVacancyRequest(vacancyId, accessToken);
    const vacancyData = convertKeyNames(response);
    return { vacancyData, favouriteVacanciesIds, description: response.vacancyRichText };
  },
);

const initialState = {
  loadingStatus: null,
  error: null,
  favouriteVacancies: [],
  vacancies: [],
  currentVacancy: null,
  currentVacancyDescription: null,
};

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    clearVacancies: (state) => {
      state.vacancies = [];
    },
    clearCurrentVacancy: (state) => {
      state.currentVacancy = null;
      state.currentVacancyDescription = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVacancies.pending, (state) => {
        state.vacancies = [];
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getVacancies.fulfilled, (state, action) => {
        state.favouriteVacancies = action.payload.favouriteVacanciesIds;
        state.vacancies = action.payload.vacanciesList;
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
      .addCase(loadVacancy.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(loadVacancy.fulfilled, (state, action) => {
        const { vacancyData, favouriteVacanciesIds, description } = action.payload;
        state.favouriteVacancies = favouriteVacanciesIds;
        state.currentVacancy = vacancyData;
        state.currentVacancyDescription = description;
        state.loadingStatus = 'loaded';
        state.error = null;
      })
      .addCase(loadVacancy.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { clearVacancies, clearCurrentVacancy } = vacanciesSlice.actions;
export default vacanciesSlice.reducer;
