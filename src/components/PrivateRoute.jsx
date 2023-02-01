import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PrivateRoute = ({ children, user }) => {
  const location = useLocation();
  useEffect(() => {
    if (!user && location.pathname !== "/login") {
      location.pathname = "/login";
    }
  }, [user, location]);

  return user ? children : null;
};

export default PrivateRoute;
