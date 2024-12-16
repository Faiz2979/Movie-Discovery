'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import handlePageChange from "./Movie";
    export default function Navbar() {
        const [scrollY, setScrollY] = useState(0);
        const toPage1 = () => {

        }
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
    
        return (
        <nav
            className={`px-[30px] lg:px-[100px] py-[5px] flex items-center justify-between h-[70px] transition-all fixed w-full duration-300 z-[999] overflow-hidden`}
        >
            <Link
            onClick={() => handlePageChange(1,"#top")}
            href={"/"}
            className="text-white z-10 text-md lg:text-4xl oxanium oxanium-semibold leading-none inline-flex items-end gap-[2px]"
            >
            TM<span className="text-red-600">DB</span><span className="w-2 h-2 rounded-full bg-red-600"></span>
            </Link>
            <div
            className={`absolute w-full h-full left-0 top-0 z-0 transition-all duration-300 ${scrollY > 100? "bg-[#a10f0f] bg-opacity-20 backdrop-blur-sm": "bg-transparent"}`}
            ></div>
            {/* Search Bar */}
            <div className="flex items-center gap-3 z-10">
            <input
                type="text"
                placeholder="Search"
                className="oxanium oxanium-medium bg-transparent border-b border-white text-white"
            />
            </div>
        </nav>
        );
    }