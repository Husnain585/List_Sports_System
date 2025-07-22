import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserContextProvider } from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const lightTheme = () => setThemeMode("light");
  const darkTheme = () => setThemeMode("dark");

    const [user, isLoggedIn] = useState(null);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <UserContextProvider>
      <Router>
        <Navbar />
        <Login />
        <Profile />
      </Router>
      </UserContextProvider>
    </ThemeProvider>
  );
}

export default App;
