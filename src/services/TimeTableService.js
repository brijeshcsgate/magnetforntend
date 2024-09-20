import { globalErrorHandler } from '@/utils/errorHandler';
import HttpClient from './baseService';

const createTimeTable = (payload, callback, error = globalErrorHandler) => {
  return HttpClient.post(`/v1/time-table`, payload)
    .then(callback)
    .catch(error)
    .finally(stop);
};

const getTimeTableById = (id, params, callback, error = globalErrorHandler) => {
  return HttpClient.get(`/v1/time-table/${id}`, { params })
    .then(callback)
    .catch(error)
    .finally(stop);
};

const updateTimeTableById = (
  id,
  values,
  callback,
  error = globalErrorHandler
) => {
  return HttpClient.patch(`/v1/time-table/${id}`, values)
    .then(callback)
    .catch(error)
    .finally(stop);
};

export const TimeTableService = {
  createTimeTable,
  updateTimeTableById,
  getTimeTableById,
};
