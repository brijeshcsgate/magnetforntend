import HttpClient from './HttpClient';

const BASE_ROUTE = 'masters';
const getMasterList = (routeId, params) => {
  return HttpClient.get(`${BASE_ROUTE}/${routeId}`, { params });
};

export const CommonMasterService = {
  getMasterList,
};
