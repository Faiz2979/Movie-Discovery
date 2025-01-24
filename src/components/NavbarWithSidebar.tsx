"use client";
import Link from 'next/link';
import { ReactNode, useEffect, useState } from "react";

interface NavbarWithSidebarProps {
    children: ReactNode;
}

export default function NavbarWithSidebar({ children }: NavbarWithSidebarProps) {
    const [scrollY, setScrollY] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full transition-transform duration-300 z-[999] bg-[#a10f0f] text-white shadow-lg oxanium oxanium-semibold ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-[90%]"
                } w-[250px]`}
            >
                <div
                    className={`absolute top-0 right-[-40px] h-full w-10 bg-[#a10f0f] cursor-pointer flex items-center justify-center text-white`} 
                    onClick={toggleSidebar}
                >
                    {isSidebarOpen ? "<" : ">"}
                </div>
                <ul className="mt-16 p-4 space-y-4">
                    <li>
                        <Link href="/dashboard" className="hover:text-red-400">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/movie" className="hover:text-red-400">Movie List</Link>
                    </li>
                    <li>
                        <Link href="/services" className="hover:text-red-400">Services</Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:text-red-400">Contact</Link>
                    </li>
                </ul>
            </aside>

            {/* Main Content Wrapper */}
            <div
                className={`transition-all duration-300 ${
                    isSidebarOpen ? "ml-[250px]" : "ml-[40px]"
                } flex-1`}
            >
                {/* Navbar */}
                <nav
                    className={`px-[30px] lg:px-[100px] py-[8px] flex items-center justify-between transition-all fixed w-full duration-300 z-[998] overflow-hidden ${
                        scrollY > 100
                            ? "bg-[#a10f0f] bg-opacity-20 backdrop-blur-sm"
                            : "bg-[#4d0d0d]"
                    }`}
                >
                    <div className="flex-1"></div> {/* Spacer for alignment */}
                    <div
                        className={`text-white z-10 text-sm lg:text-5xl oxanium oxanium-semibold leading-none inline-flex items-end gap-[2px] transition-all duration-300`}
                    >
                        TM<span className="text-red-600">DB</span>
                        <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="mt-[20px] ml-[40px] flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}
