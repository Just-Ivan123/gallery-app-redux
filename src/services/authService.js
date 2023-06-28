import { API } from "../shared/api";

export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await API.post("/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const logoutUser = async () => {
  try {
    const response = await API.post("/logout");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};