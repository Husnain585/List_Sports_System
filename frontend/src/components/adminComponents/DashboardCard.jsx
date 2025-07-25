import React from 'react';
import { motion } from "framer-motion";
import "./DashboardCard.css"; 


export default function DashboardCard({ title, icon, sub = [], type }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      
    >
      <div className="box flex items-center space-x-4 mb-3">
        <div className="text-blue-600 dark:text-blue-400 text-3xl drop-shadow-sm">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>

      {sub.length > 0 && (
        <ul className="text-gray-700 dark:text-gray-300 text-sm list-disc list-inside space-y-1">
          {sub.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}

      {type === "chart" && (
        <div className="h-24 mt-4 rounded-lg bg-gradient-to-r from-gray-200/40 to-gray-300/20 dark:from-gray-700/50 dark:to-gray-800/30 animate-pulse" />
      )}
    </motion.div>
  );
}
