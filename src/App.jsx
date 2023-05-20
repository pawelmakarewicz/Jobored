import FormFilter from './components/FormFilter';
import HeaderSimple from './components/Header';
import VacanciesList from './components/VacanciesList';
import setTheme from './myTheme.js';
import { MantineProvider } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { getAccessToken } from './slices/accessTokenSlice'
import { useEffect } from 'react';

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

