import { snakeCase } from 'lodash';

function isSalaryParamsPresent(params) {
  return Object.prototype.hasOwnProperty.call(params, 'payment_from') || Object.prototype.hasOwnProperty.call(params, 'payment_to');
}

function setSearchParamsApi(params) {
  // eslint-disable-next-line no-unused-vars, max-len
  const apiParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v).map(([key, value]) => [snakeCase(key), value]));
  if (isSalaryParamsPresent(apiParams)) {
    return { no_agreement: 1, ...apiParams };
  }
  return apiParams;
}

function initSearchParams(searchParamsFromFilters) {
  const initialSearchParams = { published: '1' };
  const additionalSearchParams = setSearchParamsApi(searchParamsFromFilters);
  return { ...initialSearchParams, ...additionalSearchParams };
}

export default initSearchParams;
