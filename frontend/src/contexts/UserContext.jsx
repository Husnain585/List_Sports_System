import React, { createContext, useContext, useState } from "react";

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
