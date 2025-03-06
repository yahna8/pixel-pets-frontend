import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // On mount, check for a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Optionally, validate the token or fetch user info
      setUser({ token }); // or set a more descriptive user object
    }
    setAuthLoading(false);
  }, []);

  const login = (access_token) => {
    localStorage.setItem('access_token', access_token);
    setUser({ token: access_token });
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
