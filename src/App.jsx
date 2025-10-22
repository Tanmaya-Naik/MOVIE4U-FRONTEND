import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import MovieList from "./Components/MovieList/MainMovieList";


const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-black text-white">
      <Navbar/>
      <main>
        <MovieList/>
        
      </main>
    </div>

  );
}


export default App