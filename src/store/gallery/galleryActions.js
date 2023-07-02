  import {
     setGalleries,
     addGallery,
      updateGallery,
       setCurrentGallery,
      removeGallery as removeGallerySlice,
    addComment,
    removeComment as removeCommentSlice } from "./gallerySlice";
  import {
    getAllGalleries,
    createGallery,
    updateGallery as updateGalleryService,
    getUserGalleries as getUserGalleriesService,
    getGalleryById,
    deleteGallery,
    postComment as postCommentService,
    deleteComment
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
      throw error;
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
      throw error;
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
      throw error;
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
      throw error;
    }
  };

  export const postGallery = (gallery) => async (dispatch) => {
    try {
      const response = await createGallery(gallery);
      const newGallery = response.data;
      dispatch(addGallery(newGallery));
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  export const getGallery = (id) => async (dispatch) => {
    try {
      const response = await getGalleryById(id);
      const gallery = response.data;
      dispatch(setCurrentGallery(gallery));
    }catch (error){
      throw error;
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
      throw error;
    }
  };

  export const removeGallery = (galleryId) => async (
    dispatch
  ) => {
    try{
      const response = await deleteGallery(galleryId);
      dispatch(removeGallerySlice(galleryId));
    }catch(error){
      throw error;
    }
  };
  
  export const postComment = (comment) => async(
    dispatch
  ) => {
    try{
      const response = await postCommentService(comment);
      dispatch(addComment(response.data));
    }catch(error){
      throw error;
    }
  };

  export const removeComment = (commentId) => async (
    dispatch
  ) => {
    try{
      const response = await deleteComment(commentId);
      dispatch(removeCommentSlice(commentId));
    }catch(error){
      throw error;
    }
  };
  