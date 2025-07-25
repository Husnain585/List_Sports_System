import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './DashboardCard.css';

const navItems = [
  { label: 'User Management', path: '/admin/user-management' },
  { label: 'Create Event', path: '/admin/events' },
  { label: 'Pending Event', path: '/admin/pending-event' },
  { label: 'Pending Teams', path: '/admin/pending-teams' },
  { label: 'Messages', path: '/admin/messages' },
  { label: 'Sports Categories', path: '/admin/sports-categories' },
  { label: 'Reports', path: '/admin/reports' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 12 }}
      className="fixed left-0 top-15 h-screen w-64 z-20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-r border-white/30 dark:border-white/10 p-6 overflow-y-auto"
    >
      <h2 className="relative text-2xl font-bold mb-8 text-teal-700 dark:text-teal-300">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, path }) => {
          const isActive = location.pathname === path;

          return (
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              key={label}
              className={`transition-all duration-300 rounded-xl ${
                isActive ? 'bg-blue-100/60 dark:bg-blue-900/40' : ''
              }`}
            >
              <Link
                to={path}
                aria-current={isActive ? 'page' : undefined}
                className={`block px-4 py-2 rounded-xl text-base font-medium transition-colors duration-200 
                  ${
                    isActive
                      ? 'text-blue-700 dark:text-blue-300 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-white/10'
                  }`}
              >
                {label}
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </motion.aside>
  );
}
