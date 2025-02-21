'use client';
import { useEffect, useState } from 'react';
import MovieCard from './parts/Card';

type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
};

export default function Movie() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const apiKey = '74f0f3d49d2f500b7a5273ac409e25b1';

    const fetchMovies = async (page: number, query = '') => {
        setLoading(true);
        try {
            const endpoint = query
                ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=id-ID&query=${query}&page=${page}`
                : `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=id-ID&page=${page}`;
            const response = await fetch(endpoint);
            const data = await response.json();
            setMovies(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMovies(page, searchQuery);
    }, [page, searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="flex relative justify-center items-center min-h-screen w-full lg:w-11/12" id="top">
            <div className="flex flex-col items-center snap-center w-full mt-20">
                <h2 className="text-2xl oxanium oxanium-bold mb-4">Movie Library</h2>
                <p className="mt-2 text-gray-300 text-xl oxanium oxanium-bold mb-8">
                    Page: {page} / {totalPages}
                </p>

                {/* Search bar */}
                <div className="mb-6 w-2/4 rounded-md bg-transparent outline outline-red-600">
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 text-white bg-transparent"
                    />
                </div>

                {/* Movie List */}
                {loading ? (
                    <p className="text-white">Loading...</p>
                ) : (
                    <div className="flex justify-center flex-wrap gap-3 items-center hide-scrollbar overflow-x-scroll w-full">
                        {movies.map((movie) => (
                            <div key={movie.id} className="flex-none">
                                <MovieCard movieCard={movie} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination Buttons */}
                <div className="flex justify-center w-full mt-6 gap-4 oxanium oxanium-bold">
                    {page > 1 && (
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            className="px-4 w-1/4 text-sm md:text-md py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 whitespace-nowrap"
                        >
                            Back
                        </button>
                    )}
                    {page < totalPages && (
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            className="text-sm md:text-md lg:text-lg px-4 py-2 w-1/4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 whitespace-nowrap"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
