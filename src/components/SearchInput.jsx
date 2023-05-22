import { TextInput, Group, Button } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { getVacancies } from '../slices/vacanciesSlice';
import { setKeyWord } from '../slices/searchParamsSlice';

export default function SearchInput() {
  const dispatch = useDispatch();
  const filterData = useSelector((state) => state.searchParams.keyword);
  return (
    <form onSubmit={((e) => {
      e.preventDefault();
      dispatch(getVacancies());
      dispatch((setKeyWord('')));
    })}
    >
      <Group position="center" mt="md">
        <TextInput placeholder="Введите название вакансии" value={filterData} onChange={(e) => { dispatch(setKeyWord(e.currentTarget.value)); }} variant="unstyled" />
        <Button type="submit">Применить</Button>
      </Group>
    </form>
  );
}
