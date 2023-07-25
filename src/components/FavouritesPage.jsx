import { useEffect } from 'react';
import {
  Center, Loader, Image, Text, Flex, Button,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import VacanciesList from './VacanciesList';
import { loadFavouritesVacancies } from '../slices/vacanciesSlice';

const useFavouriteVacancies = () => {
  const dispatch = useDispatch();
  const accessTokenLoadingStatus = useSelector((state) => state.accessTokens.loadingStatus);
  useEffect(() => {
    if (accessTokenLoadingStatus === 'succeed') {
      dispatch(loadFavouritesVacancies());
    }
  }, [accessTokenLoadingStatus]);
};

function isEmpty(list) {
  return !list.length;
}

function showVacanciesList(vacancies) {
  if (isEmpty(vacancies)) {
    return (
      <Flex mx="auto" maw={770} direction="column" align="center">
        <Image maw={300} mb="1rem" src="/emptyState.svg" alt="emptyState" />
        <Text mb="1rem" fz="1.5rem">Oops, there is nothing here yet!</Text>
        <Button component={Link} to="/">
          <Text fz="xl">Search for jobs</Text>
        </Button>
      </Flex>
    );
  }
  return <VacanciesList vacancies={vacancies} />;
}

function FavouritesPage() {
  useFavouriteVacancies();
  const vacancies = useSelector((state) => state.vacancies.vacancies);
  const vacanciesLoadingStatus = useSelector((state) => state.vacancies.loadingStatus);
  return (
    vacanciesLoadingStatus === 'loaded' ? (
      showVacanciesList(vacancies)
    ) : (
      <Center>
        <Loader variant="bars" size="xl" />
      </Center>
    )
  );
}

export default FavouritesPage;
