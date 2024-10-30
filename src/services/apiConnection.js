import axios from 'axios'
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST}/api/v1`,
  withCredentials: true
})
apiClient.interceptors.request.use((config) => {
  console.log(config.url)
  config.headers = {
    ...config.headers,
    'accept': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };
  config.withCredentials = true;
  return config;
}, function (error) {
  return Promise.reject(error);
});
apiClient.interceptors.response.use(
  response => response,
  async (error) => {
    const url = error.config.url
    const status = error?.response?.status
    const message = error?.response?.data?.message || ''
    console.warn('soy interceptor response 22', { url, status, message })
    return Promise.reject(error);
  }
);
const { get, post, put, patch, delete: destroy } = apiClient;
export { get, post, put, patch, destroy }
