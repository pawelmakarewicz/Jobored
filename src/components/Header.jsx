import React, { useState } from 'react';
import {
  createStyles, Header, Container, Text, Group, Image,
} from '@mantine/core';

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
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colors.dark,
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
    fontWeight: 600,
    marginLeft: theme.spacing.xs,
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    marginRight: theme.spacing.xs,
    width: '30px',
    height: '30px',
  },
}));

const links = [{ link: '123', label: 'Вакансии' }, { link: '45', label: 'Избранное' }];

export default function HeaderSimple() {
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={84} mb={40}>
      <Container className={classes.header} maw={700}>
        <div className={classes.logo}>
          <Image src="/logo.svg" alt="Logo" className={classes.logoImage} />
          <Text>Jobored</Text>
        </div>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
      </Container>
    </Header>
  );
}
