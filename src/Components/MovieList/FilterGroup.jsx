import React from "react";

const Filter = ({ minRating = 0, onSelect = () => {}, ratings = [8, 7, 6] }) => {
  return (
    <ul className="flex items-center gap-3">
      {ratings.map((rate) => (
        <li key={rate}>
          <button
            type="button"
            onClick={() => onSelect(rate)}
            className={`px-6 py-2 text-lg font-semibold rounded-md transition-all duration-200
              ${
                minRating === rate
                  ? "bg-gradient-to-r from-red-500 to-orange-400 text-white shadow-md shadow-red-500/40"
                  : "bg-gray-900 hover:bg-neutral-800 text-gray-300 border border-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-red-500`}
          >
            {rate}+ Star
          </button>
        </li>
      ))}

      <li>
        <button
          type="button"
          onClick={() => onSelect(0)}
          className="px-5 py-2 text-lg rounded-md bg-gray-900 text-gray-300 border border-gray-700 hover:bg-neutral-800 focus:ring-2 focus:ring-yellow-400 transition"
        >
          All
        </button>
      </li>
    </ul>
  );
};

export default Filter;
