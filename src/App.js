import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Search from "./components/Search";
import NumberOfResults from "./components/NumberOfResults";
import Box from "./components/ViewBox/Box";
import MovieList from "./components/ViewBox/MovieList";
import WatchedSummary from "./components/ViewBox/WatchedSummary";
import WatchedList from "./components/ViewBox/WatchedList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";


const KEY = '56b3dfb3'

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [error, setErrorMessage]  = useState('')
  const [selectedId, setSelectedId] = useState(null)
  
  useEffect(function(){
    const controller = new AbortController();
    async function fetchMovies () {
      try {
        setIsLoading(true)
        setErrorMessage("")
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal})
        if (!res.ok) throw new Error("There is some error while fetching the movies!!!!")
        const data = await res.json()
        if (data.Response==='False') throw new Error("Movies not found!!")
        setErrorMessage('')
        setMovies(data.Search)
        
      } catch (err) {
        if (err.name !== 'AbortError') setErrorMessage(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    if (query.length<3) {
      setMovies([])
      setErrorMessage("")
      return
    }
    fetchMovies()
    return function () {
      controller.abort()
    }
  },[query])
  return (
    <>
      <NavBar movies={movies}>
        <Search query={query} setQuery={setQuery}></Search>
        <NumberOfResults movies={movies}></NumberOfResults>
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader/>}
          {error && <ErrorMessage message={error}/>}
          {!isLoading && !error && <MovieList movies={movies} setSelectedId={setSelectedId}></MovieList>}
        </Box>
        <Box>
          {
            selectedId ? 
            <MovieDetails 
            selectedId={selectedId} 
            setSelectedId={setSelectedId} 
            setWatched={setWatched}
            watched={watched}
            /> : (
              <>
                <WatchedSummary watched={watched}></WatchedSummary>
                <WatchedList watched={watched} setWatched={setWatched}></WatchedList>
              </>
            )
          }
        </Box>

      </Main>
    </>
  );
}
