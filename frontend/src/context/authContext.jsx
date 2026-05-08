import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, storiesAPI } from '../utils/api';

// 1. Create the Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  const refreshBookmarkCount = async () => {
    if (isAuthenticated) {
      try {
        const response = await storiesAPI.getBookmarkCount();
        setBookmarkCount(response.data.count);
      } catch (error) {
        console.error('Failed to fetch bookmark count:', error);
      }
    } else {
      setBookmarkCount(0);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshBookmarkCount();
    }
  }, [isAuthenticated]);

  // Login function updates state after successful API call
  const login = (user, token) => {
    localStorage.setItem('token', token);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setBookmarkCount(0);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading, bookmarkCount, refreshBookmarkCount }}>
      {children}
    </AuthContext.Provider>
  );
};

// 2. CRITICAL: This is the named export your other files are looking for
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};