import axios from "axios";
import AxiosInstance, { BaseUrl } from "./baseService";

export const getApi = (endpoint, params, payload) => {
  return AxiosInstance.get(
    `${endpoint}${params ? `/${params}` : ""}`,
    payload
  ).then((res) => res.data);
};

export const postApi = (endpoint, payload) => {
  return AxiosInstance.post(endpoint, payload).then((res) => res.data);
};

export const putApi = (endpoint, payload) => {
  return AxiosInstance.put(endpoint, payload).then((res) => res.data);
};

export const postWithoutAuthApi = async (endpoint, payload) => {
  let url = `${BaseUrl}${endpoint}`;
  return await axios.post(url, payload).then((res) => res.data);
};

export const patchApi = (endpoint, params, payload) => {

  return AxiosInstance.patch(`${endpoint}/${params}`, payload).then(
    (res) => res.data
  );
};

export const deleteApi = (endpoint, params) => {

  return AxiosInstance.delete(`${endpoint}/${params}`).then((res) => res.data);
};

export const postFileApi = (endpoint, formData) => {
  return AxiosInstance.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => res.data);
};
