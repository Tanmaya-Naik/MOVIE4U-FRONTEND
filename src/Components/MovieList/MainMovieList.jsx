import React from 'react'
import { useEffect,useState,useMemo,useRef,useCallback } from 'react';

import Fire from "../../assets/fire.png";
import Filter from './FilterGroup';
import MovieCard from './MovieCard';


const PAGE_LIMIT = 500;

const MainMovieList = () => {
  const [allMovies,setAllMovies]=useState([]);
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [minRating,setMinRating]=useState(0);
  const [category,setCategory]=useState("popular");
  const [sort,setSort]=useState({by:"default", order:"asc"});


  const loaderRef=useRef(null);


  const fetchMovies=useCallback(async(pageNum) => {
    if(pageNum < 1 || pageNum > PAGE_LIMIT) return;
    setLoading(true);
    setError(null);

    try {
         const res = await fetch(
         `${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/movies/${category}?page=${pageNum}`
          );


      if(!res.ok) throw new Error(`Status ${res.status}`);

      const data=await res.json();
      console.log("Fetched data:",data);

      if(Array.isArray(data.results)) {
        setAllMovies(prev => {
          const existingIds=new Set(prev.map(m => m.id));
          const newItems=data.results.filter(m => !existingIds.has(m.id));
          return [...prev,...newItems];
        });
      } 
      }catch (err){
        console.error(err);
        setError("Failed to load movies. Please try again.")
    }
    finally {
      setLoading(false);
    }
  }, [category]);


  useEffect(() => {
    if(page <= PAGE_LIMIT ) fetchMovies(page);
  },[page,fetchMovies]);

  useEffect(() => {
     setAllMovies([]);
      setPage(1);
      fetchMovies(1);
      
  },[category,fetchMovies]);


  useEffect(() => {
    const node=loaderRef.current;

    if(!node) return;
    const observer=new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting && !loading){
          setPage(prev => prev+1);
        }
      },
      {
        rootMargin:"800px"
      }
    );
    observer.observe(node);
    return () => observer.disconnect();

  },[loading,fetchMovies,page]);


  const displayedMovies = useMemo(() => {
    let list=allMovies.slice();

    if(minRating > 0 ){
      list=list.filter(m => (m.vote_average ?? 0 ) >= minRating);
    }

    if(sort.by !== "default") {
      if(sort.by === "release_date") {
        list.sort((a,b) => (new Date(a.release_date) - new Date(b.release_date)) 
        * (sort.order ==="asc" ? 1 : -1));
      }
      else{
        list.sort((a,b) => ((a[sort.by] ?? 0) - (b[sort.by] ?? 0)) * (sort.order ==="asc" ? 1 : -1));
      }
    }
    return list;
  },[allMovies,minRating,sort]);

  const handleFilter= (rate) => setMinRating(rate);


  const handleSort= (e) => {
    const {name,value} =e.target;
    setSort(prev => ({...prev, [name]:value}));
  };

  
  return (
    <>

        <header className='flex justify-between items-center mb-8 w-full px-8'>
          <div className='flex items-center gap-6'>
             <h2 className='text-2xl font-bold text-yellow-300 ml-4 flex items-center gap-3'>
              {category === "popular" ? "Popular" : "Upcoming" }
              <img src={Fire} alt="fire" className='w-6 h-6' /> 
             </h2>

             <div className='flex gap-3'>
              <button
               onClick={() => setCategory("popular")}
               className={`px-4 py-2 rounded-md font-semibold ${category === "popular" ? "bg-yellow-400"
                 : "bg-gray-800 text-white"}`}
              >
                Popular
              </button>

              <button
              onClick={() => setCategory("upcoming")}
              className={`px-4 py-2 rounded-md font-semibold ${category === "upcoming" ? "bg-amber-400" : "bg-gray-800 text-white"}`}
              >
                Upcoming
              </button>
             </div>
          </div>
         
           
           
           
             <div className='flex items-center gap-3'>
              <Filter minRating={minRating} onSelect={handleFilter} ratings={[8,7,6]}/>
              <select name="by" value={sort.by} onChange={handleSort} className='rounded px-2 py-2 
              bg-black text-white border border-gray-700 text-xl '>
                <option value="default">Sort by</option>
                <option value="release_date">Date</option>
                <option value="vote_average">Rating</option>
              </select>

              <select name="order" value={sort.order} onChange={handleSort} 
              className='rounded bg-black text-white px-2 py-2 border border-gray-700 text-xl'>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
             </div>
        </header>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
            {displayedMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>

          <div ref={loaderRef} className="h-28 flex items-center justify-center mt-8">
        {loading ? (
          <p className="text-gray-300">Loading more movies...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <p className="text-gray-400">Scroll to load more</p>
        )}
      </div>
       
    </>
  )
}



export default MainMovieList;
