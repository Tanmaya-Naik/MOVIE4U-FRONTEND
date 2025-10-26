import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  if (!movie) return null;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/fallback-poster.png";

  const title = movie.original_title || movie.title || "Untitled";
  const date = movie.release_date || "N/A";
  const rating = movie.vote_average ?? movie.rating ?? "-";
  const overview = movie.overview || "";

  return (
    <Link
      to={`/movie/${movie.id}`} // ✅ Fixed route to match App.jsx
      className="block w-48 md:w-52 rounded-lg overflow-hidden shadow-md transform transition-transform duration-200 hover:scale-105 no-underline"
    >
      <div className="relative">
        <img src={poster} alt={title} loading="lazy" className="w-full h-auto block" />
        <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>

        <div className="absolute bottom-0 left-0 w-full px-3 pb-3 pt-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-sm font-semibold text-yellow-300 leading-tight line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center justify-between mt-1 text-xs font-medium text-yellow-300">
            <span>{date}</span>
            <span>{rating}</span>
          </div>
          <p className="mt-2 text-xs italic text-white/90 line-clamp-3">
            {overview.length > 100 ? overview.slice(0, 100) + "…" : overview}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
