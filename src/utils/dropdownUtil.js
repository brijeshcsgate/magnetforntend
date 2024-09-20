import AxiosInstance from '@/services/baseService';
const getDefaultEndpoint = (id) => `v2/masters/search/${id}`;

export const getAsyncDropdownOptions = (inputValue, callback, id, queryParams = {}, optionsToHide) => {
  const params = { search: inputValue, ...queryParams };
  AxiosInstance.get(`${getDefaultEndpoint(id)}?${new URLSearchParams(params).toString()}`).then((data) => {
    if (data.data) {
      optionsToHide?.length ? callback(data.data?.filter(({ value }) => !optionsToHide.includes(value))) : callback(data.data);
    }
  });
};
