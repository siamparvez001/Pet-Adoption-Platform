"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

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
                    : "text-black dark:text-white hover:text-green-500 dark:hover:text-green-400"
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
        <nav
            className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-sm py-2"
                : "bg-slate-50 dark:bg-green-900 py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex items-center justify-between py-3">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/pet.jpeg"
                            alt="PawsHome Logo"
                            width={50}
                            height={50}
                            className="rounded-full object-cover"
                        />
                        <h1 className="text-xl sm:text-2xl font-bold dark:text-white">
                            PawsHome
                        </h1>
                    </Link>

                    {/* Desktop Nav Links */}
                    <ul className="hidden md:flex space-x-2">
                        <li><NavLink href="/">Home</NavLink></li>
                        <li><NavLink href="/pets">All Pets</NavLink></li>
                    </ul>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggle />

                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <Avatar>
                                        <Avatar.Image
                                            referrerPolicy="no-referrer"
                                            alt={user.name}
                                            src={user?.image}
                                        />
                                        <Avatar.Fallback>
                                            {user.name.charAt(0)}
                                        </Avatar.Fallback>
                                    </Avatar>
                                    <span className="font-medium dark:text-white">
                                        {user.name}
                                    </span>
                                </button>

                                {open && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50">
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                            <p className="font-semibold text-sm dark:text-white">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                {user.email}
                                            </p>
                                        </div>
                                        <Link
                                            href="/add-pet"
                                            onClick={() => setOpen(false)}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mt-1"
                                        >
                                            🐾 Dashboard
                                        </Link>
                                        <button
                                            onClick={() => {
                                                authClient.signOut();
                                                setOpen(false);
                                            }}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                                        >
                                            <FaSignOutAlt /> Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Link
                                    href="/signin"
                                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 flex flex-col gap-2">

                        {/* Nav Links */}
                        <NavLink href="/" mobile onClick={() => setMenuOpen(false)}>
                            Home
                        </NavLink>
                        <NavLink href="/pets" mobile onClick={() => setMenuOpen(false)}>
                            All Pets
                        </NavLink>

                        {/* Theme Toggle */}
                        <div className="px-3 py-2">
                            <ThemeToggle />
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                            {user ? (
                                <div className="flex flex-col gap-3">

                                    {/* User Info */}
                                    <div className="flex items-center gap-3 px-2">
                                        <Avatar>
                                            <Avatar.Image
                                                referrerPolicy="no-referrer"
                                                alt={user.name}
                                                src={user?.image}
                                            />
                                            <Avatar.Fallback>
                                                {user.name.charAt(0)}
                                            </Avatar.Fallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium dark:text-white">{user.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                                        </div>
                                    </div>

                                    {/* Dashboard */}
                                    <Link
                                        href="/add-pet"
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium"
                                    >
                                        🐾 Dashboard
                                    </Link>

                                    {/* Sign Out */}
                                    <button
                                        onClick={() => {
                                            authClient.signOut();
                                            setMenuOpen(false);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 font-medium"
                                    >
                                        <FaSignOutAlt /> Sign Out
                                    </button>

                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Link
                                        href="/signin"
                                        onClick={() => setMenuOpen(false)}
                                        className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:text-white text-center font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/signup"
                                        onClick={() => setMenuOpen(false)}
                                        className="px-4 py-2.5 rounded-xl bg-green-600 text-white text-center font-medium hover:bg-green-700"
                                    >
                                        Sign Up
                                    </Link>
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

















// "use client";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import { authClient } from "@/lib/auth-client";
// import { Avatar, Button } from "@heroui/react";
// import { FaSignOutAlt } from "react-icons/fa";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import ThemeToggle from "./ThemeToggle";


// const NavLink = ({ href, onClick, children, mobile }) => {
//     const pathname = usePathname();
//     const isActive = pathname === href;

//     return (
//         <Link
//             href={href}
//             onClick={onClick}
//             className={`px-3 rounded-lg transition-colors ${mobile ? "py-2" : "py-1.5"
//                 } ${isActive
//                     ? "bg-green-600 text-white"
//                     : "text-black dark:text-white hover:text-green-500 dark:hover:text-green-400"
//                 }`}
//         >
//             {children}
//         </Link>
//     );
// };
// const Navbar = () => {
//     const { data: session } = authClient.useSession();
//     const user = session?.user;

//     const [scrolled, setScrolled] = useState(false);
//     const [open, setOpen] = useState(false);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     useEffect(() => {
//         const handleScroll = () => setScrolled(window.scrollY > 10);
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//                 setOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     return (
//         <nav
//             className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled
//                 ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-sm py-2"
//                 : "bg-slate-50 dark:bg-green-900 py-4"
//                 }`}
//         >
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
//                 <div className="flex items-center justify-between py-3">

//                     {/* Logo */}
//                     <Link href="/" className="flex items-center gap-3">
//                         <div>
//                             <Image
//                                 src="/pet.jpeg"
//                                 alt="PawsHome Logo"
//                                 width={50}
//                                 height={50}
//                                 className="rounded-full object-cover"
//                             />
//                         </div>
//                         <h1 className="text-xl sm:text-2xl font-bold dark:text-white">
//                             PawsHome
//                         </h1>
//                     </Link>

//                     {/* Desktop Nav Links */}
//                     <ul className="hidden md:flex space-x-2">
//                         <li><NavLink href="/">Home</NavLink></li>
//                         <li><NavLink href="/pets">All Pets</NavLink></li>
//                     </ul>

//                     {/* Desktop Auth */}
//                     <div className="hidden md:flex items-center gap-3">
//                         <ThemeToggle />

//                         {user ? (
//                             <div className="relative" ref={dropdownRef}>
//                                 <button
//                                     onClick={() => setOpen(!open)}
//                                     className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
//                                 >
//                                     <Avatar>
//                                         <Avatar.Image
//                                             referrerPolicy="no-referrer"
//                                             alt={user.name}
//                                             src={user?.image}
//                                         />
//                                         <Avatar.Fallback>
//                                             {user.name.charAt(0)}
//                                         </Avatar.Fallback>
//                                     </Avatar>
//                                     <span className="font-medium dark:text-white">
//                                         {user.name}
//                                     </span>
//                                 </button>

//                                 {open && (
//                                     <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50">
//                                         <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
//                                             <p className="font-semibold text-sm dark:text-white">
//                                                 {user.name}
//                                             </p>
//                                             <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
//                                                 {user.email}
//                                             </p>
//                                         </div>
//                                         {/* ✅ Dashboard link */}
//                                         <Link
//                                             href="/add-pet"
//                                             onClick={() => setOpen(false)}
//                                             className="w-full flex items-center gap-2 px-4 py-2 text-sm dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mt-1"
//                                         >
//                                             🐾 Dashboard
//                                         </Link>
//                                         <button
//                                             onClick={() => {
//                                                 authClient.signOut();
//                                                 setOpen(false);
//                                             }}
//                                             className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
//                                         >
//                                             <FaSignOutAlt /> Sign Out
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         ) : (
//                             <div className="flex gap-3">
//                                 <Link
//                                     href="/signin"
//                                     className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//                                 >
//                                     Sign In
//                                 </Link>
//                                 <Link
//                                     href="/signup"
//                                     className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
//                                 >
//                                     Sign Up
//                                 </Link>
//                             </div>
//                         )}
//                     </div>

//                     {/* Mobile: Hamburger */}
//                     <button
//                         className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
//                         onClick={() => setMenuOpen(!menuOpen)}
//                     >
//                         {menuOpen ? (
//                             <X className="w-6 h-6" />
//                         ) : (
//                             <Menu className="w-6 h-6" />
//                         )}
//                     </button>
//                 </div>

//                 {/* Mobile Menu */}
//                 {menuOpen && (
//                     <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 flex flex-col gap-2">
//                         <NavLink href="/" mobile onClick={() => setMenuOpen(false)}>
//                             Home
//                         </NavLink>
//                         <NavLink href="/all-pets" mobile onClick={() => setMenuOpen(false)}>
//                             All Pets
//                         </NavLink>

//                         {/* Mobile Theme Toggle */}
//                         <div className="px-3 py-2">
//                             <ThemeToggle />
//                         </div>

//                         <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
//                             <Link
//                                 href="/add-pet"
//                                 onClick={() => setMenuOpen(false)}
//                                 className="px-3 py-2 rounded-lg text-black dark:text-white hover:text-green-500 dark:hover:text-green-400"
//                             >
//                                 🐾 Dashboard
//                             </Link>
//                             {user ? (
//                                 <div className="flex items-center gap-3">
//                                     <Avatar>
//                                         <Avatar.Image
//                                             referrerPolicy="no-referrer"
//                                             alt={user.name}
//                                             src={user?.image}
//                                         />
//                                         <Avatar.Fallback>
//                                             {user.name.charAt(0)}
//                                         </Avatar.Fallback>
//                                     </Avatar>
//                                     <div>
//                                         <p className="font-medium dark:text-white">
//                                             {user.name}
//                                         </p>
//                                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                                             {user.email}
//                                         </p>
//                                     </div>
//                                     <Button
//                                         onClick={() => {
//                                             authClient.signOut();
//                                             setMenuOpen(false);
//                                         }}
//                                         className="ml-auto flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
//                                     >
//                                         Sign Out <FaSignOutAlt />
//                                     </Button>
//                                 </div>
//                             ) : (
//                                 <div className="flex flex-col gap-3">
//                                     <Link
//                                         href="/signin"
//                                         onClick={() => setMenuOpen(false)}
//                                         className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:text-white text-center hover:bg-gray-100 dark:hover:bg-gray-800"
//                                     >
//                                         Sign In
//                                     </Link>
//                                     <Link
//                                         href="/signup"
//                                         onClick={() => setMenuOpen(false)}
//                                         className="px-4 py-2 rounded-lg bg-green-600 text-white text-center hover:bg-green-700"
//                                     >
//                                         Sign Up
//                                     </Link>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar; 