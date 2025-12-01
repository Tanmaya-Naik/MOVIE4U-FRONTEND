import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Fire from "../../assets/fire.png";
import Party from "../../assets/partying-face.png";

const Navbar = () => {

const [searchTerm, setSearchTerm] =useState("");
const navigate = useNavigate();


const handleSearch = () => {
  if(!searchTerm.trim()) return; //avoid empty search bro

  navigate(`/search/${searchTerm.trim()}`);
};

  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-black/60 backdrop-blur-sm">
      {/* Logo */}
      <h1 className="text-4xl font-extrabold text-red-600">Movie4u</h1>

      {/* Search Bar + Button */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search any movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="rounded-lg bg-black text-white border border-gray-700 p-2 w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Search
        </button>

      {/* watchlist */}
      <Link 
      to="/watchlist"
      className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 m-5 rounded-lg transition ">
        Watchlist
      </Link>
      </div>
    </nav>
  );
};

export default Navbar;
