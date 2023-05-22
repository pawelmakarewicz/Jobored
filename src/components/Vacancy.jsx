import {
  Title, Text,
} from '@mantine/core';
import { Link } from 'react-router-dom';
/* eslint-disable camelcase */

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
  const { vacancyData } = props;

  const {
    profession, payment_from, payment_to, type_of_work, address, id
  } = vacancyData;
  const paymentFrom = Number(payment_from);
  const paymentTo = Number(payment_to);
  const typeOfWork = type_of_work;
  const addressData = address ? <Text>{address}</Text> : null;
  return (
    <>
      <Title order={2}>{profession}</Title>
      {getSalary(paymentFrom, paymentTo)}
      {addressData}
      <Text>{typeOfWork.title}</Text>
      <Link to={`/${id}`}>{id}</Link>
    </>
  );
}
export default Vacancy;
