import React, { useState, useEffect } from "react";
import useUser from "../../../contexts/UserContext";
import useTheme from "../../../contexts/ThemeContext";

function Profile() {
  const { user, setUser } = useUser();
  const { themeMode } = useTheme();

  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // Load profile image if user is logged in
  useEffect(() => {
    const savedImageId = user?.profileImageId || localStorage.getItem("profileImageId");
    if (savedImageId) {
      setImageUrl(`http://localhost:3000/img/${savedImageId}`);
    }
  }, [user]);

  // Create image preview
  useEffect(() => {
    if (img) {
      const previewUrl = URL.createObjectURL(img);
      setPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [img]);

  const handleUpload = async () => {
    if (!img) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", img);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("Server response:", data);

      if (data.imageId) {
        const updatedUser = {
          ...user,
          profileImageId: data.imageId,
        };
        setUser(updatedUser);
        localStorage.setItem("profileImageId", data.imageId);
        setImageUrl(`http://localhost:3000/img/${data.imageId}`);
        setPreview(null);
        setImg(null);
        alert("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-500 font-medium">
        You must be logged in to view your profile.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-all">
        <h1
          className={`text-3xl font-bold text-center mb-6 ${
            themeMode === "dark" ? "text-teal-300" : "text-teal-700"
          }`}
        >
          My Profile
        </h1>

        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            {preview || imageUrl ? (
              <img
                src={preview || imageUrl}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-teal-400 shadow-md transition-transform duration-200 group-hover:scale-105"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center text-3xl font-bold shadow-md group-hover:scale-105 transition-transform">
                {user.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}

            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 bg-blue-600 dark:bg-blue-400 text-white text-sm w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform ring-2 ring-white dark:ring-gray-900"
              title="Upload new profile picture"
            >
              +
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>

          <div className="text-center mt-2">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{user.name}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{user.email || "No email provided"}</p>
          </div>

          <button
            onClick={handleUpload}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
          >
            Upload Profile Picture
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
