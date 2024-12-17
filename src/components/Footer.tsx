
export default function Footer() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between w-full h-auto p-10">
            <div className="oxanium oxanium-semibold text-center md:text-left mb-6 md:mb-0">
                <h1 className="text-sm md:text-md lg:text-4xl">Contact me at faizannabil877@gmail.com</h1>
                <p className="text-xs md:text-md">© Using The Movie Database API</p>
            </div>
            <div id="iconButton" className="flex flex-row md:flex-col lg:flex-row gap-2 md:gap-6">
                <a
                    className="flex items-center justify-center"
                    href="https://www.themoviedb.org/">
                    <img src="/tmdbPrimary.svg" alt="TMDB Logo" className="w-10 h-10 md:w-14 md:h-14" />
                </a>
            </div>
        </div>
    )
}
