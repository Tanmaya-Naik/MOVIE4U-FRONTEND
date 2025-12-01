import React, { useState, useEffect} from "react";
import MovieCard from "./MovieCard";

const WatchList = () => {

    const [movies,setMovies] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
        setMovies(saved);
        
    },[])

    if(movies.length === 0){
        return (
            <div className="text-center text-gray-500 mt-5 text-xl">
                You don't have any movies in your watchlist
                <br />
                Add some to see them here
            </div>
        )

    }
    else {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
                {movies.map(movie => (<MovieCard key={movie.id} movie={movie} />
            ))}
            </div>

        )
    }
};

export default WatchList;