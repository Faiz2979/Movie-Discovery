"use client";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

interface NavbarWithSidebarProps {
    children: ReactNode;
}


interface SideBarItem {
    title: string;
    link: string;
}

const sidebarItems: SideBarItem[] = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Movie List", link: "/movie" },
    { title: "Services", link: "/services" },
    { title: "Contact", link: "/contact" },
]

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
                className={`fixed top-0 left-0 h-full transition-transform duration-300 z-[999] bg-[#a10f0f] text-white shadow-lg oxanium oxanium-semibold 
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} w-[250px] lg:translate-x-0 lg:w-[250px]`}
            >
                <ul className="mt-16 p-4 space-y-4 w-full h-full ">
                    {sidebarItems.map((item) => (
                        <li key={item.title}>
                            <Link className="hover:underline decoration-red-600 rounded-sm hover:bg-red-500 block" href={item.link
                            }>
                            {item.title}
                            </Link>
                        </li>
                    ))}

                </ul>
            </aside>

            {/* Main Content Wrapper */}
            <div
                className={`transition-all duration-300 flex-1 ${
                    isSidebarOpen ? "lg:ml-[250px]" : "lg:ml-[250px]"
                }`}
            >
                {/* Navbar */}
                <nav
                    className={`px-[30px] lg:px-[100px] py-[8px] flex items-center justify-between transition-all fixed w-full duration-300 z-[998] overflow-hidden ${
                        scrollY > 100
                            ? "bg-[#a10f0f] bg-opacity-20 backdrop-blur-sm"
                            : "bg-[#4d0d0d]"
                    }`}
                >
                    <div
                        className={`text-white z-10 text-4xl lg:text-5xl oxanium oxanium-semibold leading-none inline-flex items-end gap-[2px] transition-all duration-300`}
                    >
                        <Link href="/">
                            TM<span className="text-red-600">DB</span>
                            <span className="w-2 h-2 rounded-full bg-red-600"></span>
                        </Link>
                    </div>
                    <div className="flex-1"></div> {/* Spacer for alignment */}
                    <div>
                        <button
                            className="text-white text-2xl lg:hidden"
                            onClick={toggleSidebar}
                        >
                            {isSidebarOpen ? "Close" : "Menu"}
                        </button>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="mt-[20px] ml-[40px] flex-1">
                    {children}
                </div>
            </div>

            {/* Overlay for small screens */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[998] lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
}
