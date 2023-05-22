import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  List,
} from '@mantine/core';
import { getVacancies } from '../slices/vacanciesSlice';
import Vacancy from './Vacancy';

const useInitialVacancies = () => {
  const dispatch = useDispatch();
  const accessTokenLoadingStatus = useSelector((state) => state.accessTokens.loadingStatus);

  useEffect(() => {
    if (accessTokenLoadingStatus === 'succeed') {
      dispatch(getVacancies());
    }
  }, [accessTokenLoadingStatus]);
};

function VacanciesList() {
  useInitialVacancies();
  const vacanciesList = useSelector((state) => state.vacancies.entities);
  const vacancies = Object.entries(vacanciesList);
  return (
    <List>
      {vacancies.map(([id, data]) => (
        <List.Item key={id}><Vacancy vacancyData={data} /></List.Item>
      ))}
    </List>
  );
}

export default VacanciesList;
