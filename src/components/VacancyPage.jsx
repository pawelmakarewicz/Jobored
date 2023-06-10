import { useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Vacancy from './Vacancy';
import { loadVacancy } from '../slices/vacanciesSlice';

export async function vacancyPageLoader({ params }) {
  return params.vacancyId;
}

const useVacancy = (id) => {
  const dispatch = useDispatch();
  const accessTokenLoadingStatus = useSelector((state) => state.accessTokens.loadingStatus);

  useEffect(() => {
    if (accessTokenLoadingStatus === 'succeed') {
      // dispatch(loadVacancy(id));
    }
  }, [accessTokenLoadingStatus]);
};

export default function VacancyPage() {
  const vacancyId = useLoaderData();
  useVacancy(vacancyId);
  const vacancyData = useSelector((state) => state.vacancies);
  return (
    <div>
      {JSON.stringify(vacancyData)}
    </div>
  );
}
