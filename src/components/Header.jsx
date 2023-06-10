import { useState } from 'react';
import {
  createStyles, Header, Container, Group, rem, Text,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.black,
    '&:hover': {
      backgroundColor: theme.colors.gray[0],
    },
  },
  linkActive: {
    color: theme.colors.blue[7],
  },
  logo: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.5rem',
  },
}));

const links = [{ path: '/', label: 'Вакансии' }, { path: '/favourites', label: 'Избранное' }];

export default function HeaderSimple() {
  const [active, setActive] = useState(links[0].path);

  const navigate = useNavigate();
  const { classes, cx } = useStyles();
  const items = links.map((link) => (
    <Link
      to={link.path}
      key={link.label}
      className={cx(classes.link, { [classes.linkActive]: active === link.path })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.path);
        navigate(link.path);
      }}
    >
      {link.label}
    </Link>
  ));
  return (
    <Header height={84} mb={40}>
      <Container className={classes.header}>
        {/* <Image src="../public/logo.svg" alt="Logo" />  */}
        <Text className={classes.logo}>Jobored</Text>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
      </Container>
    </Header>
  );
}
