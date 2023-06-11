import {
  List,
} from '@mantine/core';

import Vacancy from './Vacancy';

function VacanciesList({ vacancies }) {
  return (
    <List>
      {vacancies.map((vacancy) => (
        <List.Item key={vacancy.id}><Vacancy vacancyData={vacancy} /></List.Item>
      ))}
    </List>
  );
}

export default VacanciesList;
