import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/login" replace state={{ from: rest.location.pathname }} />
  );
};

export default PrivateRoute;
