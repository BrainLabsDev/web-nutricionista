import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import { useAuthStore } from 'stores/auth'


const store = useAuthStore()

const { setLoader } = store;


const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // store.dispatch('initStore/initLoader').then(r => {});
  setLoader(true);
  return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  //TODO: handle show error messages in interface
  return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // store.dispatch("initStore/stopLoader").then(r => {});
  setLoader(false);
  return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  //TODO: handle show error messages in interface
  // store.dispatch("initStore/stopLoader").then(r => {});
  setLoader(false);
  return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  // axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
