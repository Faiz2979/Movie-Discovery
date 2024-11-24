import Image from "next/image";


interface movieCard {
    key: number;
    title: string;
    poster_path: string;
}


export default function MovieCard({ movieCard }: { movieCard: movieCard }) {
    return (
        <div className="mb-4">
            <Image src={`http://image.tmdb.org/t/p/w500/${movieCard.poster_path}`} alt={movieCard.title} width={400} height={600}/>
            <h2 className="text-2xl">{movieCard.title}</h2>
        </div>
    );
}