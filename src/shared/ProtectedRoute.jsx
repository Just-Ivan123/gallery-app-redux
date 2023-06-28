import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    return <>{children}</>;
  }

  return <Navigate to={"/login"}></Navigate>;
};

export default ProtectedRoute;