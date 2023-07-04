import {
  Title, Text, Checkbox, Button, Container,
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

function Vacancy(props) {
  const dispatch = useDispatch();

  const { vacancyData } = props;

  const {
    profession, paymentFrom, paymentTo, typeOfWork, address, id,
  } = vacancyData;

  const isSaved = useSelector((state) => state.vacancies.favouriteVacancies.includes(id));

  const addressData = address ? <Text>{address}</Text> : null;
  return (
    <Container>
      <Container component={Link} to={`/${id}`}>
        <Title order={2}>{profession}</Title>
      </Container>
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
