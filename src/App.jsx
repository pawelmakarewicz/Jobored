import { MantineProvider } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from 'react-router-dom';
import VacanciesPage from './components/VacanciesPage';
import FavouritesPage from './components/FavouritesPage';

import VacancyPage, { vacancyPageLoader } from './components/VacancyPage';

import HeaderSimple from './components/Header';

import setTheme from './myTheme';
import { getAccessToken } from './slices/accessTokenSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <VacanciesPage />,
  },
  {
    path: '/:vacancyId',
    element: <VacancyPage />,
    loader: vacancyPageLoader,
  },
  {
    path: '/favourites',
    element: <FavouritesPage />,
  }
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccessToken());
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={setTheme()}>
      <HeaderSimple />
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
