import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGallery, removeGallery, postComment,removeComment } from "../store/gallery/galleryActions";
import { Carousel } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SingleGallery = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const gallery = useSelector((state) => state.gallery.currentGallery);
  const navigate = useNavigate();
  const authenticatedUserId = useSelector((state) => state.user.user.id);
  const signedIn = useSelector((state) => state.user.signedIn);
  const [content, setCommentContent] = useState("");
  const [gallery_id, setGalleryId] = useState(id);


  useEffect(() => {
    dispatch(getGallery(id));
  }, [dispatch, id]);

  if (!gallery) {
    return <div>Loading...</div>;
  }
  const handleEdit = () => {
    navigate(`/edit-gallery/${id}`);
  };

  const handleDelete = () => {
    const shouldDelete = window.confirm("Are you sure?");
    if (shouldDelete) {
    dispatch(removeGallery(id));
    navigate('/my-galleries');
    }
  };

  const handleCommentChange = (e) => {
   setCommentContent(e.target.value);
  };

  const handleAddComment = (e) => {
    e.preventDefault();

    const commentData = {
      content,
      gallery_id
    };
    if (content.trim() !== "") {
      dispatch(postComment(commentData));
      setCommentContent('');
    }
  };

  const handleDeleteComment = (commentId) => {
    const shouldDelete = window.confirm("Are you sure?");
    if (shouldDelete) {
    dispatch(removeComment(commentId));
    }
  };


  const carouselStyle = {
    border: "5px solid #333", 
    borderRadius: "10px", 
    overflow: "hidden", 
    width: "800px",
     height: "600px",
     margin: "0 auto"
  };

  const formattedDate = new Date(gallery.created_at).toLocaleDateString("en", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  
  return (
    <div className="container">
      <div className="container d-flex justify-content-between">
     <div className="2">
        <h1>{gallery.title}</h1>
        </div>
            {authenticatedUserId === gallery.user.id ? (
            <div className="d-flex justify-content-end">
              <button onClick={handleEdit} className="btn btn-primary">Edit</button>
              <button onClick={handleDelete} className="btn btn-danger ml-2">Delete</button>
            </div>
          ) : null}
      </div>
        <p>
          <strong>Author: </strong>
          <Link
                      to={`/galleries/author/${gallery.user.id}`}
                    >
          {gallery.user.first_name} {gallery.user.last_name}
          </Link>
        </p>
        <p>
          <strong>Created at: </strong>
          {formattedDate}
        </p>
        <p>
          <strong>Description: </strong>
          {gallery.description}
        </p>
      
      <div style={carouselStyle}>
      <Carousel>
        {gallery.images.map((image, index) => (
          <Carousel.Item key={index} >
            <a href={image.url} target="_blank" rel="noopener noreferrer">
            <img
              className="d-block w-100"
              src={image.url}
              alt={`Image ${index + 1}`}
              style={{ width: "800px", height: "600px", objectFit: "fill" }}
            />
            </a>
          </Carousel.Item>
        ))}
      </Carousel>
      </div>
      <div className="mt-4">
  <h3>Comments</h3>
  {gallery.comments.length === 0 ? (
    <p>No comments yet.</p>
  ) : (
    gallery.comments.map((comment, index) => (
      <div key={index} className="border p-2 mt-2">
        <p>
          <strong>{comment.user.first_name}:</strong> {comment.content}
        </p>
        <p>{new Date(comment.created_at).toLocaleDateString("en", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })}</p>
        {authenticatedUserId === comment.user.id ? (
        <button
                onClick={() => handleDeleteComment(comment.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
              ) : null}
      </div>
    ))
  )}
  {signedIn ? (
      <div className="mt-4">
        <h3>Add a Comment</h3>
        <div className="mb-2">
          <textarea
            className="form-control"
            rows="3"
            value={content}
            onChange={handleCommentChange}
          ></textarea>
        </div>
        <div>
          <button onClick={handleAddComment} className="btn btn-primary" disabled={!content}>
            Submit Comment
          </button>
        </div>
      </div>
      ) : null}
</div>
    </div>
  );
};

export default SingleGallery;