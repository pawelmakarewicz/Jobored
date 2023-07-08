import { useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  createStyles, TypographyStylesProvider, Center, Loader,
} from '@mantine/core';
import Vacancy from './Vacancy';
import { loadVacancy } from '../slices/vacanciesSlice';

const useStyles = createStyles((theme) => ({
  wrapper: {
    background: 'white',
    width: '100%',
    marginBottom: '1rem',
    padding: '1.5rem',
    borderRadius: theme.radius.md,
    border: '0.0625rem solid #ced4da',
    maxWidth: '770px',
    margin: 'auto',
  },
}));

export async function vacancyPageLoader({ params }) {
  return Number(params.vacancyId);
}

const useVacancy = (id) => {
  const dispatch = useDispatch();
  const accessTokenLoadingStatus = useSelector((state) => state.accessTokens.loadingStatus);

  useEffect(() => {
    if (accessTokenLoadingStatus === 'succeed') {
      dispatch(loadVacancy(id));
    }
  }, [accessTokenLoadingStatus]);
};

export default function VacancyPage() {
  const { classes } = useStyles();
  const vacancyId = useLoaderData();
  useVacancy(vacancyId);
  const vacancyData = useSelector((state) => state.vacancies.currentVacancy);
  const description = useSelector((state) => state.vacancies.currentVacancyDescription);
  const vacanciesLoadingStatus = useSelector((state) => state.vacancies.loadingStatus);

  return (
    vacanciesLoadingStatus === 'loaded' ? (
      <>
        {vacancyData ? <Vacancy vacancyData={vacancyData} /> : null}
        {description ? (
          <TypographyStylesProvider className={classes.wrapper}>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </TypographyStylesProvider>
        ) : null}
      </>
    ) : (
      <Center>
        <Loader variant="bars" size="xl" />
      </Center>
    )
  );
}
