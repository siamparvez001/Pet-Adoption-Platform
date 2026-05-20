import Link from "next/link";
import { FaPhone } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdEmail, MdPets } from "react-icons/md";


const Footer = () => {
    return (
        <div className="bg-black text-white mt-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center ">
                        <MdPets></MdPets>
                        <p className="text-xl font-bold">PawsHome</p>
                    </div>
                    <div className="flex gap-2 items-center opacity-70">
                        <IoLocation></IoLocation>
                        <p> Dhaka, Bangladesh</p>
                    </div>
                    <div className="flex gap-2 items-center opacity-70">
                        <MdEmail></MdEmail>
                        <p> contact@pawshome.com</p>
                    </div>
                    <div className="flex gap-2 items-center opacity-70">
                        <FaPhone></FaPhone>
                        <p> +880123456789</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">Quick Links</h1>
                    <Link href="/" className="opacity-70 hover:opacity-100">Home</Link>
                    <Link href="/all-pets" className="opacity-70 hover:opacity-100">All Pets</Link>
                    <Link href="/my-requests" className="opacity-70 hover:opacity-100">My Requests</Link>
                    <Link href="/add-pet" className="opacity-70 hover:opacity-100">Add Pet</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">Follow Us</h1>
                    <Link href="https://www.facebook.com/pawshome" target="_blank" className="opacity-70 hover:opacity-100">Facebook</Link>
                    <Link href="https://www.instagram.com/pawshome" target="_blank" className="opacity-70 hover:opacity-100">Instagram</Link>
                    <Link href="https://www.twitter.com/pawshome" target="_blank" className="opacity-70 hover:opacity-100   ">Twitter</Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;