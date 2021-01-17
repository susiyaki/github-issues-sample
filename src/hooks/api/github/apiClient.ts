import axios from 'axios';
export const apiClient = axios.create({
  baseURL: 'https://api.github.com',
});

apiClient.interceptors.request.use((req) => {
  console.log(`${req.method?.toUpperCase()}: ${req.baseURL}${req.url}`);
  return req;
});
