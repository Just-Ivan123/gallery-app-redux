import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./gallery/gallerySlice";
import userReducer from "./user/userSlice";
import searchReducer from "./gallery/searchSlice";

const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    user: userReducer,
    search: searchReducer,
  },
});

export default store;