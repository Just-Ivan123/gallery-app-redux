import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../services/authService"; // Импорт необходимых функций
import { setUser, setSignedIn } from "./userSlice"; 

export const signInUser = (credentials, navigate) => async (dispatch) => {
  try {
    const response = await loginUser(credentials);
    if (response.status === "error") {
      throw new Error("Invalid email or password");
    }
    localStorage.setItem("access_token", response.authorisation.token);
    dispatch(setUser(credentials));
    dispatch(setSignedIn(true));
    if (response.authorisation.token) {
      navigate("/");
    }
    console.log(response); // Обработка успешного входа
  } catch (error) {
    console.error(error); // Обработка ошибки входа
    throw error;
  }
};

export const signUpUser = (user, navigate) => async (dispatch) => {
  try {
    const response = await registerUser(user);

    // Обработка успешной регистрации
    localStorage.setItem("access_token", response.authorisation.token);
    dispatch(setUser(response.user));
    dispatch(setSignedIn(true));
    if (response.authorisation.token) {
      navigate("/");
    }
  } catch (error) {
    // Обработка ошибки регистрации
    throw error;
  }
};

export const signOutUser = () => (dispatch) => {
  localStorage.removeItem("access_token");
  dispatch(setUser({}));
  dispatch(setSignedIn(false));
};