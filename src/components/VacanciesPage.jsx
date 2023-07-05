import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createStyles, Group, Loader, Container, Center,
} from '@mantine/core';
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

const useStyles = createStyles(() => ({
  flexContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'start',
    flexWrap: 'nowrap',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1115px',
  },
  flexItem: {
    maxWidth: '770px',
    margin: '0px',
    flexGrow: 1,
  },
}));

function VacanciesPage() {
  useInitialVacancies();

  const vacanciesList = useSelector((state) => state.vacancies.vacancies);
  const vacanciesLoadingStatus = useSelector((state) => state.vacancies.loadingStatus);
  const { classes } = useStyles();
  return (
    <Group className={classes.flexContainer}>
      <FormFilter />
      <Container className={classes.flexItem}>
        <SearchInput />
        {vacanciesLoadingStatus === 'loaded' ? <VacanciesList vacancies={vacanciesList} /> : <Center><Loader variant="bars" size="xl" /></Center> }
      </Container>
    </Group>
  );
}

export default VacanciesPage;
