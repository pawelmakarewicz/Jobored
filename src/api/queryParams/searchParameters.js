const renameDict = {
  published: 'published',
  paymentFrom: 'payment_from',
  paymentTo: 'payment_to',
  catalogue: 'catalogues',
  keyword: 'keyword',
  noAgreement: 'no_agreement',
  ids: 'ids',
  vacancyId: 'id_vacancy',
};

function setSearchParamsApi(params) {
  const searchParams = {};
  Object.keys(params).forEach((param) => {
    const key = renameDict[param];
    const value = params[param];
    if (value) {
      searchParams[key] = value;
    }
  });
  return searchParams;
}

function initSearchParams(searchParamsFromFilters, defaultSearchParams = { published: '1' }) {
  return setSearchParamsApi({ ...defaultSearchParams, ...searchParamsFromFilters });
}

export default initSearchParams;
