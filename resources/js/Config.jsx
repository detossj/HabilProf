import axios from "axios";

const base_api_url = "http://localhost:8000/api/v1";
axios.defaults.withCredentials = true;

// Interceptor: agrega automáticamente el token a cada request
axios.interceptors.request.use((config) => {
  const tokenString = sessionStorage.getItem("token");
  const token = tokenString ? JSON.parse(tokenString) : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default {
  // AUTH
  getLogin: async (data) => {
    const response = await axios.post(`${base_api_url}/auth/login`, data);
    const token = response.data.token;
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
    }
    return response;
  },
  getLogout: () => axios.post(`${base_api_url}/auth/logout`)
}
