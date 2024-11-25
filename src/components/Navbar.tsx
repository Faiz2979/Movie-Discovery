

export default function Navbar() {
    return(
        <div>
            <nav className="flex justify-between items-center px-10 py-4">
                <div>
                    <a href="/">
                    <h1 className="text-2xl font-bold">Movie App</h1>
                    </a>
                </div>
                <div>
                    <ul className="flex gap-4 oxanium oxanium-bold">
                        <li>
                            <a href="/" className="text-blue-500 hover:text-blue-600">Home</a>
                        </li>
                        <li>
                            <a href="/about" className="text-blue-500 hover:text-blue-600">About</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}