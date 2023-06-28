import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "", // Поисковый запрос
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;