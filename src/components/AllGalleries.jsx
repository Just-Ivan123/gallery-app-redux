import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchGalleries } from "../store/gallery/galleryActions";
import { searchGalleriesAction, clearSearchGalleriesAction } from '../store/gallery/galleryActions';
import {
  setGalleries,
  addGallery,
  updateGallery,
  setCurrentPage,
  setLastPage,
} from "../store/gallery/gallerySlice";
import { getAllGalleries } from "../services/galleryService";

const AllGalleries = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const galleries = useSelector((state) => state.gallery.galleries);
  const [searchQuery, setSearchQuery] = useState('');
  const currentPage = useSelector((state) => state.gallery.currentPage);
  const lastPage = useSelector((state) => state.gallery.lastPage);


  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchButtonClick = () => {
    dispatch(searchGalleriesAction(searchQuery));
  };

  const handleClearSearchButtonClick = () => {
    dispatch(clearSearchGalleriesAction());
    setSearchQuery('');
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
  
      dispatch(fetchGalleries(currentPage - 1));
     
    }
  };

  const goToNextPage = () => {
    if (currentPage < lastPage) {
      
      dispatch(fetchGalleries(currentPage + 1));
      
    }
  };

  return (
    <div className="container">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button className="btn btn-primary" onClick={handleSearchButtonClick}>
            Search
          </button>
          <button className="btn btn-primary" onClick={handleClearSearchButtonClick}>
            Clear
          </button>
          </div>
          
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {Array.isArray(galleries)&&galleries.length !== 0 ? (
          galleries.map((gallery) => (
            <div key={gallery.id} className="col m-5" style={{ width: "340px" }}>
              <div className="card shadow-sm">
                <div className="card-body bg-light border rounded border">
                  <img
                    src={gallery.images[0].url}
                    className="card-img-top"
                    alt={`${gallery.title}`}
                    width="100"
                    height="300"
                  />
                  <h3 className="card-text">{gallery.title}</h3>
                  <div className="mb-1 text-body-secondary">
                    {gallery.user.first_name} {gallery.user.last_name}
                  </div>
                  <p className="card-text">{gallery.description}</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Link
                      className="btn btn-outline-success"
                      to={`/galleries/${gallery.id}`}
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No galleries found.</div>
        )}
      </div>
      <nav
        className="d-flex justify-content-center"
        aria-label="Page navigation example"
      >
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">Page {currentPage}</span>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={goToNextPage}
              disabled={currentPage === lastPage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AllGalleries;