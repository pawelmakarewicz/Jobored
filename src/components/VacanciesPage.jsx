import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Group, Loader, Container } from '@mantine/core';
import FormFilter from './FormFilter';
import VacanciesList from './VacanciesList';
import SearchInput from './SearchInput';
import { getVacancies, clearVacancies } from '../slices/vacanciesSlice';

const useInitialVacancies = () => {
  const dispatch = useDispatch();
  const accessTokenLoadingStatus = useSelector((state) => state.accessTokens.loadingStatus);

  useEffect(() => {
    if (accessTokenLoadingStatus === 'succeed') {
      dispatch(getVacancies());
    }
    return () => dispatch(clearVacancies());
  }, [accessTokenLoadingStatus]);
};

function VacanciesPage() {
  useInitialVacancies();

  const vacanciesList = useSelector((state) => state.vacancies.vacancies);
  const vacanciesLoadingStatus = useSelector((state) => state.vacancies.loadingStatus);
  return (
    <Group maw={1115} align="top" mx="auto" position="left">
      <FormFilter />
      <Container maw={770} align="top" m={0}>
        <SearchInput />
        {vacanciesLoadingStatus === 'loaded' ? <VacanciesList vacancies={vacanciesList} /> : <Loader size="xl" /> }
      </Container>
    </Group>
  );
}

export default VacanciesPage;
