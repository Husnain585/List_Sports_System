import React, { useState, useRef, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import useTheme from "../contexts/ThemeContext";
import useUser from "../contexts/UserContext";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { themeMode, lightTheme, darkTheme } = useTheme();
  const { user } = useUser();

  const toggleTheme = () => {
    themeMode === "light" ? darkTheme() : lightTheme();
  };

  const handleProfileClick = () => {
    setIsDropdownOpen((open) => !open);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const handleOptionClick = (option) => {
    setIsDropdownOpen(false);
    switch (option) {
      case "edit":
        navigate("/edit-profile");
        break;
      case "view":
        navigate("/view-profile");
        break;
      case "logout":
        handleLogout();
        redirect("/login");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
          >
            <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="font-semibold text-xl select-none">
              LIST Sports Support Society
            </span>
          </Link>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-yellow-300 transition-colors duration-300"
            >
                {themeMode === "light" ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12h-1M15.36 17.95l-.71-.71M6.34 6.34l-.71-.71M18.36 18.36l-.71-.71M6.34 17.66l-.71-.71M12 7a5 5 0 100 10 5 5 0 000-10z" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 0111.21 3a7 7 0 000 14 9 9 0 009.79-4.21z" />
                  </svg>
                )}
            </button>

              
            {/* User Avatar */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button onClick={handleProfileClick} className="flex items-center space-x-2 focus:outline-none">
                  <div
                    className="h-10 w-10 rounded-full 
                    bg-gradient-to-br from-purple-500 to-indigo-600 
                    dark:from-pink-600 dark:to-purple-800 
                    text-white 
                    font-bold 
                    flex items-center justify-center 
                    text-sm sm:text-base 
                    shadow-md hover:scale-105 transition-transform duration-200 ease-out"
                    title={user.name}
                  >
                    {user.name?.slice(0, 1).toUpperCase()}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 
                    bg-white dark:bg-gray-800 
                    border border-gray-200 dark:border-gray-700 
                    rounded-md shadow-lg z-50 animate-dropdown-fade-in"
                  >
                    <button
                      onClick={() => handleOptionClick("view")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleOptionClick("edit")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => handleOptionClick("logout")}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 font-medium"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 font-medium">
                      <span>Sign up</span>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg> */}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dropdownFadeIn {
          0% { opacity: 0; transform: translateY(-8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-dropdown-fade-in {
          animation: dropdownFadeIn 200ms ease forwards;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
