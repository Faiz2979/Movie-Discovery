import { useEffect, useState } from "react";
import MovieCard from "./parts/Card";

export default function Movie() {
    const [movies, setMovies,] = useState([]);
    const [page, setPage] = useState(1);
    const getMovies = async (page: number) => {
        try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=74f0f3d49d2f500b7a5273ac409e25b1&language=in-ID&page=${page}`
        );
        const data = await response.json();
        setMovies(data.results);
        console.log(data);
        } catch (error) {
        console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        getMovies(page);
    }, [page]);

    // Fungsi untuk menangani perubahan halaman
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1) {
            setPage(newPage);
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className=" flex flex-col items-center snap-center w-3/4">
                <h2 className="text-2xl font-bold mb-4">Movie Library</h2>
                <div className="flex justify-center flex-wrap gap-3 items-center hide-scrollbar overflow-x-scroll w-full">
                    {movies.map((movie) => (
                        <div key={movie.id} className="flex-none">
                            <MovieCard movieCard={movie} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center w-full mt-6 gap-4" >
                    {/* Tombol Previous */}
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className={`px-4 w-1/4 py-2 bg-blue-500 text-white font-semibold rounded-md 
                        ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
                    >
                        Previous
                    </button>

                    {/* Tombol Next */}
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        className="px-4 py-2 w-1/4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                    >
                        Next
                    </button>
                </div>
                <p className="mt-4 text-gray-500">Page: {page}</p>
            </div>
        </div>
    );
}
