import { useEffect } from 'react';
import { Group, Center } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import FormFilter from './FormFilter';
import VacanciesList from './VacanciesList';
import SearchInput from './SearchInput';
import { getVacancies} from '../slices/vacanciesSlice';

const useInitialVacancies = () => {
  const dispatch = useDispatch();
  const accessTokenLoadingStatus = useSelector((state) => state.accessTokens.loadingStatus);

  useEffect(() => {
    if (accessTokenLoadingStatus === 'succeed') {
      dispatch(getVacancies());
    }
  }, [accessTokenLoadingStatus]);
};

function VacanciesPage() {
  useInitialVacancies();

  const vacanciesList = useSelector((state) => state.vacancies.vacancies);

  return (
    <Center>
      <Group maw={1115} align="top">
        <FormFilter />
        <Group maw={770} align="top">
          <SearchInput />
          <VacanciesList vacancies={vacanciesList} />
        </Group>
      </Group>
    </Center>
  );
}

export default VacanciesPage;
