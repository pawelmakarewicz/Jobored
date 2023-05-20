import FormFilter from './components/FormFilter';
import HeaderSimple from './components/Header';
import VacanciesList from './components/VacanciesList';
import { useEffect, useState } from 'react';
import setTheme from './myTheme.js';
import { MantineProvider } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from './slices/accessTokenSlice'
import { getVacancies } from './slices/vacanciesSlice'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccessToken());
  }, []);
  

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={setTheme()}>
        <HeaderSimple/>
        <FormFilter/>

        <VacanciesList />
    </MantineProvider>
  );
}

export default App;

