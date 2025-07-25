import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import useUser from "../contexts/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setMessage("Please fill in both email and password.");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      if (data.status === 200 || data.token) {
        const token = data.token || data.data?.token;
        localStorage.setItem("authToken", token);

        const user = data.user || data.data?.user;
        setUser(user);

        const userRole = user?.role;

        if (userRole === "admin") {
          navigate("/admin");
        } else if (userRole === "coach") {
          navigate("/coach-dashboard");
        } else if (userRole === "participant") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }

        setMessage("Successfully logged in");
      }
      if (!data.success && !data.token) {
        setMessage(data.message || "Invalid login credentials.");
        return;
      }
    } catch (error) {
      console.error("Error logging in:", error);

      let msg = "An error occurred while logging in. Please try again.";
      if (error.response) {
        msg = error.response.data?.message || `Error: ${error.response.status}`;
      } else if (error.request) {
        msg = "No response from server. Please try again later.";
      } else {
        msg = error.message;
      }

      setMessage(msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome Back 👋
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Sign in to your account
          </p>
        </div>

        {message && (
          <div
            className={`p-3 rounded-md text-sm font-medium ${
              message.includes("Successfully")
                ? "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900"
                : "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-sm text-blue-600 dark:text-blue-300 hover:underline focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded"
              />
              Remember me
            </label>
            <a
              href="#"
              className="text-blue-600 dark:text-blue-300 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
