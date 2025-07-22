import React from "react";

export default function Test() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-yellow-900 text-white font-sans">
      {/* Navbar */}
      <header className="flex items-center justify-between px-10 py-6 border-b border-gray-700">
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 font-bold text-xl tracking-wide">
          WE03
        </div>
        <nav className="space-x-8 text-sm font-medium text-gray-400 hover:text-white">
          <ul className="flex items-center">
            {["PRODUCTS","SOLUTIONS","CUSTOMER","PRICING","RESOURCES"].map((item) => (
              <li key={item} className="hover:text-white cursor-pointer transition">{item}</li>
            ))}
          </ul>
        </nav>
        <button
          className="flex items-center space-x-1 text-white font-semibold text-sm hover:underline cursor-pointer"
          aria-label="Register now"
        >
          <span>REGISTER NOW</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </header>

      {/* Main Title */}
      <main className="flex flex-col justify-center items-center mt-20 px-6 text-center max-w-6xl mx-auto">
        <h1 className="text-6xl sm:text-8xl font-extrabold text-gradient-web3 tracking-wide leading-tight select-none">
          Web3&nbsp;
          <span className="text-gradient-design">Design</span>
        </h1>
        <h2 className="mt-4 text-6xl sm:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 select-none">
          Agency.
        </h2>
      </main>
    </div>
  );
}

/* Custom CSS for text gradients (Tailwind doesn't have a default gray to white gradient) */

