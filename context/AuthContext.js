// AuthContext.js
"use client";
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));


    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <AuthContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </AuthContext.Provider>
  );
};

// App.js (or any other component file)

