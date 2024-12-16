'use client';
import { useEffect, useState } from "react";
import MovieCard from "./parts/Card";

export default function Movie() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]); // State untuk film yang difilter
    const [searchQuery, setSearchQuery] = useState(""); // State untuk query pencarian
    const [page, setPage] = useState(() => {
        const savedPage = localStorage.getItem("page");
        return savedPage ? parseInt(savedPage, 10) : 1;
    });

    const handlePageChange = (newPage: number, goTop: string) => {
        window.location.href = goTop;
        if (newPage >= 1) {
            setPage(newPage);
        }
    };

    const getMovies = async (page: number) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=74f0f3d49d2f500b7a5273ac409e25b1&language=in-ID&page=${page}`
            );
            const data = await response.json();
            setMovies(data.results);
            setFilteredMovies(data.results); // Set hasil awal ke state filteredMovies
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === "") {
            setFilteredMovies(movies); // Jika query kosong, tampilkan semua film
        } else {
            const filtered = movies.filter((movie) =>
                movie.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredMovies(filtered);
        }
    };

    useEffect(() => {
        getMovies(page);
    }, [page]);

    useEffect(() => {
        localStorage.setItem("page", page.toString());
    }, [page]);

    return (
        <div className="flex relative justify-center items-center min-h-screen" id="top">
            <div className="flex flex-col items-center snap-center w-3/4 mt-20">
                <h2 className="text-2xl oxanium oxanium-bold mb-4">Movie Library</h2>
                <p className="mt-2 text-gray-300 text-xl oxanium oxanium-bold mb-8">Page: {page}</p>

                {/* Search bar */}
                <div className="mb-6 w-2/4 rounded-md bg-transparent outline outline-red-600">
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full px-4 py-2 text-white bg-transparent"
                    />
                </div>

                <div className="flex justify-center flex-wrap gap-3 items-center hide-scrollbar overflow-x-scroll w-full">
                    {filteredMovies.map((movie) => (
                        <div key={movie.id} className="flex-none">
                            <MovieCard movieCard={movie} />
                        </div>
                    ))}
                </div>

                <div className="flex justify-center w-full mt-6 gap-4 oxanium oxanium-bold">
                    {page > 1 && (
                        <button
                            onClick={() => handlePageChange(page - 1, "#top")}
                            className="px-4 w-1/4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                        >
                            Previous
                        </button>
                    )}
                    <button
                        onClick={() => handlePageChange(page + 1, "#top")}
                        className="px-4 py-2 w-1/4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}