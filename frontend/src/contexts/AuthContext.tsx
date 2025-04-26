import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { User, AuthContextType } from "../types";
import {
  getCurrentUser,
  saveUser,
  getUserByEmailOrUsername,
  saveAuthState,
  clearAuthState,
} from "../utils/localStorage";
import { sendRegistrationEmail } from "../services/emailService";
import { userApi } from "../services/api";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const register = async (userData: Omit<User, "id" | "role">) => {
    try {
      // Check if email or username already exists
      const existingUser = getUserByEmailOrUsername(userData.email) || 
                           getUserByEmailOrUsername(userData.username);
      
      if (existingUser) {
        return false;
      }

      const newUser: User = {
        ...userData,
        id: uuidv4(),
        role: "user",
      };

      saveUser(newUser);
      sendRegistrationEmail(newUser);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const login = async (emailOrUsername: string, password: string) => {
    try {
      const response = await userApi.login({ emailOrUsername, password });
      const { token, user } = response;

      // Save token
      localStorage.setItem('token', token);
      
      // Save auth state
      saveAuthState(user.id);
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      // Return the user object to allow role-based redirection in the component
      return user; 
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Re-throw the error to be caught in the component
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    clearAuthState();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    currentUser,
    isAuthenticated,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};