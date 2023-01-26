import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { auth } from "../services/firebase";

export const ProtectedRoute = ({ isSignedIn, children }) => {
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
