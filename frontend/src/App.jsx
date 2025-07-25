import React, { useState, useEffect } from "react";
//  Context and Router imports
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserContextProvider } from "./contexts/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// General Component imports
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
// User specific components
import ParticipantDashboard from "./components/userComponents/ParticipantDashboard";
// Admin specific components
import AdminPanel from "./components/adminComponents/AdminPanel";
import CreateEvent from "./components/adminComponents/CreateEvent";
import CoachPanel from "./components/coachComponents/CoachPanel";
import ProfileCard from "./components/userComponents/uiComponents/ProfileCard";
import Profile from "./components/userComponents/uiComponents/Profile";
import ManageUser from "./components/adminComponents/ManageUser";
// Coach specific components

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
              {/* Admin specified Routr */}
              <Route path="/admin" element={<AdminPanel />} />
              {/* <Route path="/admin/user-management" element={<ManageUser />} /> */}

              <Route path="/admin/events" element={<CreateEvent />} />

              {/* Coach specified Route */}
              <Route path="/coach" element={<CoachPanel />} />
              {/* Add more routes as needed */}
              <Route path="/view-profile" element={<Profile />} />
            </Routes>
          </div>
        </Router>
      </UserContextProvider>
    </ThemeProvider>
  );
}
export default App;
