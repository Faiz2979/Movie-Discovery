import { useEffect, useState } from "react";
import MovieCard from "./parts/Card";

export default function Movie() {
    // Pindahkan deklarasi useState ke dalam fungsi komponen
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(() => {
        // Ambil nilai dari localStorage hanya sekali saat komponen pertama kali dimuat
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
            console.log(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        getMovies(page);
    }, [page]);

    useEffect(() => {
        localStorage.setItem("page", page.toString());
    }, [page]);

    return (
        <div className="flex relative justify-center items-center min-h-screen " id="top">
            <div className=" flex flex-col items-center snap-center w-3/4">
                <h2 className="text-2xl oxanium oxanium-bold mb-4">Movie Library</h2>
                <p className="mt-2 text-gray-300 text-xl oxanium oxanium-bold mb-8">Page: {page}</p>
                <div className="flex justify-center flex-wrap gap-3 items-center hide-scrollbar overflow-x-scroll w-full">
                    {movies.map((movie) => (
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

