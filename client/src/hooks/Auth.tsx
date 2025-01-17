import React, { createContext, useContext, useState, useEffect } from "react";
import { user_login, logout_user, auth_check } from "../services/userAPI";

// Define types for AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<{ success: boolean }>;
}

interface UserType {
  id: number;
  username: string;
  email: string;
}

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {
    throw new Error("login function not implemented");
  },
  logout: async () => {
    throw new Error("logout function not implemented");
  },
  checkAuth: async () => {
    throw new Error("checkAuth function not implemented");
  },
});

// AuthProvider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  // Check if the user is authenticated
  const checkAuth = async (): Promise<{ success: boolean }> => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Retrieve user from localStorage
        setIsAuthenticated(true); // Set authentication state from localStorage
        return { success: true };
      } else {
        const response = await auth_check();
        if (response.success) {
          setIsAuthenticated(true);
          setUser(response.data.user || null);
          localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user in localStorage
          return { success: true };
        } else {
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem("user"); // Clear user from localStorage if not authenticated
          return { success: false };
        }
      }
    } catch (error) {
      console.error("Failed to check authentication:", error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("user"); // Clear user from localStorage on error
      return { success: false };
    }
  };

  // Login function using user_login from userAPI
  const login = async (email: string, password: string) => {
    try {
      const response = await user_login(email, password); // Call user_login API
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.data.user); // Set user after successful login
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user in localStorage
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid email or password");
    }
  };

  // Logout function using logout_user from userAPI
  const logout = async () => {
    try {
      const response = await logout_user(); // Call logout_user API
      if (response.success) {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("user"); // Remove user from localStorage
      } else {
        console.error("Logout failed:", response.data);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Automatically check authentication status on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
