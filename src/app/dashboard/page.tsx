
import Link from 'next/link';
export default function Home() {
    return(
        <div className="w-full h-full flex items-center justify-center oxanium m-5 mt-5 ">
            <div>
                <h1 className="text-4xl">Dashboard</h1>
                <h2 className="text-2xl">
                    Nothing Here yet Go To  
                    <span> 
                        <Link className="text-red-600 text-2xl align-middle hover:underline underline-red-500" href="/movie"> Movie Page </Link>
                    </span> 
                </h2>
            </div>
        </div>
    )
}