import { toast } from 'sonner';

const SUCSSES = {
  200: (name) => `${name} has been added successfully`,
};

const ERROR = {
  400: (name) => `${name} has been already exists`,
};

export const getToastMessage = (status, name) => {
  if (SUCSSES[status]) {
    return toast.success(SUCSSES[status](name));
  }
  if (ERROR[status]) {
    return toast.error(ERROR[status](name));
  }
  return name;
};
4;
