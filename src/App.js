import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSignedIn } from "./store/user/userSlice";
import { getAllGalleries } from "./services/galleryService";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./shared/ProtectedRoute";
import AddGallery from "./pages/AddGallery";
import AllGalleries from "./components/AllGalleries";
import { setUser } from "./store/user/userSlice";
import {
  setGalleries,
  addGallery,
  updateGallery,
  setCurrentPage,
  setLastPage,
} from "./store/gallery/gallerySlice";

const App = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectSignedIn);
  const galleries = useSelector((state) => state.gallery.galleries);
  const currentPage = useSelector((state) => state.gallery.currentPage);
  const lastPage = useSelector((state) => state.gallery.lastPage);

  useEffect(() => {
    
      getAllGalleries()
        .then(({ data }) => {
          console.log(data);
          console.log(data.data);
          console.log(data.current_page);
          console.log(data.last_page);
          dispatch(
            setGalleries({
              galleries: data.data,
              currentPage: data.current_page,
              lastPage: data.last_page,
            })
          );
        })
        .catch((error) => {
          console.error(error);
        });
    
  }, []);

  const handleUpdateGallery = (updatedGallery) => {
    dispatch(updateGallery(updatedGallery));
  };


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
    </Routes>
  );
};

export default App;