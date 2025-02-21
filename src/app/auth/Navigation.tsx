import Link from "next/link"
import type React from "react"

    const Navigation: React.FC = () => {
    return (
        <nav className="absolute top-0 right-0 m-4">
        <ul className="flex space-x-4">
            <li>
            <Link href="/login" className="text-white hover:text-gray-300">
                Login
            </Link>
            </li>
            <li>
            <Link href="/register" className="text-white hover:text-gray-300">
                Register
            </Link>
            </li>
        </ul>
        </nav>
    )
    }

    export default Navigation

