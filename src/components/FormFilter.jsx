import {
  Text, NumberInput, List, Select, Button, Group, Title, Box,
} from '@mantine/core';
import { IconChevronDown, IconX } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../slices/searchParamsSlice';
import { getVacancies } from '../slices/vacanciesSlice';

const dataFromState = ['React', 'Angular', 'Svelte', 'Vue'];

const emptyFilter = {
  paymentFrom: '',
  paymentTo: '',
  catalogues: '',
};

export default function FormFilter() {
  const dispatch = useDispatch();
  const filterData = useSelector((state) => state.searchParams.paramsFilter);
  const { paymentFrom, paymentTo, catalogues } = filterData;

  return (
    <Box p={20} maw={315}>
      <Group position="apart" mt="md">
        <Title order={2}>Фильтры</Title>
        <Button rightIcon={<IconX size="1rem" />} variant="white" color="gray" type="reset" onClick={() => { dispatch(setFilters({ ...emptyFilter })); }}>
          <Text fz="xs">Сбросить все</Text>
        </Button>
      </Group>
      <form onSubmit={(() => { dispatch(getVacancies()); })}>
        <List>
          <List.Item>
            <Group position="left" mt="md">
              <Title order={3}>Отрасль</Title>
            </Group>
            <Select
              placeholder="Выберете отрасль"
              rightSection={<IconChevronDown size="1rem" />}
              rightSectionWidth={30}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={dataFromState}
              onChange={(e) => { console.log(e); }}
            />
          </List.Item>
          <List.Item>
            <Group position="left" mt="md">
              <Title order={3}>Оклад</Title>
            </Group>
            <NumberInput
              pb="0.5rem"
              placeholder="От"
              min={0}
              max={paymentTo}
              value={paymentFrom}
              onChange={(e) => { dispatch(setFilters({ paymentFrom: Number(e) })); }}
            />
            <NumberInput
              placeholder="До"
              min={paymentFrom}
              value={paymentTo}
              onChange={(e) => { dispatch(setFilters({ paymentTo: Number(e) })); }}
            />
          </List.Item>
        </List>
        <Group position="center" mt="md">
          <Button type="submit" style={{ width: '100%' }}>Применить</Button>
        </Group>
      </form>
    </Box>
  );
}
