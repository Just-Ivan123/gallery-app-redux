import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchGalleries, getGalleries } from '../store/gallery/galleryActions';

const AllGalleries = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const galleries = useSelector((state) => state.gallery.galleries);
  const [searchQuery, setSearchQuery] = useState('');
  const currentPage = useSelector((state) => state.gallery.currentPage);
  const lastPage = useSelector((state) => state.gallery.lastPage);

  useEffect(() => {
    dispatch(getGalleries());
  }, [location.pathname]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchButtonClick = () => {
    dispatch(getGalleries(searchQuery));
  };

  const handleClearSearchButtonClick = () => {
    dispatch(getGalleries());
    setSearchQuery('');
  };

  const loadMoreGalleries = () => {
    if(searchQuery === ''){
    dispatch(fetchGalleries(currentPage + 1, searchQuery));
    }else{
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
        {Array.isArray(galleries) && galleries.length !== 0 ? (
          galleries.map((gallery) => (
            <div key={gallery.id} className="col m-5" style={{ width: "340px" }}>
              <div className="card shadow-sm">
                <div className="card-body bg-light border rounded border">
                <Link
                      to={`/galleries/${gallery.id}`} 
                    >
                  <h3 className="card-text">{gallery.title}</h3>
                  </Link>
                  <p>{new Date(gallery.created_at).toLocaleString()}</p>
                  <img
                    src={gallery.images[0].url}
                    className="card-img-top"
                    alt={`${gallery.title}`}
                    width="100"
                    height="300"
                  />
                  
                  <Link
                      to={`/galleries/author/${gallery.user.id}`}
                    >
                  <div className="mb-1 text-body-secondary">
                    {gallery.user.first_name} {gallery.user.last_name} 
                  </div>
                  </Link>
                  <p className="card-text">{gallery.description}</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No galleries found.</div>
        )}
      </div>
      {currentPage < lastPage && (
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-primary" onClick={loadMoreGalleries}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllGalleries;