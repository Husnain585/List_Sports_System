import React from 'react';
import useUser from "../contexts/UserContext";

function Profile() {
  const { user } = useUser(); // ✅ call the custom hook directly

  if (!user) return <div className="text-center text-gray-600 mt-10">Please login to view your profile.</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Welcome, {user.username}!</h2>
      <p className="text-gray-600 dark:text-gray-300">You are successfully logged in.</p>
    </div>
  );
}

export default Profile;
