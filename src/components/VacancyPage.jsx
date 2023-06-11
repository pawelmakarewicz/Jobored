import { useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Vacancy from './Vacancy';
import { loadVacancy } from '../slices/vacanciesSlice';

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
  const vacancyId = useLoaderData();
  useVacancy(vacancyId);
  const vacancyData = useSelector((state) => state.vacancies.currentVacancy);
  const description = useSelector((state) => state.vacancies.currentVacancyDescription);
  return (
    <div>
      {vacancyData ? <Vacancy vacancyData={vacancyData} /> : null}
      {description ? <div dangerouslySetInnerHTML={{ __html: description }} /> : null}
    </div>
  );
}
