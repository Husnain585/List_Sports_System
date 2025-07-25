import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import "./DashboardCard.css"; // Ensure claymorphic card styles are defined here

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateEvent = async () => {
    if (!title || !eventDate || !location || !description) {
      toast.error("Please fill all event fields");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:3000/events/creatEvent",
        { title, date: eventDate, location, description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (data.success || data.message === "Event created successfully") {
        toast.success(data.message || "Event created successfully");
        setTitle("");
        setEventDate("");
        setLocation("");
        setDescription("");
      } else {
        toast.error(data.message || "Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error(error.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-10 py-12 bg-gradient-to-tr from-gray-100 to-white dark:from-gray-950 dark:to-gray-900">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center text-gray-800 dark:text-white mb-12 drop-shadow-xl"
      >
        🎉 Create an Event
      </motion.h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Form Card */}
        <motion.div
          whileHover={{ scale: 1.015 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card w-full max-w-xl p-10 space-y-6"
        >
          <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-300 text-center mb-4">
            Event Details
          </h2>

          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/70 dark:bg-white/10 dark:text-white border border-white/30 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-700 dark:focus:ring-teal-300 transition"
          />

          <textarea
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-5 py-3 rounded-xl bg-white/70 dark:bg-white/10 dark:text-white border border-white/30 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-700 dark:focus:ring-teal-300 transition resize-none"
          />

          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/70 dark:bg-white/10 dark:text-white border border-white/30 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-700 dark:focus:ring-teal-300 transition"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/70 dark:bg-white/10 dark:text-white border border-white/30 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-700 dark:focus:ring-teal-300 transition"
          />

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleCreateEvent}
            className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 dark:bg-teal-300 dark:hover:bg-teal-400 text-white dark:text-black font-semibold shadow-lg transition duration-300"
          >
            🚀 Create Event
          </motion.button>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden md:block max-w-lg"
        >
          <div className="w-full max-w-md mx-auto">
            <svg
              width="400"
              height="400"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto drop-shadow-2xl"
            >
              {/* You can change SVG fills here to match teal theme if you want */}
              <rect x="6" y="12" width="52" height="40" rx="6" fill="#14b8a6" />
              <rect x="6" y="12" width="52" height="12" rx="3" fill="#0f766e" />
              <rect x="14" y="6" width="8" height="14" rx="3" fill="#0f766e" />
              <rect x="42" y="6" width="8" height="14" rx="3" fill="#0f766e" />
              <g fill="#2dd4bf">
                {[14, 24, 34, 44].map((x) => (
                  <rect key={`r1-${x}`} x={x} y="28" width="6" height="6" rx="1" />
                ))}
                {[14, 24, 34, 44].map((x) => (
                  <rect key={`r2-${x}`} x={x} y="38" width="6" height="6" rx="1" />
                ))}
                {[14, 24, 34, 44].map((x) => (
                  <rect key={`r3-${x}`} x={x} y="48" width="6" height="6" rx="1" />
                ))}
              </g>
              <path
                d="M44 36l8-8m-2-2l-8 8-5 5-3 1 1-3 5-5 8-8z"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M46 28l4 4"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CreateEvent;
