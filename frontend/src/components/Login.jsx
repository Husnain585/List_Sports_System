import React, { useState } from "react";
import useUser from "../contexts/UserContext"; // custom hook, not the context directly

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser(); // ✅ using custom hook

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ username, password }); // just an example; add auth logic here
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
