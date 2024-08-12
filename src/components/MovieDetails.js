import { useEffect, useState } from "react"
import StarRating from "./StarRating"

const KEY = '56b3dfb3'
export default function MovieDetails ({selectedId,setSelectedId,setWatched,watched}) {
    const [movie,setMovie] = useState({})
    const [userRating, setUserRating] = useState(0)
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie
    const isWatched = watched?.map(movie=> movie.imdbID).includes(selectedId)
    const findRating = watched.find(movie=> movie.imdbID===selectedId)?.userRating
    const handleWatched = () => {
        const watchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            userRating,
            runtime: Number(runtime.split(" ").at(0))
        }
        setWatched(movies=> [...movies,watchedMovie])
        setSelectedId(null)
    }
    useEffect(function(){
        const callBack = (e)=>{
            if (e.code==='Escape') {
                setSelectedId(null)
            }
        }
        document.addEventListener('keydown',callBack)
        return function(){
            document.removeEventListener('keydown',callBack)
        }
    },[setSelectedId])
    useEffect(function(){
        async function fetchMovieDetails() {
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
            const data = await res.json()
            setMovie(data)
        }
        fetchMovieDetails()
    },[selectedId])
    useEffect(function(){
        const openedMovieTitle = 'Movie: '+title
        document.title= openedMovieTitle
        return function() {
            document.title="usePopcorn"
        }
    },[title])
    return <div className="details">
        <header>
            <button className="btn-back" onClick={()=>setSelectedId(null)}>&larr;</button>
            <img src={poster} alt={`poster for ${movie}`}/>
            <div className="details-overview">
                <h2>{title}</h2>
                <p>
                    {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                    <span>⭐</span>
                    {imdbRating} IMDB Ratings
                </p>
            </div>
        </header>

        <section>
            <div className="rating">
                {!isWatched ? 
                    <>
                        <StarRating maxratings={10} size={24} rating={userRating} setRating={setUserRating}></StarRating>
                        {userRating>3 && <button className="btn-add" onClick={handleWatched}>+ Add to List</button>}
                    </>
                :
                <p>You have rated the movie {findRating} <span>⭐</span></p>
                }
            </div>
            <p>
                <em>{plot}</em>
            </p>
            <p>Casting: {actors}</p>
            <p>Directed By: {director}</p>
        </section>
        
    </div>
}