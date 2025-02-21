'use client';
import MovieCard from '@/components/parts/Card';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MovieApp() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const [movies, setMovies] = useState<{ id: number; title: string; poster_path: string; [key: string]: any }[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(Number(id) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

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

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            router.push(`/movie/${newPage}`);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen w-full lg:w-11/12 mt-20">
            <h2 className="text-2xl oxanium-bold mb-4">Movie Library</h2>
            <p className="mt-2 text-gray-300 text-xl oxanium-bold mb-8">Page: {page} / {totalPages}</p>

            <div className="mb-6 w-2/4 rounded-md outline outline-red-600">
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 text-white bg-transparent"
                />
            </div>

            {loading ? (
                <p className="text-white">Loading...</p>
            ) : (
                <div className="flex flex-wrap justify-center gap-3">
                    {movies.map((movie) => (
                        <div key={movie.id}>
                            <MovieCard movieCard={movie} />
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center mt-6 gap-2">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNumber = page + i - 2;
                    if (pageNumber > 0 && pageNumber <= totalPages) {
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`px-3 py-2 rounded-md text-white ${pageNumber === page ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                            >
                                {pageNumber}
                            </button>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}
