import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

API.interceptors.request.use(function (request) {
  const token = localStorage.getItem("access_token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});