import { globalErrorHandler } from '@/utils/errorHandler';
import HttpClient from './baseService';

const PATH = {
  Route: 'v1/route',
  RouteOrigin: '/depot',
  RouteDestination: '/depot',
};

const createRoute = (payload, callback, error = globalErrorHandler) => {
  return HttpClient.post(`${PATH.Route}`, payload)
    .then(callback)
    .catch(error)
    .finally(stop);
};

const getRouteById = (id, params, callback, error = globalErrorHandler) => {
  return HttpClient.get(`${PATH.Route}/${id}`, { params })
    .then(callback)
    .catch(error)
    .finally(stop);
};

const updateRouteById = (id, values, callback, error = globalErrorHandler) => {
  return HttpClient.patch(`${PATH.Route}/${id}`, values)
    .then(callback)
    .catch(error)
    .finally(stop);
};

export const RouteService = {
  createRoute,
  getRouteById,
  updateRouteById,
};
