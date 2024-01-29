import axiosBase, { AxiosRequestConfig } from "axios";

const axios = axiosBase.create();

const MOCK_BASE_URL = "https://casino.api.stg.kansino.nl/v1/kansino";
const makeUrl = (endpoint: string) => {
  // return `${process.env.BASE_URL}/${endpoint}`;
  return `${MOCK_BASE_URL}/${endpoint}`;
};

const handleErrorStatus = async (error: any) => {
  const status = error?.status || error?.response?.status || null;

  if (status) return error?.response;
};

axios.interceptors.response.use(
  (response) => response?.data,
  async (error) => Promise.reject(await handleErrorStatus(error))
);

export const client = {
  get: async <T>(endPoint: string, config?: AxiosRequestConfig): Promise<T> => {
    return axios.get<T, T>(makeUrl(endPoint), {
      ...config,
    });
  },

  post: async <T>(
    endPoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axios.post<T, T>(makeUrl(endPoint), data, config);
  },

  patch: async <T = any>(
    endPoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axios.patch<T, T>(makeUrl(endPoint), data, config);
  },

  put: async <T = any>(
    endPoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axios.put<T, T>(makeUrl(endPoint), data, config);
  },

  delete: async <T = any>(
    endPoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axios.delete<T, T>(makeUrl(endPoint), config);
  },
};
