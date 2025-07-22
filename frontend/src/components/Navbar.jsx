import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../contexts/ThemeContext";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { themeMode, lightTheme, darkTheme } = useTheme();

  const toggleTheme = () => {
    themeMode === "light" ? darkTheme() : lightTheme();
  };

  // Simulated user data
  const user = {
    name: "John Doe",
    profileImage: "https://via.placeholder.com/40",
  };

  const handleProfileClick = () => {
    setIsDropdownOpen((open) => !open);
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
        navigate("/login");
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
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
            >
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="font-semibold text-xl select-none">
                LIST Sports Support Society
              </span>
            </Link>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title="Toggle Theme"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-yellow-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {themeMode === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12h-1m15.364 4.95l-.707-.707M6.343 6.343l-.707-.707m12.02 12.02l-.707-.707M6.343 17.657l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="none"
                >
                  <path d="M21 12.79A9 9 0 0111.21 3a7 7 0 000 14 9 9 0 019.79-4.21z" />
                </svg>
              )}
            </button>

            {/* User Profile */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={handleProfileClick}
                  className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  <img
                    src={user.profileImage}
                    alt={`Profile of ${user.name}`}
                    className="h-10 w-10 rounded-full border-2 border-gray-300 dark:border-gray-600"
                    draggable={false}
                  />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50
                      origin-top-right
                      animate-dropdown-fade-in
                    "
                    role="menu"
                    aria-orientation="vertical"
                    aria-label="User menu"
                  >
                    <button
                      onClick={() => handleOptionClick("view")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                      role="menuitem"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleOptionClick("edit")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                      role="menuitem"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => handleOptionClick("logout")}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Auth links for unauthenticated user
              <div className="hidden sm:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors duration-150 font-medium"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-150 font-medium"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animation for dropdown */}
      <style>{`
        @keyframes dropdownFadeIn {
          0% {
            opacity: 0;
            transform: translateY(-8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-dropdown-fade-in {
          animation: dropdownFadeIn 200ms ease forwards;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
