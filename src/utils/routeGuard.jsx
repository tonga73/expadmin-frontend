import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ isSignedIn, children }) => {
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
