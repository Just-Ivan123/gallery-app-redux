import { loginUser, registerUser } from "../../services/authService"; 
import { setUser, setSignedIn } from "./userSlice"; 

export const signInUser = (credentials, navigate) => async (dispatch) => {
  try {
    const response = await loginUser(credentials);
    if (response.status === "error") {
      throw new Error("Invalid email or password");
    }
    localStorage.setItem("access_token", response.authorisation.token);
    if (response.authorisation.token) {
      await dispatch(setUser(response.user));
      console.log(response.user);
      await dispatch(setSignedIn(true));
      navigate("/");
    }
    console.log(response); 
  } catch (error) {
    console.error(error); 
    throw error;
  }
};

export const signUpUser = (user, navigate) => async (dispatch) => {
  try {
    const response = await registerUser(user);

 
    localStorage.setItem("access_token", response.authorisation.token);
    dispatch(setUser(response.user));
    dispatch(setSignedIn(true));
    if (response.authorisation.token) {
      navigate("/");
    }
  } catch (error) {
   
    throw error;
  }
};

export const signOutUser = () => (dispatch) => {
  localStorage.removeItem("access_token");
  dispatch(setUser({}));
  dispatch(setSignedIn(false));
};