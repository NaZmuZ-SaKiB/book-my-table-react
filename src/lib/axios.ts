/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import config from "../config";
import { getFromLocalStorage } from "../utils/localStorage";
import { authKey } from "../constants";

export type TResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;
};

const token = getFromLocalStorage(authKey);

const axiosClient = axios.create({
  baseURL: `${config.api_base_url}/api`,
  validateStatus: () => true,
});

axiosClient.defaults.headers["Content-Type"] = "application/json";
axiosClient.defaults.headers["Authorization"] = token || "";

//@ts-ignore
axiosClient.interceptors.response.use((response) => {
  return response.data as TResponse;
});

export default axiosClient;
