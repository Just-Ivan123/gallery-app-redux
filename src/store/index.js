import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./gallery/gallerySlice";
import userReducer from "./user/userSlice";


const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    user: userReducer,
  },
});

export default store;