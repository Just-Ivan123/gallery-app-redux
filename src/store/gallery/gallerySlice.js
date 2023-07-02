import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  galleries: [],
  currentGallery: null,
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
      state.galleries.unshift(action.payload);
    },
    updateGallery: (state, action) => {
      const updatedGallery = action.payload;
      const index = state.galleries.findIndex(
        (gallery) => gallery.id === updatedGallery.id
      );
      if (index !== -1) {
        state.galleries[index] = updatedGallery;
      }
    },
    removeGallery: (state, action) => {
      const galleryIdToRemove = action.payload;
      state.galleries = state.galleries.filter((gallery) => gallery.id !== galleryIdToRemove);
    },
    setCurrentGallery: (state, action) => {
      state.currentGallery = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
    addComment:(state, action) => {
      state.currentGallery.comments.unshift(action.payload);
    },
    removeComment: (state, action) => {
      const commentIdToRemove = action.payload;
      state.currentGallery.comments = state.currentGallery.comments.filter((comment) => comment.id !== commentIdToRemove);
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
  setCurrentGallery,
  removeGallery,
  addComment,
  removeComment,
} = gallerySlice.actions;

export default gallerySlice.reducer;