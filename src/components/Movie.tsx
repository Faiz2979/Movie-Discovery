import { useEffect, useState } from "react";
import MovieCard from "./parts/Card";

export default function Movie() {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=74f0f3d49d2f500b7a5273ac409e25b1&language=in-ID"
      );
      const data = await response.json();
      setMovies(data.results);
      console.log(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movieCard={movie} />
      ))}
    </div>
  );
}
