import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { auth } from "../services/firebase";

export const ProtectedRoute = ({ isSignedIn, children }) => {
  if (isSignedIn) {
    return children;
  }
  return <Navigate to="/login" replace />;
};
