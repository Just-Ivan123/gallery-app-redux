import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getGallery, updateGalleryById } from '../store/gallery/galleryActions';


const EditGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const gallery = useSelector((state) => state.gallery.currentGallery);
  const [title, setTitle] = useState(gallery?.title || "");
  const [description, setDescription] = useState(gallery?.description || "");
  const [imageUrls, setImageUrls] = useState(gallery?.images?.map((image) => image.url) || []);
  const [errors, setErrors] = useState({});
  const authenticatedUserId = useSelector((state) => state.user.user.id);

  useEffect(() => {
    
    if (gallery) {
      
      setTitle(gallery.title);
      setDescription(gallery.description);
      setImageUrls(gallery.images.map((image) => image.url));
      }else{
        navigate('/');
      }
   
  }, [gallery]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const galleryData = {
      title,
      description,
      imageUrls,
    };

    dispatch(updateGalleryById(id, galleryData))
      .then(() => navigate(`/galleries/${gallery.id}`))
      .catch((error) => {
            console.log(error);
            setErrors({
              form: 'Validation error:', error 
            });
      });
  };


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageUrlChange = (index, e) => {
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls[index] = e.target.value;
    setImageUrls(updatedImageUrls);
  };

  const addImageUrlField = () => {
    const updatedImageUrls = [...imageUrls, ''];
    setImageUrls(updatedImageUrls);
  };

  const removeImageUrlField = (index) => {
    if (imageUrls.length === 1) {
      return;
    }
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls.splice(index, 1);
    setImageUrls(updatedImageUrls);
  };
  const moveImageUrlUp = (index) => {
    if (index === 0) {
      return;
    }
    const updatedImageUrls = [...imageUrls];
    [updatedImageUrls[index - 1], updatedImageUrls[index]] = [
      updatedImageUrls[index],
      updatedImageUrls[index - 1],
    ];
    setImageUrls(updatedImageUrls);
  };

  const moveImageUrlDown = (index) => {
    if (index === imageUrls.length - 1) {
      return;
    }
    const updatedImageUrls = [...imageUrls];
    [updatedImageUrls[index], updatedImageUrls[index + 1]] = [
      updatedImageUrls[index + 1],
      updatedImageUrls[index],
    ];
    setImageUrls(updatedImageUrls);
  }; 

  

  return (
    <form onSubmit={handleSubmit} className="container" style={{ width: '500px' }}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">URL-images:</label>
        {imageUrls.map((url, index) => (
          <div key={index} className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={url}
              onChange={(e) => handleImageUrlChange(index, e)}
              required
            />
            {imageUrls.length > 1 && (
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeImageUrlField(index)}
                >
                  Delete
                </button>
                {index > 0 && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => moveImageUrlUp(index)}
                  >
                    Up
                  </button>
                )}
                {index < imageUrls.length - 1 && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => moveImageUrlDown(index)}
                  >
                    Down
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={addImageUrlField}>
          Add image
        </button>
      </div>
      {errors.form && (
          <div className="alert alert-danger" role="alert">
            {errors.form}
          </div>
        )}
      <div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(`/galleries/${gallery.id}`)}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditGallery;