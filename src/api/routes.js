const routes = {
  loginPath: () => '/2.0/oauth2/password/',
  vacanciesPath: () => '/2.0/vacancies/',
  cataloguesPath: () => '2.0/catalogues',
  vacancyPath: (id) => `/2.0/vacancies/${id}/`,
};

export default routes;
