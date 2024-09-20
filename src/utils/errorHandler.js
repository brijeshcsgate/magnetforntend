import { toast } from 'react-toastify';

export const globalErrorHandler = (err) => {
  console.error(err, { err });
  toast.error(err?.response?.data?.message);
};
