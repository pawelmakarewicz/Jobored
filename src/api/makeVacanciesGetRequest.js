import initSearchParams from './queryParams/searchParameters';
import axiosInstance from './axiosInstance';
import routes from './routes';

export default async function makeGetVacanciesRequest(paramsFilter, accessToken) {
  const searchParams = initSearchParams(paramsFilter);

  const authorization = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await axiosInstance.get(
    routes.vacanciesPath(),
    { headers: authorization, params: { ...searchParams } },
  );
  return response.data.objects;
}
