import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/movie-info/${id}`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(" Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading)
    return <p className="text-white text-center mt-10">Loading...</p>;

  if (!movie)
    return (
      <p className="text-red-500 text-center mt-10">
        Movie not found...
      </p>
    );

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/fallback-poster.png";

  //  Safe cast handling (array or string)
  const castList = Array.isArray(movie.cast)
    ? movie.cast.join(", ")
    : movie.cast || "N/A";

  return (
    <div className="p-6 text-white flex flex-col md:flex-row gap-8">
      {/* Poster */}
      <img
        src={poster}
        alt={movie.title}
        className="rounded-2xl shadow-xl w-full md:w-1/3"
      />

      {/* Details */}
      <div className="flex flex-col gap-3 md:w-2/3">
        <h1 className="text-3xl font-bold">{movie.title}</h1>

        <p>
          <strong>Release Date:</strong> {movie.release_date || "N/A"}
        </p>

        <p>
          <strong>Rating:</strong> ⭐ {movie.vote_average ?? movie.rating ?? "N/A"}
        </p>

        <p>
          <strong>Director:</strong> {movie.director || "N/A"}
        </p>

        <p>
          <strong>Cast:</strong> {castList}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
