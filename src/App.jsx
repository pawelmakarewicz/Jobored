import FormFilter from './components/FormFilter';
import HeaderSimple from './components/Header';
import { useEffect } from 'react';
import setTheme from './myTheme.js';
import { MantineProvider } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { getAccessToken } from './slices/accessTokenSlice'




function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccessToken())
  },);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={setTheme()}>
        <HeaderSimple/>
        <FormFilter/>
    </MantineProvider>
  );
}

export default App;

