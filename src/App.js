import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./shared/ProtectedRoute";
import AddGallery from "./pages/AddGallery";
import AllGalleries from "./components/AllGalleries";
import UserGalleries from "./components/UserGalleries";
import { setUser, setSignedIn } from "./store/user/userSlice";
import {checkUserAuthentication} from "./services/authService";
import SingleGallery from "./components/SingleGallery";
import EditGallery from "./components/EditGallery";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      checkUserAuthentication(token)
        .then((response) => {
          dispatch(setUser(response.user));
          dispatch(setSignedIn(true));
        })
        .catch((error) => {
          console.error(error);
          
          localStorage.removeItem("access_token");
        });
    }

  }, []);


  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AllGalleries />} />
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <AddGallery />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-galleries"
        element={
          <ProtectedRoute>
            <UserGalleries />
          </ProtectedRoute>
        }
      />
      <Route
        path="/galleries/author/:id"
        element={
          
            <UserGalleries />
          
        }
      />
      <Route
        path="/galleries/:id"
        element={
          
            <SingleGallery />
          
        }
      />
      <Route
        path="/edit-gallery/:id"
        element={
          <ProtectedRoute>
            <EditGallery />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;