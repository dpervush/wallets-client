import axios from "axios";
import { getWithExpiry } from "../utils/localStorageWithExpiry";

export const API_URL = "https://wallets-pet.herokuapp.com/api";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

$api.interceptors.request.use((config) => {
  if (process.browser) {
    const token = getWithExpiry("access_token");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default $api;
