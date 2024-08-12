import WatchedMovie from "./WatchedMovie";

export default function WatchedList ({watched, setWatched}) {
    return <ul className="list">
        {watched.map((movie) => (
            <WatchedMovie movie={movie} key={movie.imdbID} setWatched={setWatched}></WatchedMovie>
        ))}
        </ul>
}