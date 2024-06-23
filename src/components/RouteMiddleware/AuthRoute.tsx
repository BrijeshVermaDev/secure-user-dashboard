import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/index";

const AuthRoute = ({ children }: any) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.token);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default AuthRoute;
