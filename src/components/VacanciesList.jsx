/* eslint-disable react/prop-types */
import {
  List, createStyles,
} from '@mantine/core';

import Vacancy from './Vacancy';

const useStyles = createStyles(() => ({
  input: {
    margin: 'auto',
    display: 'block',
  },
}));

function VacanciesList({ vacancies }) {
  const { classes } = useStyles();
  return (
    <List classNames={{ itemWrapper: classes.input }}>
      {vacancies.map((vacancy) => (
        <List.Item key={vacancy.id}><Vacancy vacancyData={vacancy} /></List.Item>
      ))}
    </List>
  );
}

export default VacanciesList;
