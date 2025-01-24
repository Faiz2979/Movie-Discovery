// // landing page untuk movie app
import Link from 'next/link';

export default function Hero(){
    return(
        <div className="min-h-screen flex items-center justify-center ">
            <div className="oxanium flex flex-col items-center justify-center h-full">
                <div className='text-white z-10 text-6xl lg:text-8xl oxanium oxanium-semibold leading-none inline-flex items-end gap-[2px]'>
                TM<span className="text-red-600">DB</span>
                </div>
                <h1 className="text-lg md:text-4xl oxanium-bold text-white">Welcome to Movie <span className='text-red-500'>Discovery</span> App</h1>
                <p className="text-white oxanium-regular mt-2">Find your favorite movies here</p>
                <Link className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600" href="/dashboard">Explore</Link>
            </div>
        </div>
    )
}