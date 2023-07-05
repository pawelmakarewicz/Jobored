import {
  Title, Text, Checkbox, createStyles, Container,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSaveVacancy } from '../slices/vacanciesSlice';

function getSalary(salaryFrom, salaryTo) {
  if (salaryFrom === 0 && salaryTo === 0) {
    return null;
  }
  let value;
  if (salaryFrom !== 0 && salaryTo !== 0) {
    value = `${salaryFrom}-${salaryTo}`;
  }
  if (salaryFrom === 0) {
    value = `${salaryTo}`;
  }
  if (salaryTo === 0) {
    value = `от ${salaryFrom}`;
  }
  if (salaryTo === salaryFrom) {
    value = `${salaryFrom}`;
  }
  return <Text>{`з/п ${value} rub`}</Text>;
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    background: 'white',
    width: '100%',
    marginBottom: '1rem',
    padding: '1.5rem',
    borderRadius: theme.radius.md,
    border: '0.0625rem solid #ced4da',
  },
  title: {
    color: theme.colors.blueParalcet[0],
  },
}));

function Vacancy(props) {
  const dispatch = useDispatch();

  const { classes } = useStyles();
  const { vacancyData } = props;

  const {
    profession, paymentFrom, paymentTo, typeOfWork, address, id,
  } = vacancyData;

  const isSaved = useSelector((state) => state.vacancies.favouriteVacancies.includes(id));

  const addressData = address ? <Text>{address}</Text> : null;
  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title} component={Link} to={`/${id}`} order={2}>{profession}</Title>
      {getSalary(paymentFrom, paymentTo)}
      {addressData}
      <Text>{typeOfWork.title}</Text>
      <Checkbox
        onChange={() => dispatch(toggleSaveVacancy(id))}
        value={id}
        checked={isSaved}
      />
    </Container>
  );
}
export default Vacancy;
