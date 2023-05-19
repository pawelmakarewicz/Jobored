import { configureStore } from '@reduxjs/toolkit';
import vacanciesReducer from './vacanciesSlice'
import accessTokenReducer from './accessTokenSlice'

export default configureStore({
  reducer: {
    vacancies: vacanciesReducer,
    accessTokens: accessTokenReducer
  },
});