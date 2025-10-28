import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import MainMovieList from "./Components/MovieList/MainMovieList";
import MovieDetails from "./Components/MovieList/MovieDetails";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-black to-black text-white">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<MainMovieList />} />
            <Route path="/movie/:id" element={<MovieDetails />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
