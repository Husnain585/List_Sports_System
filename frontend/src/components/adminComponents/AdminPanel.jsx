import React, { useEffect, useState } from 'react';
import Particles from './uiComponents/Particles';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';

function AdminPanel() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);

    const observer = new MutationObserver(() => {
      const updatedDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(updatedDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const particleColors = isDarkMode
    ? ['#ffffff', '#e0f7ff', '#cce7ff']
    : ['#000000', '#222222', '#444444'];

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Fixed Background Particles */}
      <div className="fixed inset-0 z-0">
        <Particles
          particleColors={particleColors}
          particleCount={600}
          particleSpread={12}
          speed={0.2}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content with left padding for Sidebar */}
      <div className="relative z-10 pl-64 min-h-screen">
        <div className="p-6 overflow-y-auto">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
