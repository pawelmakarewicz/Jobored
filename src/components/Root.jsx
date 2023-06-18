import { Outlet } from 'react-router-dom';

import { Container, createStyles } from '@mantine/core';

import HeaderSimple from './Header';

const useStyles = createStyles(() => ({
  rootContainer: {
    maxWidth: '100vw',
    padding: 0,
    m: 0,
    display: 'block',
  },
}));

export default function Root() {
  const { classes } = useStyles();
  return (
    <>
      <HeaderSimple />
      <Container className={classes.rootContainer}>
        <Outlet />
      </Container>
    </>
  );
}
