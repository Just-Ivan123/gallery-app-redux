import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  galleries: [],
  allGalleries: [],
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
      state.allGalleries = action.payload.galleries;
      state.currentPage = action.payload.currentPage;
      state.lastPage = action.payload.lastPage;
      
    },
    addGallery: (state, action) => {
      state.galleries.push(action.payload);
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
    searchGalleries: (state, action) => {
      state.galleries = state.allGalleries;
      console.log(action);
      console.log(action.payload);
      const searchQuery = action.payload.toLowerCase();
      console.log(searchQuery);
      console.log(state);
    
      const filteredGalleries = state.galleries.filter((gallery) => {
        
        return (
          gallery.title.toLowerCase().includes(searchQuery) ||
          gallery.description.toLowerCase().includes(searchQuery) ||
          gallery.user.first_name.toLowerCase().includes(searchQuery) ||
          gallery.user.last_name.toLowerCase().includes(searchQuery)
        );
      });

      // Обновляем состояние с отфильтрованными галереями
      state.galleries = filteredGalleries;
    },
    clearSearchGalleries: (state) => {
      state.galleries = state.allGalleries;
    }
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