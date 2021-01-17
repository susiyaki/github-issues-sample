import axios from 'axios';
export const apiClient = axios.create({
  baseURL: 'https://api.github.com',
});

apiClient.interceptors.request.use((req) => {
  process.env.NODE_ENV === 'development' &&
    console.log(`${req.method?.toUpperCase()}: ${req.baseURL}${req.url}`);
  return req;
});
