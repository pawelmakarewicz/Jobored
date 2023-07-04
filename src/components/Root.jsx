import { Outlet } from 'react-router-dom';

import { Container, createStyles } from '@mantine/core';

import HeaderSimple from './Header';

const useStyles = createStyles((theme) => ({
  rootContainer: {
    maxWidth: '100vw',
    minHeight: '100vh',
    padding: 0,
    m: 0,
    display: 'block',
    backgroundColor: theme.colors.gray[0],
  },
}));

export default function Root() {
  const { classes } = useStyles();
  return (
    <Container className={classes.rootContainer}>
      <HeaderSimple />
      <Outlet />
    </Container>
  );
}
