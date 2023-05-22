import { configureStore } from '@reduxjs/toolkit';
import vacanciesReducer from './vacanciesSlice';
import accessTokenReducer from './accessTokenSlice';
import searchParamsSlice from './searchParamsSlice';

export default configureStore({
  reducer: {
    accessTokens: accessTokenReducer,
    vacancies: vacanciesReducer,
    searchParams: searchParamsSlice,
  },
});
