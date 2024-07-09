import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const checkToken = () => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (cookie) {
      const tokenValue = cookie.split('=')[1];
      setToken(tokenValue);
    } else {
      setToken(null);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
};