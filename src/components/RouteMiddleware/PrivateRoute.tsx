import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/index";

const PrivateRoute = ({ children }: any) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.token);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default PrivateRoute;
