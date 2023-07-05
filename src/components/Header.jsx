import { useState } from 'react';
import {
  createStyles, Header, Container, Group, Image, Text,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  header: {
    marginBottom: '40px',
  },
  additionalContainer: {
    maxWidth: '1115px',
    marginRight: 'auto',
    marginLeft: 'auto',
    height: '84px',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    marginLeft: 0,
    paddingLeft: 0,
    maxWidth: 700,
  },
  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colors.dark,
    '&:hover': {
      backgroundColor: theme.colors.gray[0],
    },
  },
  linkActive: {
    color: theme.colors.blueParalcet[0],
  },
  logo: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    marginLeft: 0,
    paddingLeft: 0,
  },
  logoImage: {
    marginRight: theme.spacing.xs,
    width: '30px',
    height: '30px',
  },
}));

const links = [{ path: '/', label: 'Поиск Вакансий' }, { path: '/favourites', label: 'Избранное' }];

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
    <Header className={classes.header}>
      <Container className={classes.additionalContainer}>
        <Container className={classes.headerContainer}>
          <Container className={classes.logo}>
            <Image src="/logo.svg" alt="Logo" className={classes.logoImage} />
            <Text>Jobored</Text>
          </Container>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
        </Container>
      </Container>
    </Header>
  );
}
