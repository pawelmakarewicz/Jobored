import { Group, Center } from '@mantine/core';
import FormFilter from './FormFilter';
import VacanciesList from './VacanciesList';
import SearchInput from './SearchInput';

function VacanciesPage() {
  return (
    <Center>
      <Group maw={1115} align="top">
        <FormFilter />
        <Group maw={770} align="top">
          <SearchInput />
          <VacanciesList vacancies />
        </Group>
      </Group>
    </Center>
  );
}

export default VacanciesPage;
