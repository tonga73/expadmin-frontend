import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../services/firebase";

export const ProtectedRoute = ({ children }) => {
  const { user } = auth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
