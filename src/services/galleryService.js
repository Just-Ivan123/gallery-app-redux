import { API } from "../shared/api";

export const getAllGalleries = async (currentPage) => {
    try {
      const response = await API.get(`/galleries?page=${currentPage}`);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  
  export const getGalleryById = async (id) => {
    try {
      const response = await API.get(`/galleries/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  
  export const getUserGalleries = async (userId) => {
    try {
      const response = await API.get(`/galleries/author/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  
  export const createGallery = async (galleryData) => {
    try {
      const response = await API.post("/galleries", galleryData);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export const updateGallery = async (galleryData, id) => {
    try {
      const response = await API.put(`/galleries/${id}`, galleryData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  
  export const deleteGallery = async (id) => {
    try {
      const response = await API.delete(`/galleries/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };