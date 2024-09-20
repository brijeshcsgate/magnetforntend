import { globalErrorHandler } from '@/utils/errorHandler';
import HttpClient from './HttpClient';

const PATH = {
  inspection: '/inspection',
  
};

const createinspection = (payload, callback, error = globalErrorHandler) => {
  return HttpClient.post(`${PATH.inspection}`, payload)
    .then(callback)
    .catch(error)
    .finally(stop);
};

const getinspectionById = (
  id,
  params,
  callback,
  error = globalErrorHandler
) => {
  return HttpClient.get(`${PATH.inspection}/${id}`, { params })
    .then(callback)
    .catch(error)
    .finally(stop);
};

const updateinspectionById = (
  id,
  values,
  callback,
  error = globalErrorHandler
) => {
  return HttpClient.patch(`${PATH.inspection}/${id}`, values)
    .then(callback)
    .catch(error)
    .finally(stop);
};

export const InspectionsService = {
  createinspection,
  getinspectionById,
  updateinspectionById,
};
