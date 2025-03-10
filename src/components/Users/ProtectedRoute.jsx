import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({
  component: Component,
  allowedRoles = [],
  ...rest
}) => {
  const [jwtDecode, setJwtDecode] = useState(null); // State to hold the dynamically imported function
  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  // Dynamically import jwt-decode
  useEffect(() => {
    const loadJwtDecode = async () => {
      const module = await import("jwt-decode");
      setJwtDecode(() => module.default); // Set the default export (jwt_decode) after loading
    };
    loadJwtDecode();
  }, []); // Only run once when the component mounts

  // Check if the token is expired
  const isTokenExpired = (token) => {
    if (jwtDecode) {
      const decodedToken = jwtDecode(token); // Now using the dynamically imported jwt_decode
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decodedToken.exp < currentTime; // Check if token is expired
    }
    return true; // Return true if jwt_decode is not yet loaded (fallback)
  };

  // If no auth token or token is expired, redirect to login
  if (!authToken || isTokenExpired(authToken)) {
    localStorage.removeItem("authToken"); // Clear expired token
    localStorage.removeItem("userRole"); // Clear expired role
    return <Navigate to="/login" />;
  }

  // If user doesn't have the correct role, redirect them
  if (
    allowedRoles.length > 0 &&
    (!userRole || !allowedRoles.includes(userRole))
  ) {
    return <Navigate to="/" />; // Redirect to Home if not allowed
  }

  // If authenticated and has correct role, render the requested component
  return <Component {...rest} />;
};

export default ProtectedRoute;
