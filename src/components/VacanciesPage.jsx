import FormFilter from './FormFilter';
import VacanciesList from './VacanciesList';
import SearchInput from './SearchInput';

function VacanciesPage() {
  return (
    <>
      <FormFilter />
      <SearchInput />
      <VacanciesList />
    </>
  );
}

export default VacanciesPage;
