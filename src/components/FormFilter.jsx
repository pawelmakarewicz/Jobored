import { useEffect } from 'react';
import {
  createStyles, Text, NumberInput, List, Select, Button, Group, Title, Box,
} from '@mantine/core';
import { IconChevronDown, IconX } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../slices/searchParamsSlice';
import { getVacancies } from '../slices/vacanciesSlice';
import { getCatalogues } from '../slices/catalogueSlice';

const useStyles = createStyles((theme) => ({
  formBox: {
    padding: '20px',
    background: 'white',
    borderRadius: theme.radius.md,
    maxWidth: '315px',
  },
  resetBottom: {
    color: 'gray',
    '&:hover': {
      backgroundColor: theme.colors.gray[0],
    },
  },
  input: {
    display: 'block',
  },
  numberInputRight: {
    border: 'none',
  },
}));

const emptyFilter = {
  paymentFrom: '',
  paymentTo: '',
  catalogue: '',
};

const useInitialCatalogue = () => {
  const dispatch = useDispatch();
  const accessTokenLoadingStatus = useSelector((state) => state.accessTokens.loadingStatus);

  useEffect(() => {
    if (accessTokenLoadingStatus === 'succeed') {
      dispatch(getCatalogues());
    }
  }, [accessTokenLoadingStatus]);
};

export default function FormFilter() {
  useInitialCatalogue();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const filterData = useSelector((state) => state.searchParams.paramsFilter);
  const cataloguesData = useSelector((state) => state.catalogues.cataloguesData) || [];

  const catalogueOptions = cataloguesData.map(({ titleTrimmed, key }) => (
    { value: key, label: titleTrimmed }));
  const { paymentFrom, paymentTo } = filterData;

  return (
    <Box className={classes.formBox}>
      <Group position="apart" mb="md">
        <Title order={2}>Фильтры</Title>
        <Button className={classes.resetBottom} rightIcon={<IconX size="1rem" />} variant="white" onClick={() => { dispatch(setFilters({ ...emptyFilter })); }}>
          <Text fz="xs">Сбросить все</Text>
        </Button>
      </Group>
      <form onSubmit={((e) => {
        e.preventDefault();
        dispatch(getVacancies());
      })}
      >
        <List classNames={{ itemWrapper: classes.input }}>
          <List.Item>
            <Title order={3}>Отрасль</Title>
            <Select
              placeholder="Выберете отрасль"
              rightSection={<IconChevronDown size="1rem" />}
              rightSectionWidth={30}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={catalogueOptions}
              value={filterData.catalogue}
              // eslint-disable-next-line max-len
              onChange={(value) => {
                dispatch(setFilters({ catalogue: value }));
              }}
            />
          </List.Item>
          <List.Item>
            <Group position="left" mt="md">
              <Title order={3}>Оклад</Title>
            </Group>
            <NumberInput
              mb="0.5rem"
              placeholder="От"
              min={0}
              max={paymentTo}
              value={paymentFrom}
              onChange={(e) => { dispatch(setFilters({ paymentFrom: Number(e) })); }}
              classNames={{ control: classes.numberInputRight }}
            />
            <NumberInput
              placeholder="До"
              min={paymentFrom}
              value={paymentTo}
              onChange={(e) => { dispatch(setFilters({ paymentTo: Number(e) })); }}
              classNames={{ control: classes.numberInputRight }}
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
