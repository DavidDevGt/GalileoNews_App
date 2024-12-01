import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  },

  async register(username: string, email: string, password: string) {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      email,
      password,
    });
    return response.data;
  },
};
