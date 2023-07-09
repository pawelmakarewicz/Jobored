import { MantineProvider } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import Root from './components/Root';

import VacanciesPage from './components/VacanciesPage';
import FavouritesPage from './components/FavouritesPage';

import VacancyPage, { vacancyPageLoader } from './components/VacancyPage';

import setTheme from './myTheme';
import { getAccessToken } from './slices/accessTokenSlice';

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
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
      },
    ],
  },

]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccessToken());
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={setTheme()}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
