import React from "react";
import Fire from "../../assets/fire.png";
import Party from "../../assets/partying-face.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-black/60 backdrop-blur-sm">
      {/* Logo */}
      <h1 className="text-4xl font-extrabold text-red-600">Movie4u</h1>

      {/* Search Bar + Button */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search any movie..."
          className="rounded-lg bg-black text-white border border-gray-700 p-2 w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
