import { useEffect } from 'react';
import { Group, Center } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import FormFilter from './FormFilter';
import VacanciesList from './VacanciesList';
import SearchInput from './SearchInput';
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

  return vacancies;
};

function FavouritesPage() {
  const vacancies = useFavouriteVacancies();

  return (
    <Center>
      <Group maw={1115} align="top">
        <FormFilter />
        <Group maw={770} align="top">
          <SearchInput />
          <VacanciesList vacancies={vacancies} />
        </Group>
      </Group>
    </Center>
  );
}

export default FavouritesPage;
