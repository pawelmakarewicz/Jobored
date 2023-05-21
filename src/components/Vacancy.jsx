import {
  Title, Text,
} from '@mantine/core';
/* eslint-disable camelcase */

function setSalary(salaryFrom, salaryTo) {
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
  return `з/п ${value} rub`;
}

function Vacancy(props) {
  const { vacancyData } = props;
  const {
    profession, payment_from, payment_to, type_of_work, address,
  } = vacancyData;
  const paymentFrom = Number(payment_from);
  const paymentTo = Number(payment_to);
  return (
    <>
      <Title order={2}>{profession}</Title>
      <Text>{address}</Text>
      <Text>{setSalary(paymentFrom, paymentTo)}</Text>
    </>

  );
}
export default Vacancy;
