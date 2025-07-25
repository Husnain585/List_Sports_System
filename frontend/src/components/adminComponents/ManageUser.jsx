import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function ManageUser() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'pending', 'approved', 'rejected'

  // Use Effect for User Fetching
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/users/getAllCoaches"
        );
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleApproval = async (userId, userType) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${userId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.data.success) {
        setAllUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId
              ? { ...user, approved: true, status: "approved" }
              : user
          )
        );
        toast.success(`${userType} approved successfully`);
      } else {
        throw new Error(response.data.message || "Approval failed");
      }
    } catch (error) {
      toast.error(
        "Approval failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  const handleRejection = async (userId, userType) => {
    if (window.confirm(`Are you sure you want to reject this ${userType}?`)) {
      try {
        await axios.delete(`http://localhost:3000/users/${userId}/reject`);
        setAllUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        toast.success(`${userType} rejected and removed from the system`);
      } catch (error) {
        toast.error("Rejection failed");
      }
    }
  };

  const handleEventApproval = async (eventId) => {
    try {
      const response = await axios.patch(`http://localhost:3000/events/${eventId}/approve`);
      if (response.data.success) {
        setEvents(prevEvents =>
          prevEvents.map(event =>
            event._id === eventId ? { ...event, approved: true } : event
          )
        );
        toast.success("Event approved successfully");
      } else {
        toast.error("Event approval failed");
      }
    } catch (error) {
      toast.error("Error approving event");
    }
  };
  const filteredUsers = allUsers.filter((user) => {
    if (filter === "all") return true;
    if (filter === "pending") return user.status === "pending";
    if (filter === "approved") return user.status === "approved";
    if (filter === "rejected") return user.status === "rejected";
    return true;
  });
  return (<div>
        <div className="flex justify-center space-x-4 mb-6">
                {["all", "pending", "approved"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full border transition font-medium ${
                      filter === f
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)} Users
                  </button>
                ))}
              </div>
              {/* User Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 overflow-hidden bg-gray-100 rounded-2xl shadow-lg"
              >
                <div className="h-full w-full  rounded-2xl">
                  <table className="min-w-full table-auto">
                    <thead className="bg-blue-600 text-white sticky top-0 z-10">
                      <tr>
                        {["Name", "Email", "Role", "Status", "Actions"].map(
                          (header) => (
                            <th
                              key={header}
                              className="px-6 py-4 text-left text-sm font-semibold tracking-wide"
                            >
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <motion.tr
                            key={user._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            whileHover={{ scale: 1.01 }}
                            className="group hover:bg-blue-50 transition"
                          >
                            <td className="px-6 py-4 text-gray-800 group-hover:text-blue-700 font-medium transition-all">
                              {user.name}
                            </td>
                            <td className="px-6 py-4 text-gray-700 group-hover:text-blue-700 transition-all">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 text-gray-600 group-hover:text-blue-700 transition-all">
                              {user.role}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                  user.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : user.status === "rejected"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {user.status || "pending"}
                              </span>
                            </td>
                            <td className="px-6 py-4 space-x-2">
                              {user.status !== "approved" ? (
                                <>
                                  <button
                                    onClick={() => handleApproval(user._id, user.role)}
                                    className="text-green-600 hover:text-green-800 font-medium transition"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleRejection(user._id, user.role)}
                                    className="text-red-600 hover:text-red-800 font-medium transition"
                                  >
                                    Reject
                                  </button>
                                </>
                              ) : (
                                <span className="text-gray-400">Approved</span>
                              )}
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center text-gray-500 px-6 py-6 text-sm"
                          >
                            No users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
  </div>);
}

export default ManageUser;

