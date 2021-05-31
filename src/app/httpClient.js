import axios from 'axios';

const BASE_URL = 'https://api.github.com';
const DEFAULT_HEADERS = {
  Accept: 'application/vnd.github.v3+json',
};

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: DEFAULT_HEADERS,
});
