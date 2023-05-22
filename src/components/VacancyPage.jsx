import { useLoaderData } from 'react-router-dom';

export async function vacancyPageLoader({ params }) {
  return params.vacancyId;
}

export default function VacancyPage() {
  const vacancyId = useLoaderData();
  console.log('VacancyPage props', vacancyId);

  return <div>TODO: add</div>;
}
