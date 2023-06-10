import { useEffect } from 'react';
import { Group, Center } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import VacanciesList from './VacanciesList';
import { loadFavouritesVacancies } from '../slices/vacanciesSlice';

const useFavouriteVacancies = () => {
  const dispatch = useDispatch();
  const accessTokenLoadingStatus = useSelector((state) => state.accessTokens.loadingStatus);
  const vacancies = useSelector((state) => state.vacancies.vacancies);

  useEffect(() => {
    if (accessTokenLoadingStatus === 'succeed') {
      dispatch(loadFavouritesVacancies());
    }
  }, [accessTokenLoadingStatus]);
};

function FavouritesPage() {
  useFavouriteVacancies();
  const vacancies = useSelector((state) => state.vacancies.vacancies);

  return (
    <Center>
      <Group maw={1115} align="top">
        <Group maw={770} align="top">
          <VacanciesList vacancies={vacancies} />
        </Group>
      </Group>
    </Center>
  );
}

export default FavouritesPage;
