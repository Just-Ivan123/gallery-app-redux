import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSignedIn, signOutUser } from "../store/user/userSlice";
import { logoutUser } from "../services/authService";

const Heading = () => {
  const dispatch = useDispatch();
  const signedIn = useSelector(selectSignedIn);
  const navigate = useNavigate();

  const handleLogOut = () => {
    const shouldLogOut = window.confirm("Are you sure?");
    if (shouldLogOut) {
      logoutUser()
        .then(({ data }) => {
          dispatch(signOutUser());
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span className="fs-4">Gallery App</span>
        </Link>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link to="/" className="nav-link" aria-current="page">
              All Galleries
            </Link>
          </li>
          {signedIn ? (
            <>
              <li className="nav-item">
                <Link to="/my-galleries" className="nav-link" aria-current="page">
                  My Galleries
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link" aria-current="page">
                  Create New Gallery
                </Link>
              </li>
              <li>
                <button
                  className="btn btn-outline-danger"
                  type="submit"
                  onClick={() => handleLogOut()}
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="nav-link" aria-current="page">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/login" className="nav-link" aria-current="page">
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Heading;