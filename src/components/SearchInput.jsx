import {
  TextInput, Button, Container,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { IconSearch } from '@tabler/icons-react';
import { getVacancies } from '../slices/vacanciesSlice';
import { setKeyWord } from '../slices/searchParamsSlice';

export default function SearchInput() {
  const dispatch = useDispatch();
  const filterData = useSelector((state) => state.searchParams.keyword);
  return (
    <Container p={0} mb="1rem">
      <form onSubmit={((e) => {
        e.preventDefault();
        dispatch(getVacancies());
        dispatch((setKeyWord('')));
      })}
      >
        <TextInput
          styles={{ input: { height: '3rem' } }}
          icon={<IconSearch size="1.1rem" stroke={1.5} />}
          placeholder="Enter job title"
          value={filterData}
          onChange={(e) => { dispatch(setKeyWord(e.currentTarget.value)); }}
          rightSection={(
            <Button type="submit">Search</Button>
          )}
          rightSectionWidth={100}
        />
      </form>
    </Container>
  );
}
