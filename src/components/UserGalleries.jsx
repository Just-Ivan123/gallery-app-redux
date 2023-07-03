import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import { fetchUserGalleries, getUserGalleries } from '../store/gallery/galleryActions';

const UserGalleries = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const galleries = useSelector((state) => state.gallery.galleries);
  const authenticatedUserId = useSelector((state) => state.user.user.id);
  const [searchQuery, setSearchQuery] = useState('');
  const currentPage = useSelector((state) => state.gallery.currentPage);
  const lastPage = useSelector((state) => state.gallery.lastPage);
  const user_id = location.pathname === "/my-galleries" ? authenticatedUserId : id;

  useEffect(() => {
    const fetchData = async () => {
          dispatch(getUserGalleries(user_id));
    };

    if (authenticatedUserId) {
      fetchData();
    }
   
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchButtonClick = () => {
    dispatch(getUserGalleries(user_id, searchQuery));
  };

  const handleClearSearchButtonClick = () => {
    dispatch(getUserGalleries(user_id));
    setSearchQuery('');
  };

  const loadMoreGalleries = () => {
    if(searchQuery === ''){
      dispatch(fetchUserGalleries(user_id, currentPage + 1, searchQuery));
      }else{
        dispatch(fetchUserGalleries(user_id, currentPage + 1));
      }
  };

  return (
    <div className="container">
        <div className="d-flex mt-3" style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            style= {{width: "30%"}}
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
                  <img
                    src={gallery.images[0].url}
                    className="card-img-top"
                    alt={`${gallery.title}`}
                    width="100"
                    height="300"
                  />
                   <Link
                      to={`/galleries/${gallery.id}`}
                    >
                  <h3 className="card-text">{gallery.title}</h3>
                  </Link>
                  <Link
                      to={`/galleries/author/${gallery.user.id}`}
                    >
                      <p>{new Date(gallery.created_at).toLocaleString()}</p>
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

export default UserGalleries;