import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserContextProvider } from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Test from "./components/Test";
import Register from "./components/Register";
import ParticipantDashboard from "./components/userComponents/ParticipantDashboard";
import AdminPanel from "./components/adminComponents/AdminPanel";

function App() {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const lightTheme = () => setThemeMode("light");
  const darkTheme = () => setThemeMode("dark");

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <UserContextProvider>
        <Router>
          <Navbar />
          <div className="min-h-screen px-4 py-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ParticipantDashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </div>
        </Router>
      </UserContextProvider>
    </ThemeProvider>
  );
}
export default App;
