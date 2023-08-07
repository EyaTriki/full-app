// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for an existing token in local storage or any other storage mechanism you are using
    const token = localStorage.getItem('access_token');

    if (token) {
      // Validate the token if necessary (e.g., check expiration)
      const isValidToken = validateToken(token);
      setIsAuthenticated(isValidToken);
    }
  }, []);

  const validateToken = (token) => {
    // Add your token validation logic here
    // For example, you can use jwt-decode library to check if the token is expired or valid
    try {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  // Update the authentication state when the user logs in
  const handleLogin = (token) => {
    localStorage.setItem('access_token', token);
    setIsAuthenticated(true);
  };

  // Update the authentication state when the user logs out
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  // Add any other necessary authentication-related state and functions here

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
