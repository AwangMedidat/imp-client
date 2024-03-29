import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.baseApiUrl}/api/v1`,
  timeout: 5000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;