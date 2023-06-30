  import { setGalleries, addGallery, updateGallery } from "./gallerySlice";
  import {
    getAllGalleries,
    createGallery,
    updateGallery as updateGalleryService,
    getUserGalleries as getUserGalleriesService
  } from "../../services/galleryService";

  export const getGalleries = (searchQuery = null) => async (dispatch) => {
    try {
      const response = await getAllGalleries(null, searchQuery);
      const data = response.data;
      
      dispatch(
        setGalleries({
          galleries: data.data,
          currentPage: data.current_page,
          lastPage: data.last_page,
        })
      );
     
    } catch (error) {

    }
  };

  export const fetchGalleries = (currentPage, searchQuery = null) => async (dispatch, getState) => {
    try {
      const response = await getAllGalleries(currentPage, searchQuery);
      const data = response.data;
      const currentGalleries = getState().gallery.galleries;
      const updatedGalleries = [...currentGalleries, ...data.data];
      
      dispatch(
        setGalleries({
          galleries: updatedGalleries,
          currentPage: data.current_page,
          lastPage: data.last_page,
        })
      );
     
    } catch (error) {

    }
  };
  
  export const getUserGalleries = (user_id, searchQuery = null) => async (dispatch) => {
    try {
      const response = await getUserGalleriesService(user_id, null, searchQuery);
      const data = response.data;
  
      dispatch(
        setGalleries({
          galleries: data.data,
          currentPage: data.current_page,
          lastPage: data.last_page,
        })
      );
  
    } catch (error) {
      
    }
  };
  
  
  export const fetchUserGalleries = (user_id, currentPage, searchQuery = null) => async (dispatch, getState) => {
    try {
      const response = await getUserGalleriesService(user_id, currentPage, searchQuery);
      const data = response.data;
      const currentGalleries = getState().gallery.galleries;
      const updatedGalleries = [...currentGalleries, ...data.data];
  
      dispatch(
        setGalleries({
          galleries: updatedGalleries,
          currentPage: data.current_page,
          lastPage: data.last_page,
        })
      );
  
    } catch (error) {
      
    }
  };

  export const postGallery = (gallery) => async (dispatch) => {
    try {
      const response = await createGallery(gallery);
      const newGallery = response.data;
      console.log(newGallery);
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
      
    }
  };
  