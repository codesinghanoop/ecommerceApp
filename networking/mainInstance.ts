import axios from 'axios';
import AppConfig from './networkConfig';
const TIMEOUT = 270000;
const BASE_URL = AppConfig.API_URL;

/** single axios instance for all network calls */
export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});
