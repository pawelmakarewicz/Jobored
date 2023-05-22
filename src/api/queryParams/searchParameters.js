import { snakeCase } from 'lodash';

function setSearchParamsApi(params) {
  // eslint-disable-next-line no-unused-vars
  const object = Object.fromEntries(Object.entries(params).filter(([_, v]) => v).map(([key, value]) => [snakeCase(key), value]));
  console.log(object);
  return object;
}

function initSearchParams(searchParamsFromFilters) {
  const initialSearchParams = { published: '1' };
  const additionalSearchParams = setSearchParamsApi(searchParamsFromFilters);
  return { ...initialSearchParams, ...additionalSearchParams };
}

export default initSearchParams;
