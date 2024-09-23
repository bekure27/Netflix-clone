import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000", // backend URL
  baseURL: "https://netflix-backend-rket.onrender.com", // backend URL
});

export default instance;
