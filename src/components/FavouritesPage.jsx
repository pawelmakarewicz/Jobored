import { useEffect } from 'react';
import { Group } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import VacanciesList from './VacanciesList';
import { loadFavouritesVacancies, clearVacancies } from '../slices/vacanciesSlice';

const useFavouriteVacancies = () => {
  const dispatch = useDispatch();
  const accessTokenLoadingStatus = useSelector((state) => state.accessTokens.loadingStatus);
  useEffect(() => {
    if (accessTokenLoadingStatus === 'succeed') {
      dispatch(loadFavouritesVacancies());
    }
    return () => dispatch(clearVacancies());
  }, [accessTokenLoadingStatus]);
};

function FavouritesPage() {
  useFavouriteVacancies();
  const vacancies = useSelector((state) => state.vacancies.vacancies);

  return (
    <Group maw={770} align="top" mx="auto">
      <VacanciesList vacancies={vacancies} />
    </Group>
  );
}

export default FavouritesPage;
