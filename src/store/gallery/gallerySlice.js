import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  galleries: [],
  currentPage: 1,
  lastPage: 1,
  searchQuery: '',
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setGalleries: (state, action) => {
      state.galleries = action.payload.galleries;
      state.currentPage = action.payload.currentPage;
      state.lastPage = action.payload.lastPage;
      
    },
    addGallery: (state, action) => {
      console.log(action.payload);
      state.allGalleries.unshift(action.payload);
    },
    updateGallery: (state, action) => {
      const updatedGallery = action.payload;
      const index = state.galleries.findIndex(
        (gallery) => gallery.id === updatedGallery.id
      );
      if (index !== -1) {
        state.galleries[index] = updatedGallery;
      }
      state.currentPage = updatedGallery.page;
      state.lastPage = updatedGallery.last_page;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
    
  },
});
export const {
  setGalleries,
  addGallery,
  updateGallery,
  setCurrentPage,
  setLastPage,
  setSearchQuery,
} = gallerySlice.actions;

export default gallerySlice.reducer;