import {
  Title, Text, Checkbox, createStyles, Container, Group, ThemeIcon,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TiLocationOutline } from 'react-icons/ti';
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
  return <Text weight="bold">{`з/п ${value} rub`}</Text>;
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    background: 'white',
    width: '100%',
    marginBottom: '1rem',
    padding: '1.5rem',
    borderRadius: theme.radius.md,
    border: '0.0625rem solid #ced4da',
    position: 'relative',
  },
  title: {
    display: 'block',
    marginBottom: '0.5rem',
    color: theme.colors.blueParalcet[0],
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  checkBox: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
  },
  informationWrapper: {
    paddingLeft: 0,
    paddingRight: '2.5rem',
  },
  typeOfWork: {
    '&:before': {
      content: '"•"',
      color: 'green',
      display: 'inline-block',
      marginRight: '5px',
    },
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

  const addressData = address ? (
    <Group position="left" noWrap spacing={0}>
      <TiLocationOutline color="gray" />
      <Text ml="0.7rem">{address}</Text>
    </Group>
  ) : null;
  return (
    <Container className={classes.wrapper}>
      <Container className={classes.informationWrapper}>
        <Title className={classes.title} component={Link} to={`/${id}`} order={2}>{profession}</Title>
        <Group mb="0.5rem">
          {getSalary(paymentFrom, paymentTo)}
          <Text className={classes.typeOfWork}>{typeOfWork.title}</Text>
        </Group>
        {addressData}
      </Container>
      <Checkbox
        onChange={() => dispatch(toggleSaveVacancy(id))}
        value={id}
        checked={isSaved}
        className={classes.checkBox}
        size="lg"
      />
    </Container>
  );
}
export default Vacancy;
