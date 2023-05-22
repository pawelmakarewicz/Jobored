import { useLoaderData } from 'react-router-dom';

export async function vacancyPageLoader({ params }) {
  return params.vacancyId;
}

export default function VacancyPage() {
  const vacancyId = useLoaderData();

  return <div>TODO: add</div>;
}
