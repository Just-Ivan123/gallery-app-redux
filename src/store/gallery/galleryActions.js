  import { setGalleries, addGallery, updateGallery } from "./gallerySlice";
  import { createAction } from '@reduxjs/toolkit';
  import {
    getAllGalleries,
    createGallery,
    updateGallery as updateGalleryService,
  } from "../../services/galleryService";

  export const fetchGalleries = (currentPage) => async (dispatch) => {
    try {
      const response = await getAllGalleries(currentPage);
      const data = response.data;
      dispatch(
        setGalleries({
          galleries: data.data,
          currentPage: data.current_page,
          lastPage: data.last_page,
        })
      );
      
    } catch (error) {
      // Обработка ошибок, если необходимо
    }
  };
  

  export const postGallery = (gallery) => async (dispatch) => {
    try {
      const response = await createGallery(gallery);
      const newGallery = response.data;

      dispatch(addGallery(newGallery));
    } catch (error) {
      throw new Error(error);
    }
  };

  export const updateGalleryById = (galleryId, galleryData) => async (
    dispatch
  ) => {
    try {
      const response = await updateGalleryService(galleryData, galleryId);
      const updatedGallery = response.data;

      dispatch(updateGallery(updatedGallery));
    } catch (error) {
      // Обработка ошибок, если необходимо
    }
  };
  

  export const searchGalleriesAction = createAction('gallery/searchGalleries');
  export const clearSearchGalleriesAction = createAction('gallery/clearSearchGalleries');