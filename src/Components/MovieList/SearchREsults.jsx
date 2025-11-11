import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

const SearchResults = () => {
  const { query } = useParams();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE}/api/search?q=${query}`);
        const data = await res.json();
        console.log("Fetched movies:", data.results);
        setMovies(data.results || []);
      } catch (err) {
        console.error("❌ Error fetching search results:", err);
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchMovies();
  }, [query]);

 return (
  <div className="min-h-screen bg-black text-white">

  <div className="px-8 py-6">
    <h2 className="text-2xl font-bold text-yellow-300 mb-6">
      Search Results for "{query}"
    </h2>

    {loading ? (
      <p className="text-gray-300 text-lg">Loading movies...</p>
    ) : error ? (
      <p className="text-red-400 text-lg">{error}</p>
    ) : movies.length === 0 ? (
      <p className="text-gray-400 text-lg">No movies found.</p>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    )}
  </div>
  </div>
);

};

export default SearchResults;
