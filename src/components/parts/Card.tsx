    import Image from "next/image";


    interface movieCard {
        title: string;
        poster_path: string;
    }


    
    export default function MovieCard({ movieCard }: { movieCard: movieCard }) {
    return (
            <div className="flex-shrink-0 w-64">
            <div className="relative group">
            <Image
                className="rounded-lg"
                src={`http://image.tmdb.org/t/p/w500/${movieCard.poster_path}`}
                alt={movieCard.title}
                width={400}
                height={600}
            />
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg">
                <h2 className="absolute bottom-4 left-4 text-white text-lg oxanium oxanium-semibold">
                {movieCard.title}
                </h2>
            </div>
            </div>
        </div>
    );
    }
