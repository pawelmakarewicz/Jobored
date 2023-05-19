
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

  const vacanciesAdapter = createEntityAdapter();

  const vacanciesSlice = createSlice({
    name: 'vacancies',
    initialState: vacanciesAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
    reducers: {
      addVacancy: vacanciesAdapter.addOne,
      removeVacancy: (state, { payload }) => {
        vacanciesAdapter.removeOne(state, payload);
      },
    },
  })

  export default vacanciesSlice.reducer