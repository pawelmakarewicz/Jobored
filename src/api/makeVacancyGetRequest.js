import axiosInstance from './axiosInstance';
import routes from './routes';

export default async function makeGetVacancyRequest(vacancyId, accessToken) {
  const authorization = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await axiosInstance.get(
    routes.vacancyPath(vacancyId),
    { headers: authorization },
  );
  return response.data;
}
