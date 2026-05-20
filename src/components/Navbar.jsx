
"use client";
import Link from "next/link";
import { BookOpen, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Image from "next/image";
// import petImage from "/pet.jpeg";


const NavLink = ({ href, onClick, children, mobile }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`px-3 rounded-lg transition-colors ${mobile ? "py-2" : "py-1.5"
                } ${isActive
                    ? "bg-green-600 text-white"
                    : "hover:text-green-600"
                }`}
        >
            {children}
        </Link>
    );
};

const Navbar = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/70 backdrop-blur-md shadow-sm py-2" : "bg-slate-50 py-4"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex items-center justify-between py-3">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        {/* <div className="p-2 sm:p-3 bg-blue-600 rounded-2xl">
                            <BookOpen className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                        </div> */}
                        <div>
                            <Image src="/pet.jpeg" alt="Pet" width={50} height={100} className="rounded-2xl" />
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold">PawsHome</h1>
                    </Link>

                    {/* Desktop Nav Links */}
                    <ul className="hidden md:flex space-x-2">
                        <li><NavLink href="/">Home</NavLink></li>
                        {/* <li><NavLink href="/courses">Courses</NavLink></li> */}
                        <li><NavLink href="/all-pets">All Pets</NavLink></li>
                        {/* <li><NavLink href="/dashboard">Dashboard</NavLink></li> */}
                    </ul>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <Avatar>
                                        <Avatar.Image referrerPolicy="no-referrer" alt={user.name} src={user?.image} />
                                        <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                                    </Avatar>
                                    <span className="font-medium">{user.name}</span>
                                </button>

                                {open && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="font-semibold text-sm">{user.name}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={() => { authClient.signOut(); setOpen(false); }}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors mt-1"
                                        >
                                            <FaSignOutAlt /> Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Link href="/signin" className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors">Sign In</Link>
                                <Link href="/signup" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors">Sign Up</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile: Hamburger */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4 flex flex-col gap-2">
                        <NavLink href="/" mobile onClick={() => setMenuOpen(false)}>Home</NavLink>
                        <NavLink href="/courses" mobile onClick={() => setMenuOpen(false)}>Courses</NavLink>
                        <NavLink href="/add-course" mobile onClick={() => setMenuOpen(false)}>Add Course</NavLink>
                        <NavLink href="/dashboard" mobile onClick={() => setMenuOpen(false)}>Dashboard</NavLink>

                        <div className="border-t border-gray-200 pt-4 mt-2">
                            {user ? (
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <Avatar.Image referrerPolicy="no-referrer" alt={user.name} src={user?.image} />
                                        <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                    <Button
                                        onClick={() => { authClient.signOut(); setMenuOpen(false); }}
                                        className="ml-auto flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                                    >
                                        Sign Out <FaSignOutAlt />
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Link href="/signin" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-center hover:bg-gray-100">Sign In</Link>
                                    <Link href="/signup" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-lg bg-green-600 text-white text-center hover:bg-green-700">Sign Up</Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
