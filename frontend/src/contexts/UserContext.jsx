import React, { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

// Step 1: Create Context
export const UserContext = createContext({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
});

// Step 2: Provider Component
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isLoggedIn = !!user;

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Optional: check token expiration
        if (decoded.exp * 1000 < Date.now()) {
          console.warn("Token expired");
          localStorage.removeItem("authToken");
          setUser(null);
        } else {
          setUser(decoded); // Or fetch user from API if needed
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("authToken");
      }
    }
  }, []);

  // Optional: persist user info in localStorage (if decoded doesn't include all)
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

// Step 3: Custom Hook
export default function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
}
