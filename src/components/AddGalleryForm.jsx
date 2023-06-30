import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postGallery } from '../store/gallery/galleryActions';


const AddGalleryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState(['']);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const galleryData = {
      title,
      description,
      imageUrls,
    };

    dispatch(postGallery(galleryData))
      .then(() => navigate('/my-galleries'))
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
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/my-galleries')}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddGalleryForm;