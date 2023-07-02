import { API } from "../shared/api";

export const getAllGalleries = async (currentPage = null, searchQuery = null) => {
  try {
    let url = "/galleries";
    if (currentPage !== null) {
      url += `?page=${currentPage}`;
    }
    if (searchQuery) {
      url += currentPage !== null ? `&search=${searchQuery}` : `?search=${searchQuery}`;
    }
    const response = await API.get(url);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
  
  export const getGalleryById = async (id) => {
    try {
      const response = await API.get(`/galleries/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  
  export const getUserGalleries = async (user_id, currentPage = null, searchQuery = null) => {
    try {
      let url = `/galleries/author/${user_id}`;
      if (currentPage !== null) {
        url += `?page=${currentPage}`;
      }
      if (searchQuery) {
        url += currentPage !== null ? `&search=${searchQuery}` : `?search=${searchQuery}`;
      }
      const response = await API.get(url);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  
  export const createGallery = async (galleryData) => {
    try {
      const response = await API.post("/galleries", galleryData);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  
  export const updateGallery = async (galleryData, id) => {
    try {
      const response = await API.put(`/galleries/${id}`, galleryData);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  
  export const deleteGallery = async (id) => {
    try {
      const response = await API.delete(`/galleries/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  
  export const postComment = async (comment) => {
    try{
      const response = await API.post('/galleries/comment', comment);
      return response;
    }catch(error){
      throw new Error(error.response.data.message);
    }
  };

  export const deleteComment = async (id) => {
    try {
      const response = await API.delete(`/galleries/comment/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };