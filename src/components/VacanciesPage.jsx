import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createStyles, Group, Loader, Container, Center, Pagination,
} from '@mantine/core';
import FormFilter from './FormFilter';
import VacanciesList from './VacanciesList';
import SearchInput from './SearchInput';
import { getVacancies } from '../slices/vacanciesSlice';

const useStyles = createStyles(() => ({
  flexContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'start',
    flexWrap: 'nowrap',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1115px',
    gap: '1.75rem',
  },
  flexItem: {
    maxWidth: '770px',
    margin: '0px',
    flexGrow: 1,
    padding: 0,
  },
}));

const useInitialVacancies = () => {
  const dispatch = useDispatch();
  const accessTokenLoadingStatus = useSelector((state) => state.accessTokens.loadingStatus);

  useEffect(() => {
    if (accessTokenLoadingStatus === 'succeed') {
      dispatch(getVacancies());
    }
  }, [accessTokenLoadingStatus]);
};

// function usePagination(vacanciesList){

// }

const ITEMS_PER_PAGE = 5;

function VacanciesPage() {
  useInitialVacancies();
  const vacanciesList = useSelector((state) => state.vacancies.vacancies);
  const vacanciesLoadingStatus = useSelector((state) => state.vacancies.loadingStatus);
  const { classes } = useStyles();
  const [activePage, setPage] = useState(1);

  const pageCount = Math.ceil(vacanciesList.length / ITEMS_PER_PAGE);
  const startItemNumber = (activePage - 1) * ITEMS_PER_PAGE;
  const endItemNumber = startItemNumber + ITEMS_PER_PAGE;
  const currentItems = vacanciesList.slice(startItemNumber, endItemNumber);

  return (
    <Group className={classes.flexContainer}>
      <FormFilter />
      <Container className={classes.flexItem}>
        <SearchInput />
        {vacanciesLoadingStatus === 'loaded' ? (
          <>
            <VacanciesList vacancies={currentItems} />
            <Center><Pagination value={activePage} onChange={setPage} total={pageCount} /></Center>
          </>
        ) : <Center><Loader variant="bars" size="xl" /></Center> }
      </Container>
    </Group>
  );
}

export default VacanciesPage;
